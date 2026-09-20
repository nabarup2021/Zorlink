'use client';

import { useEffect, useRef } from 'react';
import { useMusic } from '../lib/music';

function extractYTVideoId(track) {
  if (!track) return null;
  if (track.identifier && track.identifier.length === 11) return track.identifier;
  if (track.uri) {
    const m = track.uri.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (m && m[1]) return m[1];
  }
  return null;
}

export default function WebAudioEngine() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    volume,
    isMuted,
    playbackMode,
    isAutoplay,
    syncBrowserPlayerTime,
    handleBrowserTrackEnd,
    setIsPlaying,
  } = useMusic();

  const playerRef = useRef(null);
  const isApiReadyRef = useRef(false);
  const pendingTrackRef = useRef(null);
  const isInternalSeekingRef = useRef(false);

  // Initialize YouTube IFrame API once
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.YT && window.YT.Player) {
      isApiReadyRef.current = true;
      initPlayer();
      return;
    }

    // Load YT Script
    if (!document.getElementById('yt-iframe-api-script')) {
      const tag = document.createElement('script');
      tag.id = 'yt-iframe-api-script';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }
    }

    const prevCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (prevCallback) prevCallback();
      isApiReadyRef.current = true;
      initPlayer();
    };

    function initPlayer() {
      if (playerRef.current) return;
      const mount = document.getElementById('azelia-yt-player-container');
      if (!mount) return;

      try {
        playerRef.current = new window.YT.Player('azelia-yt-player-container', {
          height: '200',
          width: '200',
          playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            enablejsapi: 1,
            fs: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            origin: window.location.origin,
          },
          events: {
            onReady: (e) => {
              e.target.setVolume(volume);
              if (pendingTrackRef.current) {
                const vid = extractYTVideoId(pendingTrackRef.current);
                if (vid) {
                  e.target.loadVideoById({ videoId: vid });
                  e.target.playVideo();
                }
                pendingTrackRef.current = null;
              }
            },
            onStateChange: (e) => {
              if (e.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
              } else if (e.data === window.YT.PlayerState.PAUSED) {
                setIsPlaying(false);
              } else if (e.data === window.YT.PlayerState.ENDED) {
                handleBrowserTrackEnd();
              }
            },
            onError: (err) => {
              console.warn('YouTube audio engine error:', err);
              handleBrowserTrackEnd();
            },
          },
        });
      } catch (err) {
        console.error('Failed to mount YT audio engine:', err);
      }
    }
  }, []);

  // Play new track when currentTrack changes
  useEffect(() => {
    if (playbackMode !== 'browser' || !currentTrack) return;

    const vid = extractYTVideoId(currentTrack);
    if (!vid) return;

    const player = playerRef.current;
    if (player && player.loadVideoById && typeof player.loadVideoById === 'function') {
      try {
        player.loadVideoById({ videoId: vid });
        player.setVolume(isMuted ? 0 : volume);
        player.playVideo();
      } catch (err) {
        console.warn('Error loading video in YT Player:', err);
      }
    } else {
      pendingTrackRef.current = currentTrack;
    }
  }, [currentTrack?.uri, currentTrack?.identifier, playbackMode]);

  // Sync play/pause state
  useEffect(() => {
    if (playbackMode !== 'browser') return;
    const player = playerRef.current;
    if (!player || typeof player.getPlayerState !== 'function') return;

    try {
      const state = player.getPlayerState();
      if (isPlaying && state !== window.YT?.PlayerState?.PLAYING) {
        player.playVideo();
      } else if (!isPlaying && state === window.YT?.PlayerState?.PLAYING) {
        player.pauseVideo();
      }
    } catch {
      /* ignore */
    }
  }, [isPlaying, playbackMode]);

  // Sync Volume
  useEffect(() => {
    if (playbackMode !== 'browser') return;
    const player = playerRef.current;
    if (player && typeof player.setVolume === 'function') {
      try {
        player.setVolume(isMuted ? 0 : volume);
        if (isMuted && typeof player.mute === 'function') {
          player.mute();
        } else if (!isMuted && typeof player.unMute === 'function') {
          player.unMute();
        }
      } catch {
        /* ignore */
      }
    }
  }, [volume, isMuted, playbackMode]);

  // Continuous progress ticker (Reads exact time and duration from YouTube)
  useEffect(() => {
    if (playbackMode !== 'browser' || !isPlaying) return;

    const interval = setInterval(() => {
      const player = playerRef.current;
      if (player && typeof player.getCurrentTime === 'function' && typeof player.getDuration === 'function') {
        try {
          const curSec = player.getCurrentTime() || 0;
          const durSec = player.getDuration() || 0;
          if (durSec > 0) {
            syncBrowserPlayerTime(curSec * 1000, durSec * 1000);
          }
        } catch {
          /* ignore */
        }
      }
    }, 250);

    return () => clearInterval(interval);
  }, [playbackMode, isPlaying]);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '-9999px',
        right: '-9999px',
        width: '200px',
        height: '200px',
        opacity: 0.01,
        pointerEvents: 'none',
        zIndex: -1,
      }}
      aria-hidden="true"
    >
      <div id="azelia-yt-player-container" />
    </div>
  );
}

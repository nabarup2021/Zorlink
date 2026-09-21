'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext({
  user: null,
  loading: true,
  error: null,
  logout: async () => {},
  loginWithDiscord: () => {},
  refresh: async () => {},
  filterUserGuilds: (guilds) => guilds,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadSession = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/me', {
        method: 'GET',
        credentials: 'same-origin',
        cache: 'no-store',
      });

      if (!response.ok) {
        setUser(null);
        return;
      }

      const data = await response.json();

      if (data?.authenticated && data.user?.id) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
      setError('Authentication service unavailable.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSession();
  }, []);

  const loginWithDiscord = () => {
    const returnTo = typeof window !== 'undefined'
      ? `${window.location.pathname}${window.location.search}`
      : '/servers';

    window.location.assign(`/api/auth/login?returnTo=${encodeURIComponent(returnTo)}`);
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'same-origin',
      });
    } finally {
      setUser(null);
      setError(null);
    }
  };

  const filterUserGuilds = useMemo(
    () => (guilds) => {
      if (!user || !Array.isArray(guilds)) return [];
      const manageableIds = new Set((user.guilds || []).map((guild) => guild.id));
      return guilds.filter((guild) => manageableIds.has(guild.id));
    },
    [user]
  );

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      logout,
      loginWithDiscord,
      refresh: loadSession,
      filterUserGuilds,
    }),
    [user, loading, error, filterUserGuilds]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

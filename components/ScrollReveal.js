'use client';

import { useEffect } from 'react';

const CARD_SELECTOR = [
  'article[class*="rounded-"][class*="border"][class*="bg-"]',
  'div[class*="rounded-2xl"][class*="border"][class*="bg-"]',
  'div[class*="rounded-3xl"][class*="border"][class*="bg-"]',
  'section[class*="rounded-3xl"][class*="border"][class*="bg-"]',
].join(',');

const EXCLUDED_SELECTOR = 'header, footer, nav, a, button, input, select, textarea, [data-scroll-ignore]';

export default function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('scroll-reveal-visible');
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    const prepare = (root) => {
      const nodes = root.matches?.(CARD_SELECTOR) ? [root] : Array.from(root.querySelectorAll?.(CARD_SELECTOR) || []);

      nodes.forEach((node) => {
        if (node.matches(EXCLUDED_SELECTOR) || node.dataset.scrollReveal === 'true') return;

        const parent = node.parentElement;
        const siblings = parent ? Array.from(parent.children).filter((child) => child.matches?.(CARD_SELECTOR)) : [];
        const index = siblings.indexOf(node);
        const delay = Math.min(Math.max(index, 0), 5) * 70;

        node.dataset.scrollReveal = 'true';
        node.style.setProperty('--scroll-reveal-delay', delay + 'ms');
        node.classList.add('scroll-reveal');
        observer.observe(node);
      });
    };

    prepare(document.body);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) prepare(node);
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  return null;
}

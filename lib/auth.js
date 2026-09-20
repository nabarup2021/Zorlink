'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  loginWithDiscord: () => {},
  filterUserGuilds: (guilds) => guilds,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 1. Check server-side session cookie first
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data?.authenticated && data.user) {
          setUser(data.user);
          localStorage.setItem('azelia_auth_user', JSON.stringify(data.user));
          return;
        }
        // 2. Fallback to localStorage
        const stored = localStorage.getItem('azelia_auth_user');
        if (stored) {
          try {
            setUser(JSON.parse(stored));
          } catch {
            localStorage.removeItem('azelia_auth_user');
          }
        }
      })
      .catch(() => {
        const stored = localStorage.getItem('azelia_auth_user');
        if (stored) {
          try {
            setUser(JSON.parse(stored));
          } catch {
            /* ignore */
          }
        }
      });
  }, []);

  const login = (userId, customUsername = 'Discord User') => {
    const userData = {
      id: userId,
      username: customUsername,
      globalName: customUsername,
      avatar: '/azelia-pfp.gif',
      loggedInAt: Date.now(),
    };
    setUser(userData);
    localStorage.setItem('azelia_auth_user', JSON.stringify(userData));
  };

  const loginWithDiscord = () => {
    window.location.href = '/api/auth/login';
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      /* ignore */
    }
    setUser(null);
    localStorage.removeItem('azelia_auth_user');
  };

  const filterUserGuilds = (allGuilds) => {
    if (!user || !allGuilds) return [];
    if (user.id === '876743202051346432' || user.id === '1427743346562043937') {
      return allGuilds;
    }
    if (user.guilds && Array.isArray(user.guilds)) {
      const userGuildIds = new Set(user.guilds.map((g) => g.id));
      return allGuilds.filter((g) => userGuildIds.has(g.id));
    }
    return allGuilds;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loginWithDiscord, filterUserGuilds }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

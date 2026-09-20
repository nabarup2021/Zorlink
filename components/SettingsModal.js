'use client';

import { useState, useEffect } from 'react';
import { Settings, X, Save } from 'lucide-react';
import { getApiConfig, setApiConfig } from '../lib/api';

export default function SettingsModal({ isOpen, onClose }) {
  const [host, setHost] = useState('');
  const [key, setKey] = useState('');

  useEffect(() => {
    if (isOpen) {
      const conf = getApiConfig();
      setHost(conf.host);
      setKey(conf.key);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    setApiConfig(host, key);
    onClose();
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Settings className="w-4 h-4 text-brand-400" /> API Server Connection Settings
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-medium text-slate-400 mb-1">Bot API Host URL:</label>
            <input
              type="text"
              value={host}
              onChange={(e) => setHost(e.target.value)}
              placeholder=""
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2.5 focus:outline-none focus:border-brand-500 font-mono text-xs"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-400 mb-1">Secret API Key:</label>
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="flx_secret_api_key_..."
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2.5 focus:outline-none focus:border-brand-500 font-mono text-xs"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold">
            Cancel
          </button>
          <button onClick={handleSave} className="px-5 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-brand-500/20">
            <Save className="w-3.5 h-3.5" /> Save Connection
          </button>
        </div>
      </div>
    </div>
  );
}

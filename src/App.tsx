/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Volume2, Sparkles, Bell, RefreshCw, Settings, X, Sliders, Plus, VolumeX } from 'lucide-react';

export default function App() {
  const [isListening, setIsListening] = useState(true);
  const [notifications, setNotifications] = useState<Array<{ id: string; app: string; original: string; english: string; time: string }>>([]);
  const [inputText, setInputText] = useState('');
  const [appName, setAppName] = useState('WhatsApp');
  const [isProcessing, setIsProcessing] = useState(false);

  // Modals state
  const [showSettings, setShowSettings] = useState(false);
  const [showSimulator, setShowSimulator] = useState(false);
  const [voiceRate, setVoiceRate] = useState(1.0);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [onlyImportant, setOnlyImportant] = useState(false);

  useEffect(() => {
    const updateVoices = () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const available = window.speechSynthesis.getVoices();
        setVoices(available);
        if (available.length > 0 && !selectedVoice) {
          setSelectedVoice(available[0].name);
        }
      }
    };
    updateVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, [selectedVoice]);

  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = voiceRate;
    const v = voices.find(vo => vo.name === selectedVoice);
    if (v) utterance.voice = v;
    window.speechSynthesis.speak(utterance);
  };

  const handleTestNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsProcessing(true);
    try {
      const res = await fetch('/api/translate-and-summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appName, title: 'Incoming', body: inputText, originalLanguage: 'Auto' }),
      });
      const data = await res.json();

      const newNotif = {
        id: Date.now().toString(),
        app: appName,
        original: inputText,
        english: data.spokenAnnouncement || inputText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setNotifications(prev => [newNotif, ...prev]);
      if (isListening) {
        speak(newNotif.english);
      }
      setInputText('');
      setShowSimulator(false);
    } catch {
      const fallback = {
        id: Date.now().toString(),
        app: appName,
        original: inputText,
        english: `New notification from ${appName}: ${inputText}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setNotifications(prev => [fallback, ...prev]);
      if (isListening) speak(fallback.english);
      setInputText('');
      setShowSimulator(false);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      className="min-h-screen text-white flex flex-col items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/assets/aistudio/file_00000000d4d0820abb9345a67fae2b68_3f055ed0.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Ultra transparent dark overlay so background image is fully clear */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[0.5px] pointer-events-none" />

      {/* Right-Side Floating Action Buttons - Fully Transparent Glassmorphism */}
      <div className="absolute top-5 right-5 z-20 flex flex-col gap-3">
        {/* Settings Button */}
        <button
          onClick={() => setShowSettings(true)}
          className="p-3 rounded-2xl bg-white/10 border border-white/25 text-white hover:bg-white/25 backdrop-blur-md transition shadow-lg flex items-center justify-center"
          title="Notification Settings"
        >
          <Sliders className="w-5 h-5 text-white" />
        </button>

        {/* Add / Simulate Notification Button */}
        <button
          onClick={() => setShowSimulator(true)}
          className="p-3 rounded-2xl bg-white/10 border border-white/25 text-white hover:bg-white/25 backdrop-blur-md transition shadow-lg flex items-center justify-center"
          title="Simulate Notification"
        >
          <Plus className="w-5 h-5 text-white" />
        </button>

        {/* Announcer Listening Toggle Button */}
        <button
          onClick={() => setIsListening(!isListening)}
          className={`p-3 rounded-2xl border backdrop-blur-md transition shadow-lg flex items-center justify-center ${
            isListening ? 'bg-white/15 border-white/30 text-emerald-300' : 'bg-white/10 border-white/20 text-rose-300'
          }`}
          title={isListening ? 'Announcer Active' : 'Announcer Paused'}
        >
          {isListening ? <Volume2 className="w-5 h-5 animate-pulse text-emerald-300" /> : <VolumeX className="w-5 h-5 text-rose-300" />}
        </button>
      </div>

      {/* Glowing Interactive Button positioned over the disc in the character's hand */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <button
          onClick={() => setShowSimulator(true)}
          className="w-20 h-20 rounded-full bg-blue-500/30 border-2 border-blue-400 shadow-[0_0_40px_rgba(59,130,246,0.9)] animate-pulse flex items-center justify-center hover:scale-105 transition backdrop-blur-md group cursor-pointer"
          title="Tap to trigger notification"
        >
          <div className="w-12 h-12 rounded-full bg-blue-500/50 flex items-center justify-center shadow-[inset_0_0_15px_rgba(255,255,255,0.6)]">
            <Volume2 className="w-6 h-6 text-white animate-bounce" />
          </div>
        </button>
        <span className="mt-2 text-[11px] font-semibold tracking-wider uppercase text-blue-200 bg-black/40 px-3 py-1 rounded-full backdrop-blur-md border border-white/20 shadow-lg">
          Tap Hand Button
        </span>
      </div>

      {/* Minimalist floating notification toast at bottom */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 max-w-sm w-full px-4">
        {notifications.length > 0 && (
          <div className="bg-white/10 border border-white/20 rounded-2xl p-3.5 backdrop-blur-md shadow-xl text-xs space-y-1.5">
            <div className="flex items-center justify-between text-white/80">
              <span className="font-semibold text-white">{notifications[0].app}</span>
              <span className="text-[10px] text-white/60">{notifications[0].time}</span>
            </div>
            <p className="text-blue-200 font-medium truncate">🗣️ {notifications[0].english}</p>
          </div>
        )}
      </div>

      {/* Simulate Notification Modal */}
      {showSimulator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-900/90 border border-white/20 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl backdrop-blur-xl text-white">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Bell className="w-4 h-4 text-blue-400" />
                Simulate Notification
              </h3>
              <button onClick={() => setShowSimulator(false)} className="text-white/70 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleTestNotification} className="space-y-3 text-xs">
              <div>
                <label className="text-white/70 block mb-1">App Name</label>
                <select
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  className="w-full bg-black/40 border border-white/20 rounded-xl p-2.5 text-white focus:outline-none"
                >
                  <option value="WhatsApp" className="bg-slate-900">WhatsApp</option>
                  <option value="Phone Call" className="bg-slate-900">Call</option>
                  <option value="Bank SMS" className="bg-slate-900">Bank SMS</option>
                  <option value="Gmail" className="bg-slate-900">Gmail</option>
                </select>
              </div>
              <div>
                <label className="text-white/70 block mb-1">Message (Marathi / Hindi / English)</label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  rows={3}
                  placeholder="Type message..."
                  className="w-full bg-black/40 border border-white/20 rounded-xl p-2.5 text-white focus:outline-none resize-none placeholder:text-white/40"
                />
              </div>
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2 shadow-lg"
              >
                {isProcessing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                Send & Speak in English
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Notification Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-900/90 border border-white/20 rounded-3xl p-6 max-w-sm w-full space-y-5 shadow-2xl backdrop-blur-xl text-white">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Settings className="w-4 h-4 text-blue-400" />
                Notification Settings
              </h3>
              <button onClick={() => setShowSettings(false)} className="text-white/70 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-white/70 block mb-1">Spoken English Voice</label>
                <select
                  value={selectedVoice}
                  onChange={(e) => setSelectedVoice(e.target.value)}
                  className="w-full bg-black/40 border border-white/20 rounded-xl p-2.5 text-white focus:outline-none"
                >
                  {voices.map((v, i) => (
                    <option key={i} value={v.name} className="bg-slate-900">
                      {v.name} ({v.lang})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-white/70 block mb-1">Speech Speed: {voiceRate}x</label>
                <input
                  type="range"
                  min="0.75"
                  max="1.5"
                  step="0.05"
                  value={voiceRate}
                  onChange={(e) => setVoiceRate(parseFloat(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <span>Announce Only Important (Calls & Chats)</span>
                <input
                  type="checkbox"
                  checked={onlyImportant}
                  onChange={(e) => setOnlyImportant(e.target.checked)}
                  className="w-4 h-4 accent-blue-500"
                />
              </div>
            </div>

            <button
              onClick={() => setShowSettings(false)}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition shadow-lg"
            >
              Save Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

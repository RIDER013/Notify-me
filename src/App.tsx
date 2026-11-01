/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  Sliders,
  X,
  Sparkles,
  RefreshCw,
  BellRing,
  Gauge,
  Music,
  ChevronDown,
  ShieldCheck,
  Check,
  Save,
  Power,
  Phone,
  Mic,
  MicOff,
  PhoneOff,
  VolumeX
} from 'lucide-react';

interface NotificationLog {
  id: string;
  app: string;
  original: string;
  english: string;
  time: string;
}

// Minimalist boy and girl SVG icons (zero text)
const BoyIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a4 4 0 0 0-4 4v1a4 4 0 0 0 8 0V7a4 4 0 0 0-4-4Z" />
    <path d="M6 21v-2a6 6 0 0 1 12 0v2" />
    <path d="M9 3l1.5 2.5" />
    <path d="M15 3l-1.5 2.5" />
  </svg>
);

const GirlIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a4 4 0 0 0-4 4c0 1.5.8 2.8 2 3.5V11a2 2 0 0 0 4 0V9.5c1.2-.7 2-2 2-3.5a4 4 0 0 0-4-4Z" />
    <path d="M7 9c-1.5 2-1.5 5 0 7" />
    <path d="M17 9c1.5 2 1.5 5 0 7" />
    <path d="M6 21v-2a6 6 0 0 1 12 0v2" />
  </svg>
);

// Authentic Original Installed Smartphone App Icons
const WhatsAppIcon = () => (
  <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.65 3.742-.983zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YouTubeIcon = () => (
  <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const GmailIcon = () => (
  <svg className="w-5 h-5 text-rose-400" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.545l8.073-6.052C21.69 2.28 24 3.434 24 5.457z"/>
  </svg>
);

const PhoneCallIcon = () => (
  <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const MessagesIcon = () => (
  <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 10H6v-2h12v2zm0-3H6V7h12v2z"/>
  </svg>
);

const TelegramIcon = () => (
  <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.458c.538-.196 1.006.128.832.939z"/>
  </svg>
);

const GooglePayIcon = () => (
  <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2V15h2v1.5zm1.07-6.75l-.9.92C12.45 11.9 12 12.5 12 14h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.1 2.67z"/>
  </svg>
);

const PhonePeIcon = () => (
  <svg className="w-5 h-5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v12" />
    <path d="M16 10H8" />
    <path d="M15 14H9" />
  </svg>
);

const BankIcon = () => (
  <svg className="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </svg>
);

const TruecallerIcon = () => (
  <svg className="w-5 h-5 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const SnapchatIcon = () => (
  <svg className="w-5 h-5 text-yellow-300" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2c-3.8 0-6.5 2.8-6.5 6.5 0 1.2.3 2.5.5 3.1.2.5-.2.9-.6 1.1-.5.3-1.4.7-1.4 1.5 0 .6.5 1 1 1.2.5.2.9.2 1.4.1.3 0 .5.3.4.6-.2.8-.7 1.7-.7 2.2 0 1.2 1.4 1.7 2.5 1.7.9 0 1.6-.3 2.1-.5.3-.1.6 0 .8.2.8.8 1.9 1.3 3.1 1.3s2.3-.5 3.1-1.3c.2-.2.5-.3.8-.2.5.2 1.2.5 2.1.5 1.1 0 2.5-.5 2.5-1.7 0-.5-.5-1.4-.7-2.2-.1-.3.1-.6.4-.6.5.1.9.1 1.4-.1.5-.2 1-.6 1-1.2 0-.8-.9-1.2-1.4-1.5-.4-.2-.8-.6-.6-1.1.2-.6.5-1.9.5-3.1C18.5 4.8 15.8 2 12 2z"/>
  </svg>
);

export default function App() {
  const [currentAnnouncement, setCurrentAnnouncement] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [notifications, setNotifications] = useState<NotificationLog[]>([]);
  const [showRightPanel, setShowRightPanel] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);

  // Master Switch state
  const [isMasterOn, setIsMasterOn] = useState(true);

  // Permission Request State
  const [pendingPermissionApp, setPendingPermissionApp] = useState<string | null>(null);

  // Voice Selection (Boy / Girl) & 3 distinct voices each with arrow dropdowns
  const [selectedGender, setSelectedGender] = useState<'female' | 'male'>('female');
  const [maleVoiceIndex, setMaleVoiceIndex] = useState(0);
  const [femaleVoiceIndex, setFemaleVoiceIndex] = useState(0);
  const [openMaleDropdown, setOpenMaleDropdown] = useState(false);
  const [openFemaleDropdown, setOpenFemaleDropdown] = useState(false);
  const [speechRate, setSpeechRate] = useState(0.95);
  const [speechPitch, setSpeechPitch] = useState(1.0);
  const [selectedPhraseIndex, setSelectedPhraseIndex] = useState(0);

  const DEMO_PHRASES = [
    "Hello sir, you have a new message from Ritesh.",
    "Hello sir, Ritesh has sent you a message.",
    "Excuse me sir, Ritesh just messaged you.",
    "Hello sir, Ritesh has sent you a new message. Please check your phone."
  ];

  // Call Assistant & Voice Command State
  const [showCallModal, setShowCallModal] = useState(false);
  const [isCallAssistantOn, setIsCallAssistantOn] = useState(true);

  const [incomingCall, setIncomingCall] = useState<{
    caller: string;
    rawNumber?: string;
    status: 'ringing' | 'connected' | 'connected_mute' | 'connected_speaker' | 'ended';
  } | null>(null);
  const [isMicListening, setIsMicListening] = useState(false);
  const [voiceCommandTranscript, setVoiceCommandTranscript] = useState('');
  const recognitionRef = useRef<any>(null);
  const ringtoneAudioRef = useRef<{ stop: () => void } | null>(null);
  const isCallRingingRef = useRef(false);

  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Test form state
  const [testApp, setTestApp] = useState('WhatsApp');
  const [testMessage, setTestMessage] = useState('अरे राहुल, आज संध्याकाळी भेटायचं का?');
  const [isProcessing, setIsProcessing] = useState(false);

  // Installed Smartphone Apps List (Original Authentic Apps)
  const [appToggles, setAppToggles] = useState<Record<string, { isOn: boolean; icon: React.ReactNode; color: string }>>({
    'WhatsApp': { isOn: true, icon: <WhatsAppIcon />, color: '#25D366' },
    'Phone': { isOn: true, icon: <PhoneCallIcon />, color: '#22C55E' },
    'Messages': { isOn: true, icon: <MessagesIcon />, color: '#3B82F6' },
    'Instagram': { isOn: false, icon: <InstagramIcon />, color: '#E1306C' },
    'YouTube': { isOn: false, icon: <YouTubeIcon />, color: '#EF4444' },
    'Gmail': { isOn: true, icon: <GmailIcon />, color: '#EA4335' },
    'Google Pay': { isOn: false, icon: <GooglePayIcon />, color: '#4285F4' },
    'PhonePe': { isOn: true, icon: <PhonePeIcon />, color: '#8B5CF6' },
    'Telegram': { isOn: true, icon: <TelegramIcon />, color: '#0088CC' },
    'Bank SMS': { isOn: true, icon: <BankIcon />, color: '#F59E0B' },
    'Truecaller': { isOn: false, icon: <TruecallerIcon />, color: '#0284C7' },
    'Snapchat': { isOn: false, icon: <SnapchatIcon />, color: '#FACC15' },
  });

  const appTogglesRef = useRef(appToggles);
  useEffect(() => {
    appTogglesRef.current = appToggles;
  }, [appToggles]);

  // Load available system voices
  useEffect(() => {
    const updateVoices = () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const available = window.speechSynthesis.getVoices();
        setVoices(available);
      }
    };
    updateVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  // On App Open: Automatically request required system permissions & initialize notification listeners
  useEffect(() => {
    // 1. Notification Permission request on open
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission().catch(() => {});
      }
    }

    // 2. Screen Wake Lock to keep phone active while announcer is ON
    let wakeLockSentinel: any = null;
    if (typeof navigator !== 'undefined' && 'wakeLock' in navigator && isMasterOn) {
      navigator.wakeLock.request('screen').then(sentinel => {
        wakeLockSentinel = sentinel;
      }).catch(() => {});
    }

    // 3. Audio & Speech synthesis unlock for mobile devices
    const unlockAudio = () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.resume();
      }
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };
    window.addEventListener('click', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);

    // 4. Background Notification Listener Connectivity (BroadcastChannel & Window Message)
    let channel: BroadcastChannel | null = null;
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        channel = new BroadcastChannel('notifyvoice_notification_channel');
        channel.onmessage = (event) => {
          if (event.data?.appName) {
            handleProcessNotification(event.data.appName, event.data.message || '', event.data.sender);
          }
        };
      }
    } catch {}

    const handleWindowMessage = (event: MessageEvent) => {
      if (event.data && (event.data.type === 'INCOMING_NOTIFICATION' || event.data.type === 'NOTIFICATION')) {
        const { appName, message, sender } = event.data;
        handleProcessNotification(appName || 'WhatsApp', message || '', sender);
      }
    };
    window.addEventListener('message', handleWindowMessage);

    return () => {
      if (wakeLockSentinel) wakeLockSentinel.release().catch(() => {});
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('message', handleWindowMessage);
      if (channel) channel.close();
    };
  }, [isMasterOn]);

  // Strict gender voice classifier
  const isFemaleVoice = (v: SpeechSynthesisVoice) => {
    const name = v.name.toLowerCase();
    if (name === 'google us english') return true;
    return /female|girl|woman|samantha|victoria|zira|karen|aria|jenny|sonia|tessa|moira|fiona|veena|sangeeta|heera|iob|sfg#female/i.test(name);
  };

  const isMaleVoice = (v: SpeechSynthesisVoice) => {
    const name = v.name.toLowerCase();
    return /male|boy|man|guy|david|george|alex|daniel|oliver|ryan|tom|mark|ravi|rishi|tpd|sfg#male/i.test(name);
  };

  // Filter and rank natural studio voices strictly per gender
  const getRankedVoices = (gender: 'female' | 'male') => {
    if (!voices || voices.length === 0) return [];

    const enVoices = voices.filter(v => v.lang.startsWith('en'));
    const pool = enVoices.length > 0 ? enVoices : voices;

    if (gender === 'male') {
      const maleVoices = pool.filter(v => isMaleVoice(v) && !isFemaleVoice(v));
      if (maleVoices.length > 0) return maleVoices;
      const nonFemaleVoices = pool.filter(v => !isFemaleVoice(v));
      if (nonFemaleVoices.length > 0) return nonFemaleVoices;
      return pool;
    } else {
      const femaleVoices = pool.filter(v => isFemaleVoice(v) && !isMaleVoice(v));
      if (femaleVoices.length > 0) return femaleVoices;
      return pool;
    }
  };

  const getBestVoice = (gender: 'female' | 'male', index: number) => {
    const ranked = getRankedVoices(gender);
    if (ranked.length === 0) return undefined;
    return ranked[index % ranked.length];
  };

  // Play gentle notification sound
  const playChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    } catch {}
  };

  // Speaks aloud with crystal-clear natural voice
  const speakWithVoice = (text: string, gender: 'female' | 'male', variant?: number, onEndCallback?: () => void) => {
    if (!('speechSynthesis' in window)) {
      if (onEndCallback) onEndCallback();
      return;
    }
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speechRate;

    const vIndex = variant !== undefined ? variant : (gender === 'female' ? femaleVoiceIndex : maleVoiceIndex);

    const pitchOffsets = gender === 'female' 
      ? [1.0, 1.08, 1.04] 
      : [0.82, 0.76, 0.85];
    
    const basePitch = pitchOffsets[vIndex % 3];
    utterance.pitch = Math.max(0.6, Math.min(1.5, basePitch * speechPitch));

    const voice = getBestVoice(gender, vIndex);
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onend = () => {
      setIsSpeaking(false);
      if (onEndCallback) onEndCallback();
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      if (onEndCallback) onEndCallback();
    };

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Realistic phone ringtone generator via Web Audio API
  const startRingtone = () => {
    stopRingtone();
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      let isStopped = false;

      // Realistic phone ring tone: 440Hz + 480Hz double-ring cadence
      const playRingCycle = () => {
        if (isStopped || ctx.state === 'closed') return;
        const now = ctx.currentTime;

        [
          { start: 0, duration: 0.45 },
          { start: 0.6, duration: 0.45 }
        ].forEach(({ start, duration }) => {
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gain = ctx.createGain();

          osc1.frequency.setValueAtTime(440, now + start);
          osc2.frequency.setValueAtTime(480, now + start);

          gain.gain.setValueAtTime(0, now + start);
          gain.gain.linearRampToValueAtTime(0.25, now + start + 0.05);
          gain.gain.setValueAtTime(0.25, now + start + duration - 0.05);
          gain.gain.linearRampToValueAtTime(0, now + start + duration);

          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(ctx.destination);

          osc1.start(now + start);
          osc2.start(now + start);
          osc1.stop(now + start + duration);
          osc2.stop(now + start + duration);
        });

        setTimeout(() => {
          if (!isStopped) playRingCycle();
        }, 3200);
      };

      playRingCycle();

      ringtoneAudioRef.current = {
        stop: () => {
          isStopped = true;
          try { ctx.close(); } catch {}
          ringtoneAudioRef.current = null;
        }
      };
    } catch (e) {
      console.error('Ringtone playback error:', e);
    }
  };

  const stopRingtone = () => {
    if (ringtoneAudioRef.current) {
      ringtoneAudioRef.current.stop();
    }
  };

  // Immediate voice command listener while ringing
  const startVoiceCommandListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.log('SpeechRecognition not available in this browser');
      setIsMicListening(false);
      return;
    }

    try {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch {}
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsMicListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => (result as any)[0].transcript)
          .join(' ')
          .toLowerCase();
        
        setVoiceCommandTranscript(transcript);

        // Command 1: Receive and mute
        if (/receive.*mute|mute/i.test(transcript)) {
          handleCallAction('connected_mute');
          try { recognition.stop(); } catch {}
        }
        // Command 2: Receive and speaker
        else if (/receive.*speaker|speaker/i.test(transcript)) {
          handleCallAction('connected_speaker');
          try { recognition.stop(); } catch {}
        }
        // Command 3: Receive
        else if (/receive|answer|accept/i.test(transcript)) {
          handleCallAction('connected');
          try { recognition.stop(); } catch {}
        }
        // Command 4: End
        else if (/end|cut|reject|disconnect|decline/i.test(transcript)) {
          handleCallAction('ended');
          try { recognition.stop(); } catch {}
        }
      };

      recognition.onerror = () => {
        if (!isCallRingingRef.current) {
          setIsMicListening(false);
        }
      };

      recognition.onend = () => {
        // Keep mic active as long as the phone is ringing
        if (isCallRingingRef.current) {
          try {
            recognition.start();
          } catch {
            setIsMicListening(false);
          }
        } else {
          setIsMicListening(false);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Error starting SpeechRecognition:', err);
      setIsMicListening(false);
    }
  };

  // Handles call command (from voice command or tap buttons)
  const handleCallAction = (action: 'connected' | 'connected_mute' | 'connected_speaker' | 'ended') => {
    // Stop ringing and mic immediately
    isCallRingingRef.current = false;
    stopRingtone();
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch {}
    }
    setIsMicListening(false);

    setIncomingCall(prev => prev ? { ...prev, status: action } : null);

    if (action === 'connected') {
      speakWithVoice('Call received.', selectedGender);
      setTimeout(() => {
        setIncomingCall(null);
        setVoiceCommandTranscript('');
      }, 4000);
    } else if (action === 'connected_mute') {
      speakWithVoice('Call received on mute.', selectedGender);
      setTimeout(() => {
        setIncomingCall(null);
        setVoiceCommandTranscript('');
      }, 4000);
    } else if (action === 'connected_speaker') {
      speakWithVoice('Call received on speaker.', selectedGender);
      setTimeout(() => {
        setIncomingCall(null);
        setVoiceCommandTranscript('');
      }, 4000);
    } else {
      speakWithVoice('Call ended.', selectedGender);
      setTimeout(() => {
        setIncomingCall(null);
        setVoiceCommandTranscript('');
      }, 1500);
    }
  };

  // Trigger Incoming Call:
  // Phone does NOT speak anything ("pohne kahihi nahi bolnaar")
  // Ringtone is heard as normal ("ji ring aahe na aaadhipasun ti aayku yeil")
  // Microphone turns ON immediately and stays active while ringing
  const triggerIncomingCall = (callerName: string, rawNumber?: string) => {
    if (!isCallAssistantOn) {
      console.log('Call assistant is OFF.');
      return;
    }

    setShowCallModal(false);
    setShowVoiceModal(false);
    setShowRightPanel(false);

    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch {}
    }
    window.speechSynthesis.cancel();
    stopRingtone();

    let cleanName = (callerName || '').trim();
    const digits = (rawNumber || cleanName).replace(/\D/g, '');
    if (!cleanName || cleanName.toLowerCase() === 'unknown' || (digits.length >= 6 && cleanName === rawNumber)) {
      cleanName = digits.length >= 4 ? `number ending in ${digits.slice(-4)}` : 'unknown caller';
    }

    setIncomingCall({
      caller: cleanName,
      rawNumber: rawNumber || (digits.length >= 6 ? `+91 ${digits}` : undefined),
      status: 'ringing'
    });
    setVoiceCommandTranscript('');

    // Start ringtone and enable continuous mic listening
    isCallRingingRef.current = true;
    startRingtone();
    startVoiceCommandListening();
  };

  // Announce notification aloud
  const announceNotification = (appName: string, originalText: string, englishText: string) => {
    if (!isMasterOn) {
      console.log('Notification ignored because master announcer is OFF.');
      return;
    }

    if (!appTogglesRef.current[appName]?.isOn) {
      console.log(`Notification from ${appName} ignored because toggle is OFF.`);
      return;
    }

    playChime();
    setCurrentAnnouncement(`${appName}: ${englishText}`);
    setIsSpeaking(true);

    const activeIndex = selectedGender === 'female' ? femaleVoiceIndex : maleVoiceIndex;
    speakWithVoice(englishText, selectedGender, activeIndex);

    const logItem: NotificationLog = {
      id: Date.now().toString(),
      app: appName,
      original: originalText,
      english: englishText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setNotifications(prev => [logItem, ...prev.slice(0, 10)]);
  };

  // Formats announcement using the exact phrase style selected in the voice window
  const formatAnnouncementWithSelectedPhrase = (sender: string, appName: string, phraseIdx = selectedPhraseIndex) => {
    let cleanSender = (sender || '').trim();
    if (!cleanSender || cleanSender.toLowerCase() === 'alert' || cleanSender.toLowerCase() === 'notification') {
      cleanSender = appName;
    }
    const digits = cleanSender.replace(/\D/g, '');
    if (digits.length >= 6) {
      cleanSender = `number ending in ${digits.slice(-4)}`;
    }

    switch (phraseIdx) {
      case 0:
        return `Hello sir, you have a new message from ${cleanSender} on ${appName}.`;
      case 1:
        return `Hello sir, ${cleanSender} has sent you a message on ${appName}.`;
      case 2:
        return `Excuse me sir, ${cleanSender} just messaged you on ${appName}.`;
      case 3:
      default:
        return `Hello sir, ${cleanSender} has sent you a new message on ${appName}. Please check your phone.`;
    }
  };

  // Process incoming notification via Gemini AI
  const handleProcessNotification = async (appName: string, message: string, senderName?: string) => {
    if (!appTogglesRef.current[appName]?.isOn) {
      console.log(`Notifications for ${appName} are turned OFF in your settings.`);
      return;
    }

    setIsProcessing(true);
    try {
      const res = await fetch('/api/translate-and-summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appName, title: senderName || 'Alert', body: message, originalLanguage: 'Auto' }),
      });
      const data = await res.json();
      const detectedSender = data.sender || senderName || appName;
      const spoken = formatAnnouncementWithSelectedPhrase(detectedSender, appName, selectedPhraseIndex);
      announceNotification(appName, message, spoken);
      setShowTestModal(false);
    } catch {
      const spoken = formatAnnouncementWithSelectedPhrase(senderName || appName, appName, selectedPhraseIndex);
      announceNotification(appName, message, spoken);
      setShowTestModal(false);
    } finally {
      setIsProcessing(false);
    }
  };

  // User selects an app in the settings drawer:
  // If OFF -> Asks for notification permission with Android dialog!
  // If ON -> Turns OFF
  const handleAppToggleClick = (app: string) => {
    const isCurrentlyOn = appToggles[app]?.isOn;
    if (isCurrentlyOn) {
      setAppToggles(prev => ({
        ...prev,
        [app]: { ...prev[app], isOn: false }
      }));
    } else {
      // Trigger notification permission request dialog
      setPendingPermissionApp(app);
    }
  };

  const handleGrantPermission = async () => {
    if (!pendingPermissionApp) return;
    const app = pendingPermissionApp;

    // Trigger browser system notification permission if available
    try {
      if ('Notification' in window && Notification.permission !== 'granted') {
        await Notification.requestPermission();
      }
    } catch {}

    setAppToggles(prev => ({
      ...prev,
      [app]: { ...prev[app], isOn: true }
    }));
    setPendingPermissionApp(null);
    playChime();
    speakWithVoice(`${app} notification access granted.`, selectedGender);
  };

  const handleDenyPermission = () => {
    setPendingPermissionApp(null);
  };

  return (
    <div
      className="min-h-screen text-white flex flex-col items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/assets/aistudio/image_605dd069.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Ultra-transparent overlay so background image is crystal clear */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

      {/* Top Right Controls */}
      <div className="absolute top-5 right-5 z-20 flex items-center gap-2.5">
        {/* Transparent Call Icon Button (To the left of Voice Selection) */}
        <button
          onClick={() => {
            setShowCallModal(!showCallModal);
            setShowVoiceModal(false);
          }}
          className={`p-2.5 rounded-2xl border backdrop-blur-md transition shadow-lg flex items-center justify-center cursor-pointer ${
            showCallModal
              ? 'bg-white/25 border-emerald-400 text-emerald-300'
              : isCallAssistantOn
                ? 'bg-white/10 border-white/20 text-emerald-400 hover:bg-white/20'
                : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/15'
          }`}
          title="Call Assistant Settings"
        >
          <Phone className="w-5 h-5" />
        </button>

        {/* Speaker Voice Selection Button */}
        <button
          onClick={() => setShowVoiceModal(!showVoiceModal)}
          className={`p-2.5 rounded-2xl border backdrop-blur-md transition shadow-lg flex items-center justify-center cursor-pointer ${
            showVoiceModal ? 'bg-white/25 border-white/40 text-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
          }`}
          title="Voice Selection"
        >
          <Volume2 className="w-5 h-5" />
        </button>

        {/* Right Drawer Toggle (15% Screen width panel) */}
        <button
          onClick={() => setShowRightPanel(true)}
          className="p-2.5 rounded-2xl bg-white/10 border border-white/20 text-white hover:bg-white/25 backdrop-blur-md transition shadow-lg flex items-center justify-center cursor-pointer"
          title="Installed Apps & Notification Settings"
        >
          <Sliders className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Mini Window for Call Assistant */}
      {showCallModal && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowCallModal(false)}
        >
          <div
            className="absolute top-18 right-16 z-50 w-48 bg-black/25 border border-white/15 p-2 rounded-2xl shadow-2xl backdrop-blur-xl flex flex-col gap-1.5 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Transparent ON / OFF Button */}
            <button
              onClick={() => {
                const nextState = !isCallAssistantOn;
                setIsCallAssistantOn(nextState);
                speakWithVoice(nextState ? 'Call Assistant ON' : 'Call Assistant OFF', selectedGender);
              }}
              className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition border backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                isCallAssistantOn
                  ? 'bg-white/10 border-emerald-400/40 text-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.25)]'
                  : 'bg-white/5 border-white/15 text-white/50 hover:text-white hover:bg-white/10'
              }`}
            >
              <Power className="w-3.5 h-3.5" />
              <span>{isCallAssistantOn ? 'ON' : 'OFF'}</span>
            </button>

            {/* Call Commands: Receive, Receive and mute, Receive and speaker, End */}
            <div className="border-t border-white/10 pt-1.5 space-y-1">
              <button
                onClick={() => speakWithVoice('Receive', selectedGender)}
                className="w-full py-1.5 px-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left text-[11px] text-white/80 hover:text-white font-medium backdrop-blur-md transition cursor-pointer flex items-center justify-between"
                title="Command: Receive"
              >
                <span>Receive</span>
                <Phone className="w-3 h-3 text-emerald-300/70" />
              </button>

              <button
                onClick={() => speakWithVoice('Receive and mute', selectedGender)}
                className="w-full py-1.5 px-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left text-[11px] text-white/80 hover:text-white font-medium backdrop-blur-md transition cursor-pointer flex items-center justify-between"
                title="Command: Receive and mute"
              >
                <span>Receive and mute</span>
                <MicOff className="w-3 h-3 text-amber-300/70" />
              </button>

              <button
                onClick={() => speakWithVoice('Receive and speaker', selectedGender)}
                className="w-full py-1.5 px-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left text-[11px] text-white/80 hover:text-white font-medium backdrop-blur-md transition cursor-pointer flex items-center justify-between"
                title="Command: Receive and speaker"
              >
                <span>Receive and speaker</span>
                <Volume2 className="w-3 h-3 text-blue-300/70" />
              </button>

              <button
                onClick={() => speakWithVoice('End', selectedGender)}
                className="w-full py-1.5 px-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left text-[11px] text-white/80 hover:text-white font-medium backdrop-blur-md transition cursor-pointer flex items-center justify-between"
                title="Command: End"
              >
                <span>End</span>
                <PhoneOff className="w-3 h-3 text-rose-300/70" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mini Window for Voice Selection & Speed/Rate Controls */}
      {showVoiceModal && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowVoiceModal(false)}
        >
          <div
            className="absolute top-18 right-5 z-50 w-64 max-h-[82vh] overflow-y-auto bg-black/45 border border-white/20 p-3 rounded-2xl shadow-2xl backdrop-blur-xl flex flex-col gap-2.5 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Two Columns: Male and Female with respective 1, 2, 3 drop-downs right underneath */}
            <div className="flex gap-2 items-start">
              {/* Male Column */}
              <div className="flex-1 flex flex-col items-center gap-1.5">
                <button
                  onClick={() => {
                    setSelectedGender('male');
                    setOpenMaleDropdown(!openMaleDropdown);
                    setOpenFemaleDropdown(false);
                    speakWithVoice('Hello sir, Ritesh has sent you a new message. Please check your phone.', 'male', maleVoiceIndex);
                  }}
                  className={`w-full py-2 px-2 rounded-xl transition border backdrop-blur-md flex items-center justify-center gap-1.5 cursor-pointer ${
                    selectedGender === 'male'
                      ? 'bg-blue-500/35 border-blue-400 text-blue-300 shadow-[0_0_12px_rgba(96,165,250,0.5)] ring-1 ring-blue-400'
                      : 'bg-white/10 border-white/15 text-white/50 hover:text-white hover:bg-white/20'
                  }`}
                  title="Boy Voice"
                >
                  <BoyIcon />
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openMaleDropdown ? 'rotate-180 text-blue-300' : 'text-white/40'}`} />
                </button>

                {/* Male 1 2 3 Voices dropdown underneath */}
                {openMaleDropdown && (
                  <div className="w-full flex items-center justify-between gap-1 bg-white/5 p-1 rounded-xl border border-blue-400/30 animate-fade-in">
                    {[0, 1, 2].map((idx) => {
                      const phrases = [
                        'Hello sir, you have a new message from Ritesh.',
                        'Hello sir, Ritesh has sent you a message.',
                        'Excuse me sir, Ritesh just messaged you.'
                      ];
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            setSelectedGender('male');
                            setMaleVoiceIndex(idx);
                            speakWithVoice(phrases[idx], 'male', idx);
                          }}
                          className={`flex-1 py-1 rounded-lg text-xs font-bold transition border cursor-pointer ${
                            selectedGender === 'male' && maleVoiceIndex === idx
                              ? 'bg-blue-500/50 border-blue-400 text-blue-100 shadow-sm'
                              : 'bg-transparent border-transparent text-white/50 hover:text-white hover:bg-white/10'
                          }`}
                          title={`Male Voice ${idx + 1}`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Female Column */}
              <div className="flex-1 flex flex-col items-center gap-1.5">
                <button
                  onClick={() => {
                    setSelectedGender('female');
                    setOpenFemaleDropdown(!openFemaleDropdown);
                    setOpenMaleDropdown(false);
                    speakWithVoice('Hello sir, Ritesh has sent you a new message. Please check your phone.', 'female', femaleVoiceIndex);
                  }}
                  className={`w-full py-2 px-2 rounded-xl transition border backdrop-blur-md flex items-center justify-center gap-1.5 cursor-pointer ${
                    selectedGender === 'female'
                      ? 'bg-pink-500/35 border-pink-400 text-pink-300 shadow-[0_0_12px_rgba(244,114,182,0.5)] ring-1 ring-pink-400'
                      : 'bg-white/10 border-white/15 text-white/50 hover:text-white hover:bg-white/20'
                  }`}
                  title="Girl Voice"
                >
                  <GirlIcon />
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openFemaleDropdown ? 'rotate-180 text-pink-300' : 'text-white/40'}`} />
                </button>

                {/* Female 1 2 3 Voices dropdown underneath */}
                {openFemaleDropdown && (
                  <div className="w-full flex items-center justify-between gap-1 bg-white/5 p-1 rounded-xl border border-pink-400/30 animate-fade-in">
                    {[0, 1, 2].map((idx) => {
                      const phrases = [
                        'Hello sir, you have a new message from Ritesh.',
                        'Hello sir, Ritesh has sent you a message.',
                        'Excuse me sir, Ritesh just messaged you.'
                      ];
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            setSelectedGender('female');
                            setFemaleVoiceIndex(idx);
                            speakWithVoice(phrases[idx], 'female', idx);
                          }}
                          className={`flex-1 py-1 rounded-lg text-xs font-bold transition border cursor-pointer ${
                            selectedGender === 'female' && femaleVoiceIndex === idx
                              ? 'bg-pink-500/50 border-pink-400 text-pink-100 shadow-sm'
                              : 'bg-transparent border-transparent text-white/50 hover:text-white hover:bg-white/10'
                          }`}
                          title={`Female Voice ${idx + 1}`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Two Transparent Sliders: Speed & Speech Rate */}
            <div className="border-t border-white/10 pt-2 space-y-2">
              {/* Speed Slider */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] text-white/80 font-medium">
                  <span className="flex items-center gap-1">
                    <Gauge className="w-3 h-3 text-blue-300" />
                    Speed
                  </span>
                  <span className="text-blue-300 font-semibold">{speechRate.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.6"
                  max="1.5"
                  step="0.05"
                  value={speechRate}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setSpeechRate(val);
                  }}
                  className="w-full accent-blue-400 bg-white/10 h-1.5 rounded-lg cursor-pointer"
                />
              </div>

              {/* Speech Rate / Pitch Slider */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] text-white/80 font-medium">
                  <span className="flex items-center gap-1">
                    <Music className="w-3 h-3 text-pink-300" />
                    Pitch
                  </span>
                  <span className="text-pink-300 font-semibold">{speechPitch.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.8"
                  max="1.2"
                  step="0.05"
                  value={speechPitch}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setSpeechPitch(val);
                  }}
                  className="w-full accent-pink-400 bg-white/10 h-1.5 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* 4 Demo Phrases in Voice Selection */}
            <div className="border-t border-white/10 pt-2 space-y-1.5">
              <span className="text-[9px] font-semibold text-white/50 uppercase tracking-wider block px-1">
                Demo Phrases
              </span>
              {DEMO_PHRASES.map((phrase, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedPhraseIndex(idx);
                    speakWithVoice(phrase, selectedGender);
                  }}
                  className={`w-full p-2 rounded-xl text-left text-[10.5px] leading-snug transition border backdrop-blur-md cursor-pointer flex items-start gap-1.5 ${
                    selectedPhraseIndex === idx
                      ? selectedGender === 'male'
                        ? 'bg-blue-500/25 border-blue-400 text-blue-200 shadow-sm ring-1 ring-blue-400/50'
                        : 'bg-pink-500/25 border-pink-400 text-pink-200 shadow-sm ring-1 ring-pink-400/50'
                      : 'bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                  title="Click to play demo"
                >
                  <span className="font-bold text-[9px] opacity-60 shrink-0 mt-0.5">{idx + 1}.</span>
                  <span className="flex-1 font-medium">"{phrase}"</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating Notification Reader Card (Reads notifications aloud) */}
      {currentAnnouncement && (
        <div className="absolute bottom-22 left-1/2 -translate-x-1/2 z-30 max-w-sm w-full px-4 animate-fade-in">
          <div className="bg-black/35 border border-white/25 rounded-2xl p-4 backdrop-blur-xl shadow-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-300 flex items-center gap-2">
                <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-bounce text-emerald-400' : ''}`} />
                {isSpeaking ? 'Reading Notification Aloud...' : 'Notification Read'}
              </span>
              <button
                onClick={() => setCurrentAnnouncement(null)}
                className="text-white/60 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-white leading-relaxed font-medium">
              "{currentAnnouncement}"
            </p>
          </div>
        </div>
      )}

      {/* Active Incoming Call Assistant Card / Modal */}
      {incomingCall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="bg-black/60 border border-white/25 rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-2xl backdrop-blur-2xl text-white text-center">
            
            {/* Call Header */}
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${
                  incomingCall.status === 'ringing' 
                    ? 'bg-emerald-500/20 border-2 border-emerald-400 animate-pulse text-emerald-300' 
                    : incomingCall.status === 'ended'
                      ? 'bg-rose-500/20 border-2 border-rose-400 text-rose-300'
                      : 'bg-blue-500/20 border-2 border-blue-400 text-blue-300'
                }`}>
                  <Phone className="w-7 h-7" />
                </div>
                {incomingCall.status === 'ringing' && (
                  <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-black/80 border border-emerald-400/40 text-[9px] font-bold text-emerald-300 flex items-center gap-0.5 animate-pulse">
                    <BellRing className="w-2.5 h-2.5 text-emerald-400 animate-bounce" />
                    Ringing
                  </span>
                )}
              </div>

              <div className="space-y-0.5">
                <h3 className="text-lg font-bold text-white tracking-wide">
                  {incomingCall.caller}
                </h3>
                {incomingCall.rawNumber && (
                  <p className="text-xs text-white/60 font-mono">
                    {incomingCall.rawNumber}
                  </p>
                )}
                <span className="inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300">
                  Ringing • Mic Active
                </span>
              </div>
            </div>

            {/* Assistant & Mic Status */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 space-y-2">
              {incomingCall.status === 'ringing' && (
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-2 text-xs text-cyan-300 font-bold">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                    </span>
                    <Mic className="w-4 h-4 text-cyan-300" />
                    <span>Microphone ON: Say Command</span>
                  </div>
                  <p className="text-[10px] text-white/60">
                    Say: <span className="text-emerald-300 font-semibold">"Receive"</span>, <span className="text-amber-300 font-semibold">"Receive and mute"</span>, <span className="text-blue-300 font-semibold">"Receive and speaker"</span>, or <span className="text-rose-300 font-semibold">"End"</span>
                  </p>
                  {voiceCommandTranscript && (
                    <div className="text-[11px] font-medium text-amber-300 bg-black/40 py-1 px-2 rounded-lg border border-white/10">
                      Heard: "{voiceCommandTranscript}"
                    </div>
                  )}
                </div>
              )}

              {incomingCall.status === 'connected' && (
                <div className="text-xs font-bold text-emerald-300 flex items-center justify-center gap-1.5 py-1">
                  <Phone className="w-4 h-4" />
                  <span>Call Received</span>
                </div>
              )}

              {incomingCall.status === 'connected_mute' && (
                <div className="text-xs font-bold text-amber-300 flex items-center justify-center gap-1.5 py-1">
                  <MicOff className="w-4 h-4" />
                  <span>Call Received (Mic Muted)</span>
                </div>
              )}

              {incomingCall.status === 'connected_speaker' && (
                <div className="text-xs font-bold text-blue-300 flex items-center justify-center gap-1.5 py-1">
                  <Volume2 className="w-4 h-4" />
                  <span>Call Received (On Loudspeaker)</span>
                </div>
              )}

              {incomingCall.status === 'ended' && (
                <div className="text-xs font-bold text-rose-300 flex items-center justify-center gap-1.5 py-1">
                  <PhoneOff className="w-4 h-4" />
                  <span>Call Disconnected</span>
                </div>
              )}
            </div>

            {/* 4 Action Buttons (Tap or Voice) */}
            {incomingCall.status === 'ringing' && (
              <div className="grid grid-cols-4 gap-1.5 pt-1">
                {/* 1. Receive */}
                <button
                  onClick={() => handleCallAction('connected')}
                  className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md flex flex-col items-center justify-center gap-1.5 transition cursor-pointer group hover:border-emerald-400/40"
                  title="Receive"
                >
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center group-hover:scale-110 transition">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[9.5px] font-semibold leading-tight text-white/90">
                    Receive
                  </span>
                </button>

                {/* 2. Receive and mute */}
                <button
                  onClick={() => handleCallAction('connected_mute')}
                  className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md flex flex-col items-center justify-center gap-1.5 transition cursor-pointer group hover:border-amber-400/40"
                  title="Receive and mute"
                >
                  <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center group-hover:scale-110 transition">
                    <MicOff className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[9.5px] font-semibold leading-tight text-white/90">
                    Recv & Mute
                  </span>
                </button>

                {/* 3. Receive and speaker */}
                <button
                  onClick={() => handleCallAction('connected_speaker')}
                  className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md flex flex-col items-center justify-center gap-1.5 transition cursor-pointer group hover:border-blue-400/40"
                  title="Receive and speaker"
                >
                  <div className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center group-hover:scale-110 transition">
                    <Volume2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[9.5px] font-semibold leading-tight text-white/90">
                    Recv & Spkr
                  </span>
                </button>

                {/* 4. End */}
                <button
                  onClick={() => handleCallAction('ended')}
                  className="p-2 rounded-2xl bg-rose-500/15 hover:bg-rose-500/30 border border-rose-400/30 text-rose-200 backdrop-blur-md flex flex-col items-center justify-center gap-1.5 transition cursor-pointer group hover:border-rose-400/60"
                  title="End Call"
                >
                  <div className="w-7 h-7 rounded-full bg-rose-500/25 text-rose-300 flex items-center justify-center group-hover:scale-110 transition">
                    <PhoneOff className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[9.5px] font-semibold leading-tight text-rose-200">
                    End Call
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Center Controls & 'Created by Rider' */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-auto">
        {/* Transparent ON / OFF Button (Transparent both when ON and when OFF) */}
        <button
          onClick={() => {
            const nextState = !isMasterOn;
            setIsMasterOn(nextState);
            speakWithVoice(nextState ? 'Rider ON' : 'Rider OFF', selectedGender);
          }}
          className={`px-5 py-2 rounded-2xl text-xs font-bold transition border backdrop-blur-md flex items-center gap-2 cursor-pointer shadow-lg ${
            isMasterOn
              ? 'bg-white/10 border-emerald-400/40 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.25)]'
              : 'bg-white/5 border-white/15 text-white/50 hover:text-white hover:bg-white/10'
          }`}
          title="Toggle ON/OFF"
        >
          <Power className="w-3.5 h-3.5" />
          <span>{isMasterOn ? 'ON' : 'OFF'}</span>
        </button>

        {/* Small 'Created by Rider' Text */}
        <span className="text-[10px] text-white/50 tracking-wider font-medium select-none">
          Created by Rider
        </span>
      </div>

      {/* Right Side Drawer Panel with Original Smartphone Apps */}
      {showRightPanel && (
        <div 
          className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-[2px] animate-fade-in"
          onClick={() => setShowRightPanel(false)}
        >
          <div 
            className="w-[58%] sm:w-[42%] md:w-[28%] min-w-[200px] max-w-[280px] h-full bg-black/30 border-l border-white/15 p-3 shadow-2xl backdrop-blur-xl flex flex-col justify-between text-white animate-slide-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2 mb-1 border-b border-white/10">
              <span className="text-xs font-bold text-white/90">Installed Apps</span>
              <button
                onClick={() => setShowRightPanel(false)}
                className="text-white/60 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Stack of Original Installed Phone Apps with Permission Trigger */}
            <div className="space-y-1.5 overflow-y-auto flex-1 py-1 pr-1 custom-scrollbar">
              {Object.entries(appToggles).map(([app, data]) => (
                <button
                  key={app}
                  onClick={() => handleAppToggleClick(app)}
                  className={`w-full py-2 px-2.5 rounded-2xl flex items-center justify-between gap-2 transition border backdrop-blur-md cursor-pointer ${
                    data.isOn 
                      ? 'bg-white/10 border-emerald-400/40 text-white shadow-sm shadow-emerald-500/15' 
                      : 'bg-white/5 border-white/10 opacity-40 hover:opacity-80 text-white/70'
                  }`}
                  title={`${app}: ${data.isOn ? 'ON (tap to disable)' : 'OFF (tap to grant permission)'}`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                      {data.icon}
                    </div>
                    <span className="text-xs font-semibold text-white/95 truncate">
                      {app}
                    </span>
                  </div>
                  <span className={`text-[9.5px] font-bold tracking-wider px-2 py-0.5 rounded-lg shrink-0 ${
                    data.isOn 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30' 
                      : 'bg-white/5 text-white/40 border border-white/10'
                  }`}>
                    {data.isOn ? 'ON' : 'OFF'}
                  </span>
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="pt-2 border-t border-white/10 flex justify-center w-full">
              <button
                onClick={() => {
                  if (isMasterOn) {
                    setIsMasterOn(false);
                    speakWithVoice('Rider OFF', selectedGender);
                  }
                  setShowRightPanel(false);
                }}
                className="w-full py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-[10px] font-semibold transition border border-white/20 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Android System Style Notification Permission Dialog */}
      {pendingPermissionApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-slate-900/95 border border-white/20 rounded-3xl p-6 max-w-xs w-full shadow-2xl backdrop-blur-xl text-white space-y-4">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shadow-lg">
                {appToggles[pendingPermissionApp]?.icon || <ShieldCheck className="w-6 h-6 text-emerald-400" />}
              </div>
              <h3 className="text-sm font-bold text-white">
                Allow notification access?
              </h3>
              <p className="text-[11px] text-white/70 leading-relaxed">
                Allow <span className="font-semibold text-white">NotifyVoice AI</span> to read incoming notifications from <span className="font-semibold text-blue-300">{pendingPermissionApp}</span> and translate them aloud in English?
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
              <button
                onClick={handleGrantPermission}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                Allow
              </button>
              <button
                onClick={handleDenyPermission}
                className="w-full py-2 bg-white/10 hover:bg-white/15 text-white/70 hover:text-white rounded-xl text-xs font-medium transition cursor-pointer"
              >
                Don't allow
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Test / Send Notification Modal */}
      {showTestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-900/90 border border-white/20 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl backdrop-blur-xl text-white">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold flex items-center gap-2 text-blue-300">
                <BellRing className="w-4 h-4" />
                Simulate Incoming Notification
              </h3>
              <button onClick={() => setShowTestModal(false)} className="text-white/70 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-white/70 block mb-1">Choose App</label>
                <select
                  value={testApp}
                  onChange={(e) => setTestApp(e.target.value)}
                  className="w-full bg-black/40 border border-white/20 rounded-xl p-2.5 text-white focus:outline-none"
                >
                  {Object.keys(appToggles).map(app => (
                    <option key={app} value={app} className="bg-slate-900">
                      {app} ({appToggles[app].isOn ? 'Announcer ON' : 'Muted OFF'})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-white/70 block mb-1">Notification Message (Marathi / Hindi / English)</label>
                <textarea
                  value={testMessage}
                  onChange={(e) => setTestMessage(e.target.value)}
                  rows={3}
                  className="w-full bg-black/40 border border-white/20 rounded-xl p-2.5 text-white focus:outline-none resize-none placeholder:text-white/40"
                  placeholder="Type notification text..."
                />
              </div>

              <button
                onClick={() => handleProcessNotification(testApp, testMessage)}
                disabled={isProcessing}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                {isProcessing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                Trigger & Read Aloud in English
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

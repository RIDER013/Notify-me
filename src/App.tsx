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

  const [isMasterOn, setIsMasterOn] = useState(true);
  const [pendingPermissionApp, setPendingPermissionApp] = useState<string | null>(null);

  const [selectedGender, setSelectedGender] = useState<'female' | 'male'>('female');
  const [maleVoiceIndex, setMaleVoiceIndex] = useState(0);
  const [femaleVoiceIndex, setFemaleVoiceIndex] = useState(0);
  const [openMaleDropdown, setOpenMaleDropdown] = useState(false);
  const [openFemaleDropdown, setOpenFemaleDropdown] = useState(false);
  const [speechRate, setSpeechRate] = useState(0.95);
  const [speechPitch, setSpeechPitch] = useState(1.0);

  const [showCallModal, setShowCallModal] = useState(false);
  const [isCallAssistantOn, setIsCallAssistantOn] = useState(true);

  const [incomingCall, setIncomingCall] = useState<{
    caller: string;
    rawNumber?: string;
    status: 'ringing' | 'connected' | 'ended';
  } | null>(null);
  const [isMicListening, setIsMicListening] = useState(false);
  const [voiceCommandTranscript, setVoiceCommandTranscript] = useState('');
  const recognitionRef = useRef<any>(null);
  const ringtoneAudioRef = useRef<{ stop: () => void } | null>(null);
  const isCallRingingRef = useRef(false);

  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

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

  useEffect(() => {
    const updateVoices = () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        setVoices(window.speechSynthesis.getVoices());
      }
    };
    updateVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  useEffect(() => {
    let channel: BroadcastChannel | null = null;
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        channel = new BroadcastChannel('notifyvoice_notification_channel');
        channel.onmessage = (event) => {
          if (event.data?.appName) {
            announceNotification(event.data.appName, event.data.message || '');
          }
        };
      }
    } catch {}

    const handleWindowMessage = (event: MessageEvent) => {
      if (event.data && (event.data.type === 'INCOMING_NOTIFICATION' || event.data.type === 'NOTIFICATION')) {
        const { appName, message } = event.data;
        announceNotification(appName || 'WhatsApp', message || '');
      }
    };
    window.addEventListener('message', handleWindowMessage);

    return () => {
      window.removeEventListener('message', handleWindowMessage);
      if (channel) channel.close();
    };
  }, [isMasterOn]);

  // 1. window.speechSynthesis.speak() to read "[App Name] कडून मेसेज: [Message]"
  const announceNotification = (appName: string, messageBody: string) => {
    if (!isMasterOn) return;
    if (!appTogglesRef.current[appName]?.isOn) return;

    const announcementText = `${appName} कडून मेसेज: ${messageBody}`;
    setCurrentAnnouncement(announcementText);
    setIsSpeaking(true);

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(announcementText);
      utterance.rate = speechRate;
      utterance.pitch = speechPitch;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const startRingtone = () => {
    stopRingtone();
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      let isStopped = false;

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
    } catch {}
  };

  const stopRingtone = () => {
    if (ringtoneAudioRef.current) {
      ringtoneAudioRef.current.stop();
    }
  };

  // 2. const recognition = new (window.webkitSpeechRecognition || window.SpeechRecognition)()
  // listening for "Answer", "कॉल उचल", "Reject", "कॉल काप"
  const startVoiceCommandListening = () => {
    const SpeechRecognitionAPI = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRecognitionAPI) {
      setIsMicListening(false);
      return;
    }

    try {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch {}
      }

      const recognition = new SpeechRecognitionAPI();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'mr-IN';

      recognition.onstart = () => {
        setIsMicListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => (result as any)[0].transcript)
          .join(' ')
          .toLowerCase();

        setVoiceCommandTranscript(transcript);

        // Listen for "Answer" or "कॉल उचल"
        if (/answer|accept|कॉल उचल|उचल/i.test(transcript)) {
          handleCallAction('connected');
          try { recognition.stop(); } catch {}
        }
        // Listen for "Reject" or "कॉल काप"
        else if (/reject|cut|disconnect|कॉल काप|काप/i.test(transcript)) {
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
      setIsMicListening(false);
    }
  };

  const handleCallAction = (action: 'connected' | 'ended') => {
    isCallRingingRef.current = false;
    stopRingtone();
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch {}
    }
    setIsMicListening(false);

    setIncomingCall(prev => prev ? { ...prev, status: action } : null);

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const responseText = action === 'connected' ? 'Call accepted.' : 'Call rejected.';
      const utter = new SpeechSynthesisUtterance(responseText);
      window.speechSynthesis.speak(utter);
    }

    setTimeout(() => {
      setIncomingCall(null);
      setVoiceCommandTranscript('');
    }, 2500);
  };

  const triggerIncomingCall = (callerName: string, rawNumber?: string) => {
    if (!isCallAssistantOn) return;

    setShowCallModal(false);
    setShowVoiceModal(false);
    setShowRightPanel(false);

    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch {}
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    stopRingtone();

    let cleanName = (callerName || '').trim();
    const digits = (rawNumber || cleanName).replace(/\D/g, '');
    if (!cleanName || cleanName.toLowerCase() === 'unknown') {
      cleanName = digits.length >= 4 ? `number ending in ${digits.slice(-4)}` : 'unknown caller';
    }

    setIncomingCall({
      caller: cleanName,
      rawNumber: rawNumber || (digits.length >= 6 ? `+91 ${digits}` : undefined),
      status: 'ringing'
    });
    setVoiceCommandTranscript('');

    isCallRingingRef.current = true;
    startRingtone();
    startVoiceCommandListening();
  };

  const handleAppToggleClick = (app: string) => {
    if (appToggles[app]?.isOn) {
      setAppToggles(prev => ({
        ...prev,
        [app]: { ...prev[app], isOn: false }
      }));
    } else {
      setPendingPermissionApp(app);
    }
  };

  const handleGrantPermission = async () => {
    if (!pendingPermissionApp) return;
    const app = pendingPermissionApp;

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
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

      {/* Top Right Controls */}
      <div className="absolute top-5 right-5 z-20 flex items-center gap-2.5">
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

        <button
          onClick={() => setShowVoiceModal(!showVoiceModal)}
          className={`p-2.5 rounded-2xl border backdrop-blur-md transition shadow-lg flex items-center justify-center cursor-pointer ${
            showVoiceModal ? 'bg-white/25 border-white/40 text-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
          }`}
          title="Voice Selection"
        >
          <Volume2 className="w-5 h-5" />
        </button>

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
            <button
              onClick={() => setIsCallAssistantOn(!isCallAssistantOn)}
              className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition border backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                isCallAssistantOn
                  ? 'bg-white/10 border-emerald-400/40 text-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.25)]'
                  : 'bg-white/5 border-white/15 text-white/50 hover:text-white hover:bg-white/10'
              }`}
            >
              <Power className="w-3.5 h-3.5" />
              <span>{isCallAssistantOn ? 'ON' : 'OFF'}</span>
            </button>

            <div className="border-t border-white/10 pt-1.5 space-y-1">
              <button
                onClick={() => triggerIncomingCall('Ritesh', '+91 98765 43210')}
                className="w-full py-1.5 px-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left text-[11px] text-white/80 hover:text-white font-medium backdrop-blur-md transition cursor-pointer flex items-center justify-between"
              >
                <span>Simulate Call</span>
                <Phone className="w-3 h-3 text-emerald-300" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mini Window for Voice Selection */}
      {showVoiceModal && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowVoiceModal(false)}
        >
          <div
            className="absolute top-18 right-5 z-50 w-64 max-h-[82vh] overflow-y-auto bg-black/45 border border-white/20 p-3 rounded-2xl shadow-2xl backdrop-blur-xl flex flex-col gap-2.5 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex gap-2 items-start">
              <div className="flex-1 flex flex-col items-center gap-1.5">
                <button
                  onClick={() => {
                    setSelectedGender('male');
                    setOpenMaleDropdown(!openMaleDropdown);
                    setOpenFemaleDropdown(false);
                  }}
                  className={`w-full py-2 px-2 rounded-xl transition border backdrop-blur-md flex items-center justify-center gap-1.5 cursor-pointer ${
                    selectedGender === 'male'
                      ? 'bg-blue-500/35 border-blue-400 text-blue-300 shadow-[0_0_12px_rgba(96,165,250,0.5)] ring-1 ring-blue-400'
                      : 'bg-white/10 border-white/15 text-white/50 hover:text-white hover:bg-white/20'
                  }`}
                >
                  <BoyIcon />
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openMaleDropdown ? 'rotate-180 text-blue-300' : 'text-white/40'}`} />
                </button>
              </div>

              <div className="flex-1 flex flex-col items-center gap-1.5">
                <button
                  onClick={() => {
                    setSelectedGender('female');
                    setOpenFemaleDropdown(!openFemaleDropdown);
                    setOpenMaleDropdown(false);
                  }}
                  className={`w-full py-2 px-2 rounded-xl transition border backdrop-blur-md flex items-center justify-center gap-1.5 cursor-pointer ${
                    selectedGender === 'female'
                      ? 'bg-pink-500/35 border-pink-400 text-pink-300 shadow-[0_0_12px_rgba(244,114,182,0.5)] ring-1 ring-pink-400'
                      : 'bg-white/10 border-white/15 text-white/50 hover:text-white hover:bg-white/20'
                  }`}
                >
                  <GirlIcon />
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openFemaleDropdown ? 'rotate-180 text-pink-300' : 'text-white/40'}`} />
                </button>
              </div>
            </div>

            <div className="border-t border-white/10 pt-2 space-y-2">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] text-white/80 font-medium">
                  <span className="flex items-center gap-1"><Gauge className="w-3 h-3 text-blue-300" />Speed</span>
                  <span className="text-blue-300 font-semibold">{speechRate.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.6"
                  max="1.5"
                  step="0.05"
                  value={speechRate}
                  onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                  className="w-full accent-blue-400 bg-white/10 h-1.5 rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] text-white/80 font-medium">
                  <span className="flex items-center gap-1"><Music className="w-3 h-3 text-pink-300" />Pitch</span>
                  <span className="text-pink-300 font-semibold">{speechPitch.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.8"
                  max="1.2"
                  step="0.05"
                  value={speechPitch}
                  onChange={(e) => setSpeechPitch(parseFloat(e.target.value))}
                  className="w-full accent-pink-400 bg-white/10 h-1.5 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Notification Reader Card */}
      {currentAnnouncement && (
        <div className="absolute bottom-22 left-1/2 -translate-x-1/2 z-30 max-w-sm w-full px-4 animate-fade-in">
          <div className="bg-black/35 border border-white/25 rounded-2xl p-4 backdrop-blur-xl shadow-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-300 flex items-center gap-2">
                <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-bounce text-emerald-400' : ''}`} />
                {isSpeaking ? 'Announcing Message...' : 'Message Announced'}
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

      {/* Active Incoming Call Assistant Modal */}
      {incomingCall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="bg-black/60 border border-white/25 rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-2xl backdrop-blur-2xl text-white text-center">
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
                  Ringing • Mic Active (Speak: "Answer" or "कॉल उचल")
                </span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 space-y-2">
              {incomingCall.status === 'ringing' && (
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-2 text-xs text-cyan-300 font-bold">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                    </span>
                    <Mic className="w-4 h-4 text-cyan-300" />
                    <span>Microphone Listening...</span>
                  </div>
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
                  <span>Call Accepted</span>
                </div>
              )}

              {incomingCall.status === 'ended' && (
                <div className="text-xs font-bold text-rose-300 flex items-center justify-center gap-1.5 py-1">
                  <PhoneOff className="w-4 h-4" />
                  <span>Call Rejected</span>
                </div>
              )}
            </div>

            {incomingCall.status === 'ringing' && (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => handleCallAction('connected')}
                  className="p-3 rounded-2xl bg-emerald-500/25 hover:bg-emerald-500/40 border border-emerald-400/50 text-emerald-200 backdrop-blur-md flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span className="text-xs font-bold">Accept</span>
                </button>

                <button
                  onClick={() => handleCallAction('ended')}
                  className="p-3 rounded-2xl bg-rose-500/25 hover:bg-rose-500/40 border border-rose-400/50 text-rose-200 backdrop-blur-md flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <PhoneOff className="w-4 h-4" />
                  <span className="text-xs font-bold">Reject</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Center Controls & 'Created by Rider' */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-auto">
        <button
          onClick={() => {
            const nextState = !isMasterOn;
            setIsMasterOn(nextState);
            if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
              const utter = new SpeechSynthesisUtterance(nextState ? 'Rider ON' : 'Rider OFF');
              window.speechSynthesis.speak(utter);
            }
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

        <span className="text-[10px] text-white/50 tracking-wider font-medium select-none">
          Created by Rider
        </span>
      </div>

      {/* Right Side Drawer Panel */}
      {showRightPanel && (
        <div 
          className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-[2px] animate-fade-in"
          onClick={() => setShowRightPanel(false)}
        >
          <div 
            className="w-[58%] sm:w-[42%] md:w-[28%] min-w-[200px] max-w-[280px] h-full bg-black/30 border-l border-white/15 p-3 shadow-2xl backdrop-blur-xl flex flex-col justify-between text-white animate-slide-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 mb-1 border-b border-white/10">
              <span className="text-xs font-bold text-white/90">Installed Apps</span>
              <button
                onClick={() => setShowRightPanel(false)}
                className="text-white/60 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

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

            <div className="pt-2 border-t border-white/10 flex justify-center w-full">
              <button
                onClick={() => setShowRightPanel(false)}
                className="w-full py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-[10px] font-semibold transition border border-white/20 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Permission Dialog */}
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
                Allow <span className="font-semibold text-white">NotifyVoice AI</span> to read incoming notifications from <span className="font-semibold text-blue-300">{pendingPermissionApp}</span>?
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
                onClick={() => setPendingPermissionApp(null)}
                className="w-full py-2 bg-white/10 hover:bg-white/15 text-white/70 hover:text-white rounded-xl text-xs font-medium transition cursor-pointer"
              >
                Don't allow
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

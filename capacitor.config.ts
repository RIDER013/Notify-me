import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.notifyvoice.ai.app',
  appName: 'NotifyVoice AI',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;

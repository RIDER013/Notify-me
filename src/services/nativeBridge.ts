/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { registerPlugin } from '@capacitor/core';

export interface NotificationReceivedEvent {
  appName: string;
  packageName: string;
  title: string;
  messageBody: string;
}

export interface IncomingCallEvent {
  callerName: string;
  phoneNumber: string;
  state: 'ringing' | 'connected' | 'ended';
}

export interface NotifyVoiceBridgePluginInterface {
  isNotificationListenerEnabled(): Promise<{ enabled: boolean }>;
  openNotificationListenerSettings(): Promise<void>;
  acceptCall(): Promise<void>;
  endCall(): Promise<void>;
  setSpeakerphoneOn(options: { on: boolean }): Promise<void>;
  setMicrophoneMute(options: { mute: boolean }): Promise<void>;
  addListener(
    eventName: 'notificationReceived',
    listenerFunc: (event: NotificationReceivedEvent) => void
  ): Promise<any>;
  addListener(
    eventName: 'incomingCall',
    listenerFunc: (event: IncomingCallEvent) => void
  ): Promise<any>;
  addListener(
    eventName: 'callEnded',
    listenerFunc: () => void
  ): Promise<any>;
}

export const NotifyVoiceBridge = registerPlugin<NotifyVoiceBridgePluginInterface>('NotifyVoiceBridge');

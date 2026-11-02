package com.notifyvoice.ai.app;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.media.AudioManager;
import android.os.Build;
import android.provider.Settings;
import android.telecom.TelecomManager;
import android.util.Log;

@CapacitorPlugin(
    name = "NotifyVoiceBridge",
    permissions = {
        @Permission(strings = { Manifest.permission.RECORD_AUDIO }, alias = "microphone"),
        @Permission(strings = { Manifest.permission.READ_PHONE_STATE, Manifest.permission.ANSWER_PHONE_CALLS }, alias = "phoneState"),
        @Permission(strings = { Manifest.permission.READ_CONTACTS }, alias = "contacts")
    }
)
public class NotifyVoiceBridgePlugin extends Plugin {
    private static final String TAG = "NotifyVoiceBridge";
    private static NotifyVoiceBridgePlugin instance;

    public NotifyVoiceBridgePlugin() {
        instance = this;
    }

    public static NotifyVoiceBridgePlugin getInstance() {
        return instance;
    }

    @Override
    public void load() {
        super.load();
        instance = this;
        Log.d(TAG, "NotifyVoiceBridgePlugin loaded");
    }

    public static void emitNotification(String appName, String packageName, String title, String message) {
        if (instance != null) {
            JSObject ret = new JSObject();
            ret.put("appName", appName);
            ret.put("packageName", packageName);
            ret.put("title", title);
            ret.put("messageBody", message);
            instance.notifyListeners("notificationReceived", ret);
            Log.d(TAG, "Emitted notificationReceived to Web: " + appName + " - " + message);
        } else {
            Log.w(TAG, "Plugin instance is null, could not emit notificationReceived");
        }
    }

    public static void emitIncomingCall(String callerName, String phoneNumber, String state) {
        if (instance != null) {
            JSObject ret = new JSObject();
            ret.put("callerName", callerName);
            ret.put("phoneNumber", phoneNumber);
            ret.put("state", state);
            instance.notifyListeners("incomingCall", ret);
            Log.d(TAG, "Emitted incomingCall to Web: " + callerName + " (" + phoneNumber + ") state=" + state);
        } else {
            Log.w(TAG, "Plugin instance is null, could not emit incomingCall");
        }
    }

    public static void emitCallEnded() {
        if (instance != null) {
            JSObject ret = new JSObject();
            ret.put("state", "ended");
            instance.notifyListeners("callEnded", ret);
            Log.d(TAG, "Emitted callEnded to Web");
        }
    }

    @PluginMethod
    public void requestAllPermissions(PluginCall call) {
        try {
            requestAllPermissions(call);
        } catch (Exception e) {
            Log.e(TAG, "Error requesting permissions: " + e.getMessage());
            call.resolve();
        }
    }

    @PluginMethod
    public void isNotificationListenerEnabled(PluginCall call) {
        Context context = getContext();
        String pkgName = context.getPackageName();
        String flat = Settings.Secure.getString(context.getContentResolver(), "enabled_notification_listeners");
        boolean enabled = flat != null && flat.contains(pkgName);
        JSObject ret = new JSObject();
        ret.put("enabled", enabled);
        call.resolve(ret);
    }

    @PluginMethod
    public void openNotificationListenerSettings(PluginCall call) {
        Context context = getContext();
        Intent intent = new Intent(Settings.ACTION_NOTIFICATION_LISTENER_SETTINGS);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
        call.resolve();
    }

    @PluginMethod
    public void acceptCall(PluginCall call) {
        Context context = getContext();
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                TelecomManager telecomManager = (TelecomManager) context.getSystemService(Context.TELECOM_SERVICE);
                if (telecomManager != null) {
                    telecomManager.acceptRingingCall();
                    call.resolve();
                    return;
                }
            }
        } catch (SecurityException e) {
            Log.e(TAG, "Permission denied to accept call: " + e.getMessage());
        } catch (Exception e) {
            Log.e(TAG, "Error accepting call: " + e.getMessage());
        }
        call.resolve();
    }

    @PluginMethod
    public void endCall(PluginCall call) {
        Context context = getContext();
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                TelecomManager telecomManager = (TelecomManager) context.getSystemService(Context.TELECOM_SERVICE);
                if (telecomManager != null) {
                    telecomManager.endCall();
                    call.resolve();
                    return;
                }
            }
        } catch (SecurityException e) {
            Log.e(TAG, "Permission denied to end call: " + e.getMessage());
        } catch (Exception e) {
            Log.e(TAG, "Error ending call: " + e.getMessage());
        }
        call.resolve();
    }

    @PluginMethod
    public void setSpeakerphoneOn(PluginCall call) {
        boolean on = call.getBoolean("on", true);
        try {
            AudioManager audioManager = (AudioManager) getContext().getSystemService(Context.AUDIO_SERVICE);
            if (audioManager != null) {
                audioManager.setMode(AudioManager.MODE_IN_COMMUNICATION);
                audioManager.setSpeakerphoneOn(on);
            }
        } catch (Exception e) {
            Log.e(TAG, "Error setting speakerphone: " + e.getMessage());
        }
        call.resolve();
    }

    @PluginMethod
    public void setMicrophoneMute(PluginCall call) {
        boolean mute = call.getBoolean("mute", true);
        try {
            AudioManager audioManager = (AudioManager) getContext().getSystemService(Context.AUDIO_SERVICE);
            if (audioManager != null) {
                audioManager.setMicrophoneMute(mute);
            }
        } catch (Exception e) {
            Log.e(TAG, "Error setting microphone mute: " + e.getMessage());
        }
        call.resolve();
    }
}

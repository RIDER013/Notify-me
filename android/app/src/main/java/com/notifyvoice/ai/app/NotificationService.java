package com.notifyvoice.ai.app;

import android.app.Notification;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.service.notification.NotificationListenerService;
import android.service.notification.StatusBarNotification;
import android.util.Log;

public class NotificationService extends NotificationListenerService {
    private static final String TAG = "NotifyVoiceNotifService";

    @Override
    public void onListenerConnected() {
        super.onListenerConnected();
        Log.d(TAG, "NotificationListenerService connected and active");
    }

    @Override
    public void onNotificationPosted(StatusBarNotification sbn) {
        if (sbn == null || sbn.getNotification() == null) {
            return;
        }

        Notification notification = sbn.getNotification();
        Bundle extras = notification.extras;
        if (extras == null) {
            return;
        }

        String packageName = sbn.getPackageName();
        if (packageName == null || packageName.equals(getPackageName())) {
            // Ignore own notifications
            return;
        }

        // Ignore ongoing / foreground service notifications (like music players, download progress)
        if ((notification.flags & Notification.FLAG_ONGOING_EVENT) != 0) {
            return;
        }

        CharSequence titleCs = extras.getCharSequence(Notification.EXTRA_TITLE);
        CharSequence textCs = extras.getCharSequence(Notification.EXTRA_TEXT);
        CharSequence bigTextCs = extras.getCharSequence(Notification.EXTRA_BIG_TEXT);

        String title = titleCs != null ? titleCs.toString().trim() : "";
        String text = bigTextCs != null ? bigTextCs.toString().trim() : (textCs != null ? textCs.toString().trim() : "");

        if (title.isEmpty() && text.isEmpty()) {
            return;
        }

        String appName = resolveReadableAppName(packageName);
        String finalMessage = text.isEmpty() ? title : text;

        Log.d(TAG, "Intercepted Real Notification: app=" + appName + " (" + packageName + ") body=" + finalMessage);

        NotifyVoiceBridgePlugin.emitNotification(appName, packageName, title, finalMessage);
    }

    private String resolveReadableAppName(String packageName) {
        if (packageName.contains("whatsapp")) {
            return "WhatsApp";
        } else if (packageName.contains("messaging") || packageName.contains("mms")) {
            return "Messages";
        } else if (packageName.contains("gm") || packageName.contains("email")) {
            return "Gmail";
        } else if (packageName.contains("telegram")) {
            return "Telegram";
        } else if (packageName.contains("instagram")) {
            return "Instagram";
        } else if (packageName.contains("youtube")) {
            return "YouTube";
        } else if (packageName.contains("phonepe")) {
            return "PhonePe";
        } else if (packageName.contains("paisa") || packageName.contains("gpay")) {
            return "Google Pay";
        } else if (packageName.contains("truecaller")) {
            return "Truecaller";
        } else if (packageName.contains("snapchat")) {
            return "Snapchat";
        }

        try {
            PackageManager pm = getPackageManager();
            ApplicationInfo ai = pm.getApplicationInfo(packageName, 0);
            CharSequence label = pm.getApplicationLabel(ai);
            if (label != null) {
                return label.toString();
            }
        } catch (Exception ignored) {}

        return packageName;
    }
}

package com.notifyvoice.ai.app;

import android.content.BroadcastReceiver;
import android.content.ContentResolver;
import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.provider.ContactsContract;
import android.telephony.TelephonyManager;
import android.util.Log;

public class PhoneCallReceiver extends BroadcastReceiver {
    private static final String TAG = "PhoneCallReceiver";
    private static String lastState = TelephonyManager.EXTRA_STATE_IDLE;

    @Override
    public void onReceive(Context context, Intent intent) {
        if (intent == null || intent.getAction() == null) {
            return;
        }

        if (TelephonyManager.ACTION_PHONE_STATE_CHANGED.equals(intent.getAction())) {
            String stateStr = intent.getStringExtra(TelephonyManager.EXTRA_STATE);
            if (stateStr == null) return;

            String incomingNumber = intent.getStringExtra(TelephonyManager.EXTRA_INCOMING_NUMBER);
            if (incomingNumber == null) {
                incomingNumber = "";
            }

            Log.d(TAG, "Phone State Changed: " + stateStr + ", number=" + incomingNumber);

            if (TelephonyManager.EXTRA_STATE_RINGING.equals(stateStr)) {
                String callerName = resolveContactName(context, incomingNumber);
                NotifyVoiceBridgePlugin.emitIncomingCall(callerName, incomingNumber, "ringing");
            } else if (TelephonyManager.EXTRA_STATE_IDLE.equals(stateStr)) {
                if (TelephonyManager.EXTRA_STATE_RINGING.equals(lastState) || TelephonyManager.EXTRA_STATE_OFFHOOK.equals(lastState)) {
                    NotifyVoiceBridgePlugin.emitCallEnded();
                }
            }

            lastState = stateStr;
        }
    }

    private String resolveContactName(Context context, String phoneNumber) {
        if (phoneNumber == null || phoneNumber.trim().isEmpty()) {
            return "Unknown Caller";
        }

        try {
            ContentResolver cr = context.getContentResolver();
            Uri uri = Uri.withAppendedPath(ContactsContract.PhoneLookup.CONTENT_FILTER_URI, Uri.encode(phoneNumber));
            Cursor cursor = cr.query(uri, new String[]{ContactsContract.PhoneLookup.DISPLAY_NAME}, null, null, null);
            if (cursor != null) {
                if (cursor.moveToFirst()) {
                    int nameIdx = cursor.getColumnIndex(ContactsContract.PhoneLookup.DISPLAY_NAME);
                    if (nameIdx != -1) {
                        String name = cursor.getString(nameIdx);
                        cursor.close();
                        if (name != null && !name.trim().isEmpty()) {
                            return name.trim();
                        }
                    }
                }
                cursor.close();
            }
        } catch (SecurityException e) {
            Log.w(TAG, "READ_CONTACTS permission not granted: " + e.getMessage());
        } catch (Exception e) {
            Log.w(TAG, "Error looking up contact: " + e.getMessage());
        }

        String digits = phoneNumber.replaceAll("\\D", "");
        if (digits.length() >= 4) {
            return "number ending in " + digits.substring(digits.length() - 4);
        }
        return "Unknown Caller";
    }
}

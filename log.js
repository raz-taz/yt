import { ToastAndroid } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});


export const Log = () => { };

Log.info = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
};
Log.notification = (msg) => {

    Notifications.scheduleNotificationAsync({
        content: {
            title: 'Message',
            body: msg,
        },
        trigger: null,
    });

}
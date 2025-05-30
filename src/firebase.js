import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyBOHU28mSlBnY3dBa4lPIwnry9UPOZy87A",
    authDomain: "fir-d7e71.firebaseapp.com",
    projectId: "fir-d7e71",
    storageBucket: "fir-d7e71.firebasestorage.app",
    messagingSenderId: "183145461947",
    appId: "1:183145461947:web:65f49a6cdca09abdbe919e",
    measurementId: "G-BT80LFE1JY"
};

// Khởi tạo Firebase App
const app = initializeApp(firebaseConfig);

// Khởi tạo Cloud Messaging
const messaging = getMessaging(app);

// Request notification permission from user.
export const requestPermission = async () => {
    try {
        const currentToken = await getToken(messaging, {
            vapidKey: "BKTrf6L7gUh8CA8P_tvy13O87SyteD65Er1rp0mO-HzlhEbohO5unoOH-hhQ9pl-kRWg7P7cu5MSY9n4_V_sfDQ",
          });
        return currentToken;
    } catch (error) {
        console.error("Cannot get token: :", error);
    }
};

// Listen for messages from FCM while the page is open
export const onMessageListener = () =>
    new Promise((resolve) => {
      onMessage(messaging, (payload) => {
        resolve(payload);
      });
    });

// Export messing as use.
export { app, messaging };
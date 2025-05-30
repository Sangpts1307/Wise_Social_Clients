importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js");

// Cấu hình Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBOHU28mSlBnY3dBa4lPIwnry9UPOZy87A",
  authDomain: "fir-d7e71.firebaseapp.com",
  projectId: "fir-d7e71",
  storageBucket: "fir-d7e71.firebasestorage.app",
  messagingSenderId: "183145461947",
  appId: "1:183145461947:web:65f49a6cdca09abdbe919e",
  measurementId: "G-BT80LFE1JY"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Xử lý thông báo khi app ở chế độ background
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

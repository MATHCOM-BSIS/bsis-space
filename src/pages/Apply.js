import React from "react";
import firebase from "firebase/compat/app";

const firebaseConfig = {
      apiKey: "AIzaSyAtwXhr3zI4tR3KKlg9305K5zVrkekkMiA",
      authDomain: "bsis-space.firebaseapp.com",
      projectId: "bsis-space",
      storageBucket: "bsis-space.appspot.com",
      messagingSenderId: "649970236418",
      appId: "1:649970236418:web:f77dc789da6dac9c9e7b1b"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.requestPermission().then(() => {
      console.log("Notification permission granted.");
      return messaging.getToken();
}).catch((err) => {
      console.log("fcm error:", err);
});

export default function Apply() {
    return <div>test</div>;
}

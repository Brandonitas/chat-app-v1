import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyDhkBlI8U4IkqGNNZhfbGTAlLoHHSm-qDg",
    authDomain: "chat-app-v2-2df01.firebaseapp.com",
    projectId: "chat-app-v2-2df01",
    storageBucket: "chat-app-v2-2df01.appspot.com",
    messagingSenderId: "65346426455",
    appId: "1:65346426455:web:076cad7e313a2879643512"
}).auth();
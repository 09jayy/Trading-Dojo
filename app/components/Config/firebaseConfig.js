
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBYkIvFmn4CptRdW1M-pjnhG0tfSzU-NbE",
  authDomain: "trading-dojo-93b43.firebaseapp.com",
  projectId: "trading-dojo-93b43",
  storageBucket: "trading-dojo-93b43.firebasestorage.app",
  messagingSenderId: "295835900305",
  appId: "1:295835900305:web:866c860131f539ec282230",
  measurementId: "G-94M2FMS59T"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
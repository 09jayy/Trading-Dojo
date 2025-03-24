import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import Constants from 'expo-constants';

const extra =
  Constants.expoConfig?.extra ?? // SDK 49+ (preferred)
  {};

const {
  fireBaseKey,
  projectId,
  authDomain,
  storageBucket,
  messagingSenderId,
  appId
} = extra;

console.log("✅ Firebase config loaded from:", extra);

const firebaseConfig = {
  apiKey: fireBaseKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
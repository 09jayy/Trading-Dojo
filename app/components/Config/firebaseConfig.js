
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { fireBaseKey, authDomain, projectId, storageBucket, messagingSenderId, appId } from "@env";
import { getFirestore } from "firebase/firestore";

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
export const db = getFirestore(app);
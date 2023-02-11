import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCTCcPvmrbZoo-J4ZkLCX8ek7m7sPaBeNQ",
  authDomain: "db-notes-305d5.firebaseapp.com",
  projectId: "db-notes-305d5",
  storageBucket: "db-notes-305d5.appspot.com",
  messagingSenderId: "420075986314",
  appId: "1:420075986314:web:51872aaa94a128dab5bc73",
  measurementId: "G-Z1YW4DM0QE"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
const analytics = getAnalytics(app);


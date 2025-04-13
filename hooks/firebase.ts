'use client'

import { initializeApp, } from "firebase/app";
import { getAuth, } from "firebase/auth";
import { getFirestore, } from "firebase/firestore";

export const useFirebase = () => {
  if(!process.env.NEXT_PUBLIC_FIREBASE_CONFIG){
    throw new Error("NEXT_PUBLIC_FIREBASE_CONFIG is not defined");
  }

  const strJsonConfig = atob(process.env.NEXT_PUBLIC_FIREBASE_CONFIG as string);

  // console.log("FIREBASE_CONFIG", process.env.NEXT_PUBLIC_FIREBASE_CONFIG);
  // console.log("strJsonConfig", strJsonConfig);

  const firebaseConfig = JSON.parse(strJsonConfig);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  return { app, auth, db };
};

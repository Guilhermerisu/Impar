import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyADiGkNZxhAiTaj3-k0MldtSBU9-ROHVgs",
  authDomain: "imparteste-7b51a.firebaseapp.com",
  databaseURL: "https://imparteste-7b51a-default-rtdb.firebaseio.com",
  projectId: "imparteste-7b51a",
  storageBucket: "imparteste-7b51a.appspot.com",
  messagingSenderId: "938665970879",
  appId: "1:938665970879:web:9090ca7fb595a28d174a0a",
};

initializeApp(firebaseConfig);

export const storage = getStorage();
export const db = getFirestore();

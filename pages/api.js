import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA8M_Mu6U-LObR2JObJ8ooAXHXxX49zN9U",
  authDomain: "janus-4326f.firebaseapp.com",
  databaseURL: "https://janus-4326f-default-rtdb.firebaseio.com",
  projectId: "janus-4326f",
  storageBucket: "janus-4326f.appspot.com",
  messagingSenderId: "418343874787",
  appId: "1:418343874787:web:67e43fafabe304a3c8d5d6",
  measurementId: "G-1ZKGB6YD10",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);
const db = getDatabase();

export const writeEntry = async (content) => {
  const addEntry = httpsCallable(functions, "day_entry");
  return addEntry({ entry: content });
};

export const writeGva = async (goals, visions, attributes) => {
  const addGva = httpsCallable(functions, "set_gva");
  return addGva({ goals, visions, attributes });
};

export const getDaysListener = async (uid, callback) => {
  const daysRef = ref(db, "days/" + uid);
  onValue(daysRef, callback);
  return () => daysRef.off("value");
};

export const getMetricsListener = async (uid, callback) => {
  const metricsRef = ref(db, "metrics/" + uid);
  onValue(metricsRef, callback);
  return () => metricsRef.off("value");
};

export default { writeEntry, writeGva, getDaysListener, getMetricsListener };

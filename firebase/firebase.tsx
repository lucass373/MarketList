import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {

  apiKey: "AIzaSyC1YeYP7tFNPofX1GP_S9PSjxqNUaMQuIk",

  authDomain: "tasks-212cc.firebaseapp.com",

  databaseURL: "https://tasks-212cc-default-rtdb.firebaseio.com",

  projectId: "tasks-212cc",

  storageBucket: "tasks-212cc.appspot.com",

  messagingSenderId: "741148865055",

  appId: "1:741148865055:web:b7b10fcdd323595facdb2a"

};
const initFire = initializeApp(firebaseConfig);
export const db = getDatabase(initFire);
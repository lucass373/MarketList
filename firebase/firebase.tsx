import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {

  //your api key


};
const initFire = initializeApp(firebaseConfig);
export const db = getDatabase(initFire);

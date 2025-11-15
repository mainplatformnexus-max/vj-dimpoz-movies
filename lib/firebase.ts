import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyARDjuyqaEMmWTXAwjJNZUG688RVl-xD50",
  authDomain: "dimpoz-movies.firebaseapp.com",
  databaseURL: "https://dimpoz-movies-default-rtdb.firebaseio.com",
  projectId: "dimpoz-movies",
  storageBucket: "dimpoz-movies.firebasestorage.app",
  messagingSenderId: "491666156619",
  appId: "1:491666156619:web:1dc79fc1e13b6618d2f1ce",
  measurementId: "G-BLND3RJP2E",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const database = getDatabase(app)
export const storage = getStorage(app)

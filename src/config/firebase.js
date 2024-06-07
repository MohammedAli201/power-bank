// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase with the configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Log the entire config object to see if variables are being populated
console.log(firebaseConfig);

// Log individual environment variables to check their values
// console.log("API Key:", process.env.REACT_APP_API_KEY);
// console.log("Auth Domain:", process.env.REACT_APP_AUTH_DOMAIN);
// console.log("Database URL:", process.env.REACT_APP_DATABASE_URL);
// console.log("Project ID:", process.env.REACT_APP_PROJECT_ID);
// console.log("Storage Bucket:", process.env.REACT_APP_STORAGE_BUCKET);
// console.log("Messaging Sender ID:", process.env.REACT_APP_MESSAGING_SENDER_ID);
// console.log("App ID:", process.env.REACT_APP_APP_ID);

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

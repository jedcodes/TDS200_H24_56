// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvqaY1Pj6ONnnYT5wOoH8RswGDzjz3iGQ",
  authDomain: "artvista-b3316.firebaseapp.com",
  projectId: "artvista-b3316",
  storageBucket: "artvista-b3316.firebasestorage.app",
  messagingSenderId: "27185991687",
  appId: "1:27185991687:web:20af868955ad33d1775aa2",
  measurementId: "G-LKJ213HY6B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const storage = getStorage(app);
export const db = getFirestore(app);
export const storageRef = (path: any) => ref(storage, path);

// export const getDownloadURL = async (path: any) => {
//   const url = await getDownloadURL(ref(storage, path));
//   return url;
// }

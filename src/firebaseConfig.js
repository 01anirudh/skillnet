import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore,setDoc,getDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBShg7nzn2LzKqYdiCC_YtB5IuMZZEU3rk",
  authDomain: "skillnet-42403.firebaseapp.com",
  projectId: "skillnet-42403",
  storageBucket: "skillnet-42403.appspot.com",
  messagingSenderId: "405404722298",
  appId: "1:405404722298:web:f11ca930c0d09fd965c7c3",
  measurementId: "G-XM3WZ0FHYG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// Export Firebase services
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);



export { auth, provider, db, storage,setDoc,getDoc };



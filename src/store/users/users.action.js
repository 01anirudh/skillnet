import { auth, provider, db}  from "../../firebaseConfig"; // Update the import path
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth"; // Update the import paths
import { collection, doc, updateDoc, getDoc,setDoc } from "firebase/firestore"; // Update the import paths
import { SET_USER } from "./users.types"; // Update the import paths

export async function createUserDocument(user) {
	const usersCollection = collection(db, "users");
	const userRef = doc(usersCollection, user.uid);
  
	// Check if the user document already exists
	const docSnapshot = await getDoc(userRef);
	if (!docSnapshot.exists()) {
	  const userData = {
		uid: user.uid,
		email: user.email,
		displayName: user.displayName,
		photoURL: user.photoURL,
		// Add any other user-related data you want to store
	  };
	  await setDoc(userRef, userData);
	}
  }

  // Function to update user information in the "users" collection
export async function updateUserDocument(uid, newData) {
	const userRef = doc(collection(db, "users"), uid);
	await updateDoc(userRef, newData);
  }


export function setUser(payload) {
	return {
		type: SET_USER,
		user: payload,
	};
}



export function getUserAuth() {
	return (dispatch) => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				dispatch(setUser(user));
			}
		});
	};
}

export function signInAPI() {
	return (dispatch) => {
	  signInWithPopup(auth, provider)
		.then((payload) => {
		  dispatch(setUser(payload.user));
		  createUserDocument(payload.user); // Create user document when signing in
		})
		.catch((err) => alert(err.message));
	};
  }

export function signOutAPI() {
	return (dispatch) => {
		signOut(auth)
			.then(() => dispatch(setUser(null)))
			.catch((err) => alert(err.message));
	};
}

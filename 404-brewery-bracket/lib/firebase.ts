import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, where, getDocs, query, limit } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA0EzSKGwRpYSlAI90w3eZjvvKfqDtWqk0",
  authDomain: "brewery-bracket.firebaseapp.com",
  projectId: "brewery-bracket",
  storageBucket: "brewery-bracket.appspot.com",
  messagingSenderId: "496691324253",
  appId: "1:496691324253:web:97443dc8613950d666f4b4",
  measurementId: "G-1RT51VZTRR"
};

function createFirebaseApp(firebaseConfig) {
  try {
    return getApp();
  } catch {
    return initializeApp(firebaseConfig);
  }
}

const firebaseApp = createFirebaseApp(firebaseConfig);

// Auth exports
export const auth = getAuth(firebaseApp);

// Firestore exports
export const firestore = getFirestore(firebaseApp);

/// Helper functions


/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
  // const usersRef = collection(firestore, 'users');
  // const query = usersRef.where('username', '==', username).limit(1);

  const q = query(
    collection(firestore, 'Users'),
    where('username', '==', username),
    limit(1)
  )
  const userDoc = (await getDocs(q)).docs[0];
  return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data
  };
}

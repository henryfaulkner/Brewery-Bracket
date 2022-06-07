import { auth, firestore } from './firebase';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc, getDocs, collection, query, where } from 'firebase/firestore';

// Custom hook to read  auth record and user profile doc
export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;
    let authUsername;
    
    (async () => {
      if (user) {
        const userCollection = collection(firestore, "Users");
        const q = query(userCollection, where("UserID", "==", auth.currentUser.uid));
        await getDocs(q)
          .then(userDocs => {
            authUsername = userDocs.docs[0].data().Username;
          });

        if(authUsername) {
          setUsername(authUsername);
        } else {
          setUsername(null);
        }
      } else {
        setUsername(null);
      }
    })();

    return unsubscribe;
  }, [user]);

  return { user, username };
}
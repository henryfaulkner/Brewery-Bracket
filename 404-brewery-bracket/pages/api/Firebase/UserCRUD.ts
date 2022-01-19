import { firestore } from './FirebaseConfig';
import { collection, QueryDocumentSnapshot, DocumentData, query, where, limit, getDocs } from "@firebase/firestore";
import { useState, useEffect } from 'react';

const usersCollection = collection(firestore,'Users');

const [activeUser, setActiveUser] = useState<QueryDocumentSnapshot<DocumentData>>();
const [allUsers, setAllUsers] = useState<QueryDocumentSnapshot<DocumentData>[]>();
const [loading, setLoading] = useState<boolean>(true);

const getActiveUser = async (username:string, password:string) => {
    const activeUserQuery = query(usersCollection, where("Username", '==', username), 
      where("Password", "==", password), limit(1));
    const querySnapshot = await getDocs(activeUserQuery);
    
    // take first index of DocumentData docs
    const result: QueryDocumentSnapshot<DocumentData> = querySnapshot.docs[0];
    
    // set it to state
    setActiveUser(result);
 };

 const getAllUsers = async () => {
   // query: gets first 10 users in db
   const todosQuery = query(usersCollection,limit(10));
   // trigger query
   const querySnapshot = await getDocs(todosQuery);
   
   // map through todos adding them to an array
   const result: QueryDocumentSnapshot<DocumentData>[] = [];
   querySnapshot.forEach((snapshot) => {
      result.push(snapshot);
   });

   // set it to state
   setAllUsers(result);
};
 
 useEffect( () => {
    // get all users
    getAllUsers();
    // reset loading
    setTimeout( () => {
      setLoading(false);
    },2000)
 },[]);

export { getActiveUser, getAllUsers };
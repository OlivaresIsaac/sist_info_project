
import { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider,onAuthStateChanged, updateProfile } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDownloadURL,getStorage,ref, uploadBytes } from "firebase/storage";

// Servicio que inicializa las variables de Firebase



const firebaseConfig = {
  apiKey: "AIzaSyCPJQYa3Aq7oMZoav9ORQo3-XNtVk2ahls",
  authDomain: "psydocs-ce936.firebaseapp.com",
  projectId: "psydocs-ce936",
  storageBucket: "psydocs-ce936.appspot.com",
  messagingSenderId: "304066491398",
  appId: "1:304066491398:web:01f1cebc0701c583e97f87",
  measurementId: "G-CTC5TMF9DL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
export const storage = getStorage(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account"})
// Custom Hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
}
//Storage
export async function upload(file,currentUser,setLoading){
  const fileRef=ref(storage,'images/' + currentUser.uid + '.png');

  const snapshot = await uploadBytes(fileRef,file);
  const photoURL=await getDownloadURL(fileRef);
  updateProfile(currentUser,{photoURL});
  setLoading(false);
  alert("Upload file!")
}

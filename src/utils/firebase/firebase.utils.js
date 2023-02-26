import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { getFirestore,doc,getDoc,setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAoXXOUDOCpS_-DHqtB4uoNmwKFuqZDb-w",
  authDomain: "crwn-clothing-db-3.firebaseapp.com",
  projectId: "crwn-clothing-db-3",
  storageBucket: "crwn-clothing-db-3.appspot.com",
  messagingSenderId: "439592944976",
  appId: "1:439592944976:web:dfa6a3740fe739da731855"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth,additionalInformation = {}) => {

  if (!userAuth) return;

  const userDocRef = doc(db,'users',userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName,email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef,{
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });

    } catch (error) {
      console.log('error creating the user',error.message);
    }
  }

  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email,password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth,email,password)
}















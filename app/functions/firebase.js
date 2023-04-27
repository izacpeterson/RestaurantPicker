import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";
import crypto from "crypto";

const firebaseConfig = {
  apiKey: "AIzaSyBRmkiQlDvGX1wq4RYmJbAVJLJQh-fL_q4",
  authDomain: "restaurantpicker-9c57b.firebaseapp.com",
  projectId: "restaurantpicker-9c57b",
  storageBucket: "restaurantpicker-9c57b.appspot.com",
  messagingSenderId: "650281649803",
  appId: "1:650281649803:web:07ac0a2a1c08cea2a4368e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

export function signInWithGoogle() {
  return new Promise((resolve, reject) => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
        });

        resolve(user);
      })
      .catch((error) => {
        console.log(error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        reject(error);
      });
  });
}

export function getUser(uid) {
  return new Promise(async (resolve, reject) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      resolve(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  });
}

export function signOutUser() {
  signOut();
}

export function createGame() {
  let uuid = "";
  uuid = crypto.randomUUID();
  //create a firebase doc with the uuid

  //return the uuid
  setDoc(doc(db, "games", uuid), {
    player1: [],
    player2: [],
  });

  return uuid;
}

export async function uploadSelected(id, selected) {
  //get the doc by id
  const docRef = doc(db, "games", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    //update the doc with player1 data, if player1 is empty else player 2
    if (docSnap.data().player1.length === 0) {
      await setDoc(docRef, {
        player1: selected,
      });
    } else {
      //get player 1 data
      let player1 = docSnap.data().player1;
      await setDoc(docRef, {
        player1: player1,
        player2: selected,
      });
    }
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}

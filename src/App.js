import React, { useRef, useState } from "react";

import { SignInMethod } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import 'firebase/compat/firestore';

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtwXhr3zI4tR3KKlg9305K5zVrkekkMiA",
  authDomain: "bsis-space.firebaseapp.com",
  projectId: "bsis-space",
  storageBucket: "bsis-space.appspot.com",
  messagingSenderId: "649970236418",
  appId: "1:649970236418:web:f77dc789da6dac9c9e7b1b"
};

const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

function SignIn(){
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </>
  );
}

function Form() {
  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
    const Ref = firestore.collection('messages');
    await Ref.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      wroteby: uid,
      pic: photoURL
    });

    setFormValue("");
  };
  return (
    <form onSubmit={sendMessage}>
      <input
        value={formValue}
        onChange={(e) => setFormValue(e.target.value)}
        placeholder="Type a message..."
      />
      <button type="submit" disabled={!formValue}>
        Add
      </button>
    </form>
  );
}

function MessageList() {
  const Ref = firestore.collection('messages');
  const query = Ref.orderBy("createdAt");
  const [messages] = useCollectionData(query, { idField: "id" });

  return (
    <>
      <main>
        {messages && messages.map((msg) => <Item key={msg.id} message={msg} />)}
      </main>
    </>
  );
}

function Item(props) {
  const {text, createdAt, wroteby, pic} = props.message;

  function getFormatDate(date) {
    var year = date.getFullYear();
    var month = 1 + date.getMonth();
    month = month >= 10 ? month : "0" + month;
    var day = date.getDate();
    day = day >= 10 ? day : "0" + day;
    return year + "-" + month + "-" + day;
  }

  return (
    <>
      <div className="message">
        <div className="pic">
          <img src={pic} alt="pic" />
        </div>
        <div className="text">
          <p>{text}</p>
        </div>
      </div>
    </>
  );
}

export default function App() {
  const [user] = useAuthState(auth);
  return (
    <>
      {user ? (
          <>
            <Form />
            <MessageList />
          </>
        ) : (
          <SignIn />
        )}
    </>
  );
}

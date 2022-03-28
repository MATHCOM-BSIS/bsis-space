import "./styles.css"

import React, { useRef, useState } from "react";

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
  const [titleValue, setTitleValue] = useState("");
  const [textValue, setTextValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
    const Ref = firestore.collection('messages');
    await Ref.add({
      title: titleValue,
      text: textValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      wroteby: uid,
      pic: photoURL
    });

    setTitleValue("");
    setTextValue("");
  };
  return (
    <form onSubmit={sendMessage}>
      <input
        value={titleValue}
        onChange={(e) => setTitleValue(e.target.value)}
        placeholder="임금님 귀는 당나귀 귀!"
      />
      <input
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
        placeholder=""
      />
      <button type="submit" disabled={!titleValue||!textValue}>
        소리치기
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
  const {title, text, createdAt, wroteby, pic} = props.message;

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
          <p>{title}</p>
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

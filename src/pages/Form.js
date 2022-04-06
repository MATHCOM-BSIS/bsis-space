import "../form.css";

import React, { useState } from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
    apiKey: "AIzaSyAtwXhr3zI4tR3KKlg9305K5zVrkekkMiA",
    authDomain: "bsis-space.firebaseapp.com",
    projectId: "bsis-space",
    storageBucket: "bsis-space.appspot.com",
    messagingSenderId: "649970236418",
    appId: "1:649970236418:web:f77dc789da6dac9c9e7b1b",
};

const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

export default function Form() {
    const [titleValue, setTitleValue] = useState("");
    const [textValue, setTextValue] = useState("");
    const navigate = useNavigate();
    const sendMessage = async (e) => {
        e.preventDefault();
        const { uid, photoURL } = auth.currentUser;
        const Ref = firestore.collection("messages");
        await Ref.add({
            title: titleValue,
            text: textValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            wroteby: uid,
            pic: photoURL,
        });

        setTitleValue("");
        setTextValue("");
        navigate("/");
    };
    return (
        <form onSubmit={sendMessage}>
            <input
                className="title"
                value={titleValue}
                onChange={(e) => setTitleValue(e.target.value)}
                placeholder="해운대 얼짱 전영근"
            />
            <textarea
                className="text"
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                placeholder="평소에 하고싶었던 이야기들을 해보세요!"
            />
            <button type="submit" disabled={!titleValue || !textValue}>
                소리치기
            </button>
        </form>
    );
}

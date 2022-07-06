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
        <>
            <header>
                <p>
                    <a href="/#">글쓰기 </a>
                </p>
            </header>
            <form onSubmit={sendMessage}>
                <input
                    className="title"
                    value={titleValue}
                    onChange={(e) => setTitleValue(e.target.value)}
                    placeholder="제목을 입력하세요"
                />
                <textarea
                    className="text"
                    value={textValue}
                    onChange={(e) => setTextValue(e.target.value)}
                    placeholder="본 게시판은 익명성을 바탕으로 합니다.&#10;따라서 개인이나 단체에 대한 무분별한 비방, 도배와 홍보 등 부적절한 내용을 포함하는 게시물은 삭제될 수 있으며 법적인 문제가 발생하면 실명을 확인 할 수 있습니다."
                />
                <button type="submit" disabled={!titleValue || !textValue}>
                    🙉
                </button>
            </form>
        </>
    );
}

import "../home.css";

import React, { useRef, useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Query } from "firebase/firestore";

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

function SignIn() {
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

function MessageList() {
    const Ref = firestore.collection("messages");
    const query = Ref.orderBy("createdAt", "desc");
    const [messages] = useCollectionData(query, { idField: "id" });

    return (
        <>
            <main>
                <div className="wrap">
                    {messages &&
                        messages.map((msg) => (
                            <Item key={msg.id} message={msg} />
                        ))}
                </div>
            </main>
        </>
    );
}

function Item(props) {
    const { title, text, createdAt, wroteby, pic } = props.message;

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
                    <p className="title">{title}</p>
                    <p className="texts">{text}</p>
                </div>
            </div>
        </>
    );
}

export default function Home() {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    var menu = 0;
    console.log(menu);
    function toogle() {
        if (menu == 0) {
            document.getElementById("nav").style.opacity = "100";
            document.getElementsByClassName("toogle")[0].innerHTML="<ion-icon name='chevron-down-outline'></ion-icon>";
            menu = 1;
            console.log(menu);
        } else {
            document.getElementById("nav").style.opacity = "0";
            document.getElementsByClassName("toogle")[0].innerHTML="<ion-icon name='chevron-up-outline'></ion-icon>";
            menu = 0;
            console.log(menu);
        }
    }
    return (
        <>
            {user ? (
                <>
                    <MessageList />
                    <div className="navs">
                        <button className="toogle" onClick={toogle}>
                            <ion-icon name="chevron-up-outline"></ion-icon>
                        </button>
                        <div id="nav">
                            <NavLink to="/Meal" className="meal">
                                🍚
                            </NavLink>
                            <NavLink to="/Search" className="search">
                                🕓
                            </NavLink>
                            <NavLink to="/Form" className="write">
                                ✍️
                            </NavLink>
                        </div>
                    </div>
                </>
            ) : (
                <SignIn />
            )}
        </>
    );
}

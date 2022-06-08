import "../search.css";

import React, { useState } from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { NavLink, useNavigate } from "react-router-dom";

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

export default function Search() {
    const [gradeValue, setGradeValue] = useState("");
    const [classValue, setClassValue] = useState("");
    return (
        <form className="search">
            <input
                className="grade"
                placeholder="학년"
                onChange={(e)=>setGradeValue(e.target.value)}
            />
            <input
                className="class"
                placeholder="반"
                onChange={(e)=>setClassValue(e.target.value)}
            />
            <NavLink className='link' to={'../Timetable?grade='+gradeValue+'&class='+classValue}>GO 🕒</NavLink>
        </form>
    );
}

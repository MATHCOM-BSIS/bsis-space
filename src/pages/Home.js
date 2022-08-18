import "../styles/Home.css"

import React, { useRef, useState, useEffect } from "react";

import { NavLink, useNavigate } from "react-router-dom";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Query } from "firebase/firestore";
import userEvent from "@testing-library/user-event";

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
        alert('학년, 반 정보 확인을 위해 학교 계정으로 로그인 해주세요');
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
        <div className="message-container">
            {messages &&
                messages.map((msg) => (
                    <Item key={msg.id} message={msg} />
                ))}
        </div>
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
                <div className="title">
                    <img src={pic} alt="pic" />
                    <p>{title}</p>
                </div>
                <p className="text">{text}</p>
            </div>
        </>
    );
}

function Timetable () {
    const [user] = useAuthState(auth);
    const [data, setData] = useState();

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = "0" + dd;
    }
    if (mm < 10) {
        mm = "0" + mm;
    }
    var date=yyyy+""+mm+""+dd;

    var mail = user.email;

    var url =
        "https://open.neis.go.kr/hub/hisTimetable?KEY=3c07c8b644464b768a20bc4370a8e842&Type=json&ATPT_OFCDC_SC_CODE=C10&SD_SCHUL_CODE=7150532&ALL_TI_YMD=" +
        date +
        "&GRADE=" +
        mail.slice(2, 3) +
        "&CLASS_NM=" +
        mail.slice(5, 6);

    fetch(url)
        .then((res) => res.json())
        .then((dt) => setData(dt.hisTimetable[1].row));

    var displayData = data && data.map((item) => {
        <p>{item.PERIO}</p>
    })

    return (
        <div className="timetable-container">
            {
                data ? (
                    <>
                        <p className="timetable-title">{`${mm}월 ${dd}일 시간표`}</p>
                        {
                            data.map((item) => <p className="timetable-item">{`${item.PERIO}교시 : ${item.ITRT_CNTNT}`}</p>)
                        }
                    </>
                ) : (
                    <>
                        시간표 로딩중..
                    </>
                )
            }            
        </div>
    )
}

export default function Home() {
    const [user] = useAuthState(auth);
    return (
        <>
            <div className="main-container">
                {user ? (
                    <>
                        <MessageList/>
                        <Timetable/>
                    </>
                ) : (
                    <SignIn/>
                )}
            </div>
        </>
    );
}
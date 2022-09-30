import { React, useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import "../styles/Timetable.css"

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

export default function Timetable() {
    const [data, setData] = useState();
    const mail=auth.currentUser.email;

    function get_data(date) {
        var url =
            "https://open.neis.go.kr/hub/hisTimetable?KEY=3c07c8b644464b768a20bc4370a8e842&Type=json&ATPT_OFCDC_SC_CODE=C10&SD_SCHUL_CODE=7150532&ALL_TI_YMD=" +
            date +
            "&GRADE=" +
            mail.slice(2, 3) +
            "&CLASS_NM=" +
            mail.slice(5, 6);
    
        fetch(url)
            .then((res) => res.json())
            .then((dt) => setData(dt.hisTimetable[1].row))
            .catch((error) => console.log(error));
    }

    function update(event) {
        get_data(event.target.value.replace("-", "").replace("-", ""));
    }

    useEffect(() => {
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
        var date=yyyy+"-"+mm+"-"+dd;
        document.getElementById("date").value=date;
        get_data(date.replace("-", "").replace("-", ""));
    }, []);

    return (
        <div className='main-container'>
            <div className="timetable-container">
                <input id="date" type="date" onChange={update}></input>
                <div className="divider"></div>
                {
                    data? (
                        <>
                            {
                                data.map((item) => <p className="timetable-item">{`${item.PERIO}교시 : ${item.ITRT_CNTNT}`}</p>)
                            }
                        </>
                    ) : (
                        <>
                            시간표 로딩중...
                        </>
                    )
                }
            </div>
        </div>
    )
}
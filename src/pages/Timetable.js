import "../timetable.css";

import React, { useEffect, useState } from "react";


export default class Timetable extends React.Component {
    state = {
        isLoding: true,
        data: [],
        error: null,
    }

    fetchOnline() {
        var rightNow = new Date();
        var yyyymmdd = rightNow.toISOString().slice(0,10).replace(/-/g,"");
        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });
        var url = "https://open.neis.go.kr/hub/hisTimetable?KEY=3c07c8b644464b768a20bc4370a8e842&Type=json&ATPT_OFCDC_SC_CODE=C10&SD_SCHUL_CODE=7150532&ALL_TI_YMD="+yyyymmdd+"&GRADE="+params.grade+"&CLASS_NM="+params.class;
        fetch(url)
            .then(response => response.json())
            .then(dt => {
                this.setState({data: dt.hisTimetable[1].row, isLoding: false})
            }).
            catch(error => this.setState({error, isLoding: false}));
    }

    componentDidMount() {
        this.fetchOnline();
    }

    render() {
        const {isLoding, data, error} = this.state;
        const displayData = data.map((item) => {
            return(
                <tr>
                    <td>{item.PERIO}교시</td>
                    <td>{item.ITRT_CNTNT}</td>
                </tr>
            );
        })
        return (
            <React.Fragment>
                <h1>시간표</h1>
                {error ? <p>ERROR! Please check if today is a weekday.</p> : null}
                {!isLoding ? (
                    <table>
                        <thead>
                            <tr>
                                <th>CLASS NO.</th>
                                <th>SUBJECT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayData}
                        </tbody>
                    </table>
                ) : <p>Loading...</p>}
            </React.Fragment>
        );
    }
}
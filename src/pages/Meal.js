import "../meal.css";

import React, { useEffect, useState } from "react";

export default class Meal extends React.Component {
    constructor(props) {
        super(props);

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

        this.state = {
            isLoding: true,
            data: [],
            error: null,
            date: yyyy + "" + mm + "" + dd,
        };
    }
    fetchOnline() {
        const { date } = this.state;
        const API_KEY = "8dd95958b0d741cea4fa73b1866337f0";
        fetch(
            `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${API_KEY}&Type=json&ATPT_OFCDC_SC_CODE=C10&SD_SCHUL_CODE=7150532&MLSV_YMD=${date}`
        )
            .then((response) => response.json())
            .then((dt) => {
                this.setState({
                    data: dt.mealServiceDietInfo[1].row,
                    isLoding: false,
                });
            })
            .catch((error) => this.setState({ error, isLoding: false }));
    }
    componentDidMount() {
        this.fetchOnline();
    }
    render() {
        console.log(window.innerWidth);
        const { isLoding, data, error } = this.state;
        const displayData = data.map((item) => {
            var dishes = JSON.stringify(item.DDISH_NM).replace(/<br\s*[\/]?>/gi, "\n").replace(/"/gi, "").split('\n')
            return (
                <tr>
                    <td>{item.MMEAL_SC_NM}</td>
                    <td>
                        <pre>
                            {
                                dishes.map((dish) => {
                                    return dish + "\n"
                                })
                            }
                        </pre>
                    </td>
                </tr>
            );
        });
        return (
            <div className="App">
                <React.Fragment>
                    {error ? (
                        <p>ERROR! Please check if today is a weekday.</p>
                    ) : null}
                    {!isLoding ? (
                        <table className="meal">
                            <thead>
                                <tr>
                                    <th>급식</th>
                                    <th>메뉴</th>
                                </tr>
                            </thead>
                            <tbody>{displayData}</tbody>
                        </table>
                    ) : (
                        <p>Loading...</p>
                    )}
                </React.Fragment>
            </div>
        );
    }
}

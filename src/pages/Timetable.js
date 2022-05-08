import "../timetable.css";

import React, { useEffect, useState } from "react";

export default function Timetable() {
    const [data, setData] = React.useState({});
    const fetchOnline = async () => {
        const response = await fetch(
            "https://open.neis.go.kr/hub/hisTimetable?KEY=3c07c8b644464b768a20bc4370a8e842&Type=json&ATPT_OFCDC_SC_CODE=C10&SD_SCHUL_CODE=7150532"
        );
        const data = await response.json();
        setData(data);
    };
    fetchOnline();

    return(
        <main>
            <pre>{JSON.stringify(data, null, "  ")}</pre>
        </main>
    );
}

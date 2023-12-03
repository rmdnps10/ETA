import React, {useEffect} from "react";
import DetailHeader from "../components/DetailHeader";
import DetailMap from "../components/DetailMap";
import axios from "axios";

async function select(calendar_id: String, event_id: String) {
    return axios.get(`http://localhost:8000/list?calendar_id=${calendar_id}&event_id=${event_id}`, {}).then((res) => {
        return res;
    });
}

function initTmap() {
    let map = new Tmapv2.Map("map_div",
        {
            center: new Tmapv2.LatLng(37.566481622437934, 126.98502302169841), // 지도 초기 좌표
            width: "890px",
            height: "400px",
            zoom: 15
        });
}

function Detail() {


    useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=${process.env.REACT_APP_TMAP_API_KEY}`;
        script.async = true;
        // script.addEventListener("load", initTmap);
        document.body.appendChild(script);
    }, []);

    return (
        <>
            <DetailHeader/>
            <div id={"map_div"}/>
            <DetailMap/>
            <button onClick={initTmap} />
        </>
    );
}

export default Detail;

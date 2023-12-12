import React, { useEffect } from "react";
import MainHeader from "../components/MainHeader";
import PlanCardList from "../components/PlanCardList";
import {instance} from "../api/axios";
import {gapi} from "gapi-script";

function Main() {
    // const triggerNotif = useNotification("운영체제 ", {
    //     body: "1시간 24분 전\n서강대학교 김대건관, 대한민국 서울특별시 마포구 신수동 1-6까지 경로 확인 후 출발하세요.",
    //     icon: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FDA3IB%2FbtsBCkVq3VA%2F21iqoYsKi4KRkqDFzmGEE1%2Fimg.png"
    // });

    document.title = "ETA by Team ETA";

    if (localStorage.getItem("home_address") === null) {
        const successCallback = async (position) => {
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;

            let geoUrl =
                "https://maps.googleapis.com/maps/api/geocode/json?" +
                "latlng=" + lat + "," + lng + "&region=ko&" +
                `key=${process.env.REACT_APP_GOOGLE_CLOUD_CALENDAR_API_KEY}`;

            const cor_response = await fetch(geoUrl, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
            });

            const cor = await cor_response.json();

            console.log(cor);
            if (cor.results.length !== 0) {
                let address = cor.results[0].formatted_address;
                localStorage.setItem("home_address", address);
                localStorage.setItem("home_address_lat", lat);
                localStorage.setItem("home_address_lng", lng);
            }
        };

        const errorCallback = (error) => {
            console.log(error);
        };

        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }

    console.log(localStorage.getItem("ready_time"));
    if (localStorage.getItem("ready_time") === null) {
        localStorage.setItem("ready_time", "60");
    }

    return (
        <>
            <MainHeader/>
            <PlanCardList/>
        </>
    );
}
export default Main;

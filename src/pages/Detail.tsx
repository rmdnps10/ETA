import React, {useEffect} from "react";
import DetailHeader from "../components/DetailHeader";
import DetailMap from "../components/DetailMap";
import axios from "axios";
import styled from "styled-components";
import PrepareItem from "components/getDirections/PrepareItem";
import DestinationItem from "components/getDirections/DestinationItem";
import SubwayItem from "components/getDirections/SubwayItem";
import WalkItem from "components/getDirections/WalkItem";
import {gapi} from "gapi-script";
import sample_routes from "../test/sample_routes_req.json";

// const {Tmapv2} = window;

function insert(calendar_id: String, event_id: String, is_enabled: boolean, address: String, lat: number, lng: number, routes: String) {
    axios.post("http://localhost:8000/insert", {
        event_id: event_id,
        calendar_id: calendar_id,
        is_enabled: is_enabled,
        address: address,
        lat: lat,
        lng: lng,
        routes: routes
    })
        .then((res) => {
            console.log(res);
        })
        .catch((e) => {
            console.log(e);
        })
}

async function select(calendar_id: String, event_id: String) {
    return axios
        .get(
            `http://localhost:8000/list?calendar_id=${calendar_id}&event_id=${event_id}`,
            {}
        )
        .then((res) => {
            return res;
        });
}

function initTmap() {
    let map = new Tmapv3.Map("map_div", {
        center: new Tmapv3.LatLng(37.566481622437934, 126.98502302169841), // 지도 초기 좌표
        width: "890px",
        height: "400px",
        zoom: 15,
    });
}

function Detail() {
    useEffect(() => {
        if (
            document.querySelector(
                `script[src="https://toptmaptile2.tmap.co.kr/scriptSDKV3/tmapjs3.min.js?version=20230906"]`
            )
        ) return;
        // const script = document.createElement("script");
        // script.src = `https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=${process.env.REACT_APP_TMAP_API_KEY}`;
        // script.async = true;
        // script.addEventListener("load", initTmap);
        // document.body.appendChild(script);
        const script2 = document.createElement("script");
        script2.src = `https://toptmaptile2.tmap.co.kr/scriptSDKV3/tmapjs3.min.js?version=20230906`;
        script2.async = true;
        script2.addEventListener("load", initTmap);
        document.body.appendChild(script2);

    }, []);

    const initGAPI = async () => {
        try {
            await new Promise((resolve) => gapi.load("client:auth2", resolve));

            gapi.auth2.init({
                client_id: process.env.REACT_APP_GOOGLE_CLOUD_CLIENT_ID,
            });

            await gapi.client.load(
                "https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest"
            );

            const event_response = await gapi.client.calendar.events.get({
                calendarId: "ericano.rhee@gmail.com", // query에서 받아온 calendar_id 넣어주기
                eventId: "68pjedr3cdi38b9i6gqm8b9k6oqm8b9o6ss64b9j6cqjae9mcgp36pb468" // query에서 받아온 event_id 받아주기
            });
            const calendar_response = await gapi.client.calendar.calendarList.get({
                calendarId: "ericano.rhee@gmail.com"
            });

            console.log(event_response.result);
            console.log(calendar_response.result);
            console.log(event_response)

            const event = {
                is_enabled: true,
                event_id: event_response.result.id,
                calendar_id: calendar_response.result.id,
                title: event_response.result.summary,
                description: event_response.result.description,
                startDate: event_response.result.start.dateTime,
                startTimeZone: event_response.result.start.timeZone,
                endDate: event_response.result.end.dateTime,
                endTimeZone: event_response.result.end.dateTime,
                color: calendar_response.result.backgroundColor,
                eventLocation: event_response.result.location,
                lat: 0.0,
                lng: 0.0,
                routes: ""
            };

            const data = await select(event.calendar_id, event.event_id);
            if (data.data.length == 0) { // not on database
                let geoUrl = "https://maps.googleapis.com/maps/api/geocode/json?" +
                    "address=" +
                    encodeURI(event.eventLocation) +
                    "&region=ko&" +
                    `key=${process.env.REACT_APP_GOOGLE_CLOUD_CALENDAR_API_KEY}`

                const cor_response = await fetch(geoUrl, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                    },
                });

                const cor = await cor_response.json();

                if (cor.results.length !== 0) {
                    let coordinate = cor.results[0].geometry.location;
                    event.lat = coordinate.lat;
                    event.lng = coordinate.lng;
                }

                /** 아래 내용은 API 제한 때문에 주석처리하고 임의로 raw 데이터로 대신함. 실제 테스트 시 대신 켜세요
                 let routes_response = await axios.post("https://apis.openapi.sk.com/transit/routes", {
                 "startX": localStorage.getItem("home_address_lng"),
                 "startY": localStorage.getItem("home_address_lat"),
                 "endX": event.lng,
                 "endY": event.lat,
                 "count": 1,
                 "lang": 0,
                 "format": "json",
                 }, {
                 headers: {
                 Accept: "application/json",
                 appKey: process.env.REACT_APP_TMAP_API_KEY,
                 'content-type': "application/json"
                 }
                 });

                 let routes_result = JSON.stringify(routes_response.data.metaData);
                 */

                let routes_result = JSON.stringify(sample_routes)
                insert(event.calendar_id, event.event_id, event.is_enabled, event.eventLocation, event.lat, event.lng, routes_result);
            } else {
                event.is_enabled = data.data[0].is_enabled;
                event.lat = data.data[0].lat;
                event.lng = data.data[0].lng;
                event.routes = data.data[0].routes;
            }

            console.log(event);
        } catch (err) {
            console.error("Error loading GAPI or fetching calendar list", err);
        }
    };

    initGAPI();

    return (
        <>
            <DetailHeader/>
            <div id={"map_div"}/>
            {/*<TmapSection />*/}
            <DetailInfo>
                <DetailBasicInfo>
                    <PlanTime>
                        오전 <span>10:30</span>
                    </PlanTime>
                    <PlanSpace>
                        서강대학교 김대건관, 대한민국 서울특별시 마포구 신수동 1-6
                    </PlanSpace>
                </DetailBasicInfo>

                <DetailGetDirections>
                    <PrepareItem time={"오전 9:11"}/>
                    <SubwayItem/>
                    <WalkItem/>
                    <DestinationItem
                        destination={"서강대학교 김대건관"}
                        time={"오전 10:30"}
                    />
                </DetailGetDirections>
            </DetailInfo>
        </>
    );
}


const DetailInfo = styled.div`
  display: flex;
  margin-top: 30px;
`;

const DetailBasicInfo = styled.div`
  margin-left: 32px;
`;

const DetailGetDirections = styled.div`
  width: 50%;
  margin-left: auto;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 16px;
  background: #f9f2ff;
  display: flex;
  gap: 28px;
  padding: 32px 0px;
  flex-direction: column;
  align-items: center;
`;

const PlanTime = styled.div`
  color: #32283e;
  font-family: SF Pro Display;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 100% */

  span {
    color: #32283e;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
  }
`;

const PlanSpace = styled.div`
  color: #32283e;
  font-family: SF Pro Display;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 171.429% */
`;

export default Detail;

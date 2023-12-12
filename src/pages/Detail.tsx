import React, { useEffect, useState } from "react";
import DetailHeader from "../components/DetailHeader";
import DetailMap from "../components/DetailMap";
import axios from "axios";
import styled from "styled-components";
import PrepareItem from "components/getDirections/PrepareItem";
import DestinationItem from "components/getDirections/DestinationItem";
import SubwayItem from "components/getDirections/SubwayItem";
import WalkItem from "components/getDirections/WalkItem";
import { gapi } from "gapi-script";
import sample_routes from "../test/sample_routes_req.json";
import { useLocation, useParams } from "react-router-dom";
import dayjs from "dayjs";
import BusItem from "components/getDirections/BusItem";
import "../vsm.css";
import { Skeleton } from "@mui/material";
import SketletonDetail from "components/SketletonDetail";
import SkeletonDetail from "components/SketletonDetail";

function insert(
  calendar_id: String,
  event_id: String,
  is_enabled: boolean,
  address: String,
  lat: number,
  lng: number,
  routes: String
) {
  axios
    .post("http://localhost:8000/insert", {
      event_id: event_id,
      calendar_id: calendar_id,
      is_enabled: is_enabled,
      address: address,
      lat: lat,
      lng: lng,
      routes: routes,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });
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

let map;
let markerList = [];
let pointArray = [];
let polylineArray = [];

function initTmap() {
  map = new Tmapv3.Map("map_div", {
    center: new Tmapv3.LatLng(37.566481622437934, 126.98502302169841), // 지도 초기 좌표
    width: "100%",
    height: "400px",
    zoom: 16,
  });
}

function addMarker(type, lon, lat, tag) {
  let imgURL;
  switch (type) {
    case "llStart":
      imgURL = "https://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png";
      break;
    case "llPass":
      imgURL = "https://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_p.png";
      break;
    case "llEnd":
      imgURL = "https://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png";
      break;
  }
  let marker = new Tmapv3.Marker({
    position: new Tmapv3.LatLng(lat, lon),
    icon: imgURL,
    map: map,
  });
  marker.tag = tag;
  markerList[tag] = marker;
  console.log(marker);
  return marker;
}

function drawData(data) {
  let arrayLine = [];

  if (data.passShape !== undefined) {
    let lineString = data.passShape.linestring.split(" ");
    for (const crd of lineString) {
      let point = new Tmapv3.LatLng(
        Number(crd.split(",")[1]),
        Number(crd.split(",")[0])
      );
      arrayLine.push(point);
    }
    let color;
    if (data.routeColor !== undefined) {
      color = "#" + data.routeColor;
    } else {
      color = "#03A9F4";
    }
    let polyline = new Tmapv3.Polyline({
      path: arrayLine,
      strokeColor: color,
      strokeWeight: 6,
      map: map,
      direction: true,
      outline: true,
      strokeOpacity: 1.0,
    });
    polylineArray.push(polyline);
  } else if (data.steps !== undefined) {
    for (const step of data.steps) {
      let lineString = step.linestring.split(" ");
      for (const crd of lineString) {
        let point = new Tmapv3.LatLng(
          Number(crd.split(",")[1]),
          Number(crd.split(",")[0])
        );
        arrayLine.push(point);
      }
    }
    let color;
    if (data.routeColor !== undefined) {
      color = "#" + data.routeColor;
    } else {
      color = "#03A9F4";
    }
    let polyline = new Tmapv3.Polyline({
      path: arrayLine,
      strokeColor: color,
      strokeWeight: 6,
      map: map,
      direction: true,
      outline: true,
      strokeOpacity: 1.0,
    });
    polylineArray.push(polyline);
  }
}

function setMap(routesInfo) {
  let maxLat = -90.0;
  let maxLng = -180.0;
  let minLat = 90.0;
  let minLng = 180.0;

  for (let index = 0; index < routesInfo?.legs?.length; index++) {
    let item = routesInfo?.legs[index];
    if (index === 0) {
      addMarker("llStart", item.start.lon, item.start.lat, index.toString());
    } else if (index === routesInfo?.legs?.length - 1) {
      addMarker("llEnd", item.end.lon, item.end.lat, index.toString());
    }
    if (maxLat < item.start.lat) maxLat = item.start.lat;
    if (maxLat < item.end.lat) maxLat = item.end.lat;
    if (maxLng < item.start.lon) maxLng = item.start.lon;
    if (maxLng < item.end.lon) maxLng = item.end.lon;

    if (minLat > item.start.lat) minLat = item.start.lat;
    if (minLat > item.end.lat) minLat = item.end.lat;
    if (minLng > item.start.lon) minLng = item.start.lon;
    if (minLng > item.end.lon) minLng = item.end.lon;

    drawData(item);
  }

  console.log(maxLat, maxLng);
  console.log(minLat, minLng);
  let bounds = new Tmapv3.LatLngBounds();
  bounds.extend(new Tmapv3.LatLng(maxLat, maxLng));
  bounds.extend(new Tmapv3.LatLng(minLat, minLng));
  map.fitBounds(bounds, 50);
}

function Detail() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // 쿼리파라미터로 받아온 calenndar id, event_id
  const calendarId = queryParams.get("calendar_id");
  const eventId = queryParams.get("event_id");

  // 캘린더 이벤트 상태선언.
  const [eventResponse, setEventResponse] = useState();
  // 길찾기
  const [routesInfo, setRoutesInfo] = useState();
  // 누적시간

  useEffect(() => {
    const url =
      "https://toptmaptile2.tmap.co.kr/scriptSDKV3/tmapjs3.min.js?version=20231206";
    if (document.querySelector(`script[src=url]`)) return;
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.addEventListener("load", initTmap);
    document.body.appendChild(script);
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
      const color_response = await gapi.client.calendar.colors.get({});
      const event_response = await gapi.client.calendar.events.get({
        calendarId: calendarId, // query에서 받아온 calendar_id 넣어주기
        eventId: eventId, // query에서 받아온 event_id 받아주기
      });
      const calendar_response = await gapi.client.calendar.calendarList.get({
        calendarId: calendarId,
      });
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
        color:
          event_response.result.colorId !== undefined
            ? color_response.result.event[event_response.result.colorId]
                .background
            : "#049be5",
        eventLocation: event_response.result.location,
        lat: 0.0,
        lng: 0.0,
        routes: "",
      };

      document.title = event.title;

      const data = await select(event.calendar_id, event.event_id);
      if (data.data.length === 0) {
        // not on database
        let geoUrl =
          "https://maps.googleapis.com/maps/api/geocode/json?" +
          "address=" +
          encodeURI(event.eventLocation) +
          "&region=ko&" +
          `key=${process.env.REACT_APP_GOOGLE_CLOUD_CALENDAR_API_KEY}`;

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

        let routes_result = JSON.stringify(sample_routes);
        event.routes = routes_result;
        insert(
          event.calendar_id,
          event.event_id,
          event.is_enabled,
          event.eventLocation,
          event.lat,
          event.lng,
          event.routes
        );
      } else {
        event.is_enabled = data.data[0].is_enabled;
        event.lat = data.data[0].lat;
        event.lng = data.data[0].lng;
        event.routes = data.data[0].routes;
      }

      setEventResponse(event);
      setRoutesInfo(JSON.parse(event.routes).metaData.plan.itineraries[0]);
      setMap(JSON.parse(event.routes).metaData.plan.itineraries[0]);
    } catch (err) {
      console.error("Error loading GAPI or fetching calendar list", err);
    }
  };

  useEffect(() => {
    initGAPI();
  }, []);
  console.log(
    (dayjs(eventResponse?.startDate).format("a") === "am" ? "오전 " : "오후 ") +
      dayjs(eventResponse?.startDate)
        .subtract(routesInfo?.totalTime / 60, "minute")
        .format("h:mm")
  );

  const startTime = dayjs(eventResponse?.startDate).subtract(
    routesInfo?.totalTime / 60 + parseInt(localStorage.getItem("ready_time")),
    "minute"
  );
  let accuTime = [parseInt(localStorage.getItem("ready_time"))];
  console.log(eventResponse);
  return (
    <>
      <DetailHeader summary={eventResponse?.title} />
      <MapView>
        <div id={"map_div"} />
      </MapView>
      <DetailInfo>
        <DetailBasicGroup>
          {eventResponse?.color ? (
            <ColorBar color={eventResponse?.color} />
          ) : (
            <Skeleton
              width={16}
              height={50}
              animation="wave"
              variant={"rounded"}
              style={{
                marginTop: "10px",
                marginBottom: "10px",
                borderRadius: "16px"
            }}
            />
          )}

          <DetailBasicInfo>
            <PlanTime>
              {/*{ eventResponse?.startDate ? (): () }*/}

              { eventResponse?.startDate ? (
                  <div> {dayjs(eventResponse?.startDate).format("a") === "am" ? "오전" : "오후"}{" "}
                    <span>{dayjs(eventResponse?.startDate).format("h:mm")}</span>
                  </div>
              ) : (
                <Skeleton width={"100px"} height={"40px"} animation="wave" />
              )}
            </PlanTime>
            <PlanSpace>
              {eventResponse?.eventLocation ? (
                eventResponse?.eventLocation
              ) : (
                <Skeleton width={"300px"} animation="wave" />
              )}
            </PlanSpace>
          </DetailBasicInfo>
        </DetailBasicGroup>

        <DetailGetDirections>
          {eventResponse ? (
            <PrepareItem
              time={
                (startTime.format("a") === "am" ? "오전 " : "오후 ") +
                startTime.format("h:mm")
              }
            />
          ) : (
            <SketletonDetail />
          )}

          {routesInfo?.legs?.map((item, idx) => {
            accuTime.push(Math.floor(item.sectionTime / 60));
            if (item.mode === "BUS") {
              return (
                <BusItem
                  item={item}
                  startTime={startTime}
                  accumulateTime={accuTime
                    .slice(0, idx + 1)
                    .reduce((acc, currentValue) => acc + currentValue, 0)}
                />
              );
            } else if (item.mode === "WALK") {
              return (
                <WalkItem
                  item={item}
                  startTime={startTime}
                  accumulateTime={accuTime
                    .slice(0, idx + 1)
                    .reduce((acc, currentValue) => acc + currentValue, 0)}
                />
              );
            } else if (item.mode === "SUBWAY") {
              return (
                <SubwayItem
                  item={item}
                  startTime={startTime}
                  accumulateTime={accuTime
                    .slice(0, idx + 1)
                    .reduce((acc, currentValue) => acc + currentValue, 0)}
                />
              );
            }
          })}

          {eventResponse ? (
            <DestinationItem
              destination={eventResponse?.eventLocation}
              startTime={startTime}
              accumulateTime={
                parseInt(routesInfo?.totalTime / 60) +
                parseInt(localStorage.getItem("ready_time"))
              }
            />
          ) : (
            <SkeletonDetail />
          )}
        </DetailGetDirections>
      </DetailInfo>
    </>
  );
}

const MapView = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 16px;
  background-color: darkgrey;
  overflow: hidden;
`;

const DetailInfo = styled.div`
  display: flex;
  margin-top: 30px;
`;

const DetailBasicGroup = styled.div`
  display: flex;
  height: fit-content;
`;
const DetailBasicInfo = styled.div`
  margin-left: 16px;
  height: fit-content;
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

const ColorBar = styled.div`
  width: 16px;
  border-radius: 16px;
  background-color: ${(props: any) => props.color};
`;

const PlanTime = styled.div`
  color: #32283e;
  font-family: Pretendard;
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
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 171.429% */
`;

export default Detail;

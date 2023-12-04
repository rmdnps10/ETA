import React, { useEffect } from "react";
import DetailHeader from "../components/DetailHeader";
import DetailMap from "../components/DetailMap";
import axios from "axios";
import styled from "styled-components";
import PrepareItem from "components/getDirections/PrepareItem";
import DestinationItem from "components/getDirections/DestinationItem";
import SubwayItem from "components/getDirections/SubwayItem";
import WalkItem from "components/getDirections/WalkItem";

// const {Tmapv2} = window;

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
  /** -> todo map 구현. 횟수 차감 위험으로 일단 주석처리
  useEffect(() => {
    if (
        document.querySelector(
            `script[src="https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=${process.env.REACT_APP_TMAP_API_KEY}"]`
        )
    ) return;
    const script = document.createElement("script");
    script.src = `https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=${process.env.REACT_APP_TMAP_API_KEY}`;
    script.async = true;
    // script.addEventListener("load", initTmap);
    document.body.appendChild(script);
    const script2 = document.createElement("script");
    script2.src = `https://toptmaptile2.tmap.co.kr/scriptSDKV3/tmapjs3.min.js?version=20230906`;
    script2.async = true;
    script.addEventListener("load", initTmap);
    document.body.appendChild(script2);
  }, []);
      */

  return (
    <>
      <DetailHeader />
      <div id={"map_div"} />
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
          <PrepareItem time={"오전 9:11"} />
          <SubwayItem />
          <WalkItem />
          <DestinationItem
            destination={"서강대학교 김대건관"}
            time={"오전 10:30"}
          />
        </DetailGetDirections>
      </DetailInfo>
    </>
  );
}

const TmapSection = styled.div`
  width: 100%;
  height: 400px;
  background-color: black;
`;
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

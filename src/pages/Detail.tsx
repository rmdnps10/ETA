import React from "react";
import DetailHeader from "../components/DetailHeader";
import DetailMap from "../components/DetailMap";
import axios from "axios";

async function select(calendar_id: String, event_id: String) {
    return axios.get(`http://localhost:8000/list?calendar_id=${calendar_id}&event_id=${event_id}`, {}).then((res) => {
        return res;
    });
}

function Detail() {
  return (
    <>
      <DetailHeader />
      <DetailMap />
    </>
  );
}

export default Detail;

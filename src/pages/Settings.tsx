import React, { useEffect } from "react";
import { instance } from "../api/axios";
import { gapi } from "gapi-script";
import SettingHeader from "components/SettingHeader";
import SettingList from "components/SettingList";

function execute() {
  return gapi.client.calendar.calendarList.list({}).then(
    function (response) {
      // Handle the results here (response.result has the parsed body).
      console.log("Response", response);
    },
    function (err) {
      console.error("Execute error", err);
    }
  );
}

function Settings() {
  useEffect(() => {}, []);

  return (
    <>
      <SettingHeader />
      <SettingList />
      <button onClick={execute}>execute</button>
    </>
  );
}

export default Settings;

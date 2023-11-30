import React, { useEffect } from "react";
import { instance } from "../api/axios";
import { gapi } from "gapi-script";
import SettingHeader from "components/SettingHeader";
import SettingList from "components/SettingList";

function setHomeAddress() {

}

function setFavTransport() {

}

function setPrepareTime() {

}

function setCalendarList() {
    gapi.client.calendar.calendarList.list({})
        .then((response) => {
            // Handle the results here (response.result has the parsed body).
            let data = response['result']['items'];
            if (data != null) {
                data.forEach(calendar => {
                    console.log(calendar.summary, calendar.id);
                })
            }
        })
        .catch((err) => {
            console.error("Execute error", err);
        });
}


function Settings() {
  useEffect(() => {}, []);

  return (
    <>
      <SettingHeader />
      <SettingList />
    </>
  );
}

export default Settings;

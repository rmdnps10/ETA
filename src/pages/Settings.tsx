import React, { useEffect, useState } from "react";
import { instance } from "../api/axios";
import { gapi } from "gapi-script";
import SettingHeader from "components/SettingHeader";
import SettingList from "components/SettingList";
import {
  CalendarModalItem,
  NullableCalendarModalItem,
} from "components/modal/CalendarModalItem";
function Settings() {
  const [calendarList, setCalendarList] = useState<NullableCalendarModalItem[]>(
    []
  );
  useEffect(() => {
    const initGAPI = async () => {
      try {
        await new Promise((resolve) => gapi.load("client:auth2", resolve));

        gapi.auth2.init({
          client_id: process.env.REACT_APP_GOOGLE_CLOUD_CLIENT_ID,
        });

        await gapi.client.load(
          "https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest"
        );
        const response = await gapi.client.calendar.calendarList.list({});
        const data = response.result.items;

        const updatedCalendarList =
          data?.map((calendar: any) => ({
            id: calendar.id,
            title: calendar.summary,
            color: calendar.backgroundColor,
          })) || [];
        setCalendarList(updatedCalendarList);
      } catch (err) {
        console.error(err);
      }
    };

    initGAPI();
  }, []);

  document.title = "설정";

  return (
    <>
      <SettingHeader />
      <SettingList calendarList={calendarList} />
    </>
  );
}

export default Settings;

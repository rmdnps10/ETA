import React, { useEffect } from "react";
import { gapi } from "gapi-script";
import axios from "axios";

let calendarList = [];
let eventList = [];

function submit() {
  axios.get("http://localhost:8000/list", {}).then((res) => {
    console.log(res);
  });
}

function Calendar() {
  gapi.load("client:auth2", function () {
    gapi.auth2.init({
      client_id: process.env.REACT_APP_GOOGLE_CLOUD_CLIENT_ID,
    });
  });

  const getEvents = async () => {
    return new Promise(async (resolve, reject) => {
      let timeMin = new Date();
      let timeMax = new Date();
      timeMin.setDate(timeMin.getDate() - 1);
      timeMin.setHours(0, 0, 0, 0);
      timeMax.setHours(23, 59, 59, 99);

      gapi.client
        .load(
          "https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest"
        )
        .then(() => {
          gapi.client?.calendar.calendarList
            .list({})
            .then((response) => {
              // Handle the results here (response.result has the parsed body).
              let data = response["result"]["items"];
              calendarList = [];
              if (data != null) {
                data.forEach((calendar) => {
                  let isEnabled = true; // 여기에 LocalStorage로 id 넣고 값 받아와서 넣기
                  calendarList.push({
                    id: calendar.id,
                    title: calendar.summary,
                    color: calendar.backgroundColor,
                    isEnabled: isEnabled,
                  });
                });
                console.log(calendarList);
              }
            })
            .then(() => {
              calendarList.forEach((calendar) => {
                if (calendar.isEnabled) {
                  gapi.client.calendar.events
                    .list({
                      calendarId: calendar.id,
                      timeMax: timeMax.toISOString(),
                      timeMin: timeMin.toISOString(),
                    })
                    .then((response) => {
                      // Handle the results here (response.result has the parsed body).
                      // console.log(response);
                      let data = response["result"]["items"];
                      eventList = [];
                      if (data != null) {
                        data.forEach((event) => {
                          let url =
                            "https://apis.openapi.sk.com/tmap/geo/fullAddrGeo?addressFlag=F01" +
                            "&coordType=WGS84GEO&version=1" +
                            "&fullAddr=" +
                            encodeURI(event.location) +
                            "&page=1" +
                            "&count=1";
                          console.log(url);
                          fetch(url, {
                            method: "GET",
                            headers: {
                              Accept: "application/json",
                              appKey: process.env.REACT_APP_TMAP_API_KEY,
                            },
                          })
                            .then((response) => {
                              return response.json();
                            })
                            .then((json) => {
                              if (json["coordinateInfo"] !== undefined) {
                                let cor =
                                  json["coordinateInfo"]["coordinate"][0];

                                eventList.push({
                                  id: event.id,
                                  calendar_id: calendar.id,
                                  title: event.summary,
                                  description: event.description,
                                  startDate: event.start.dateTime,
                                  startTimeZone: event.start.timeZone,
                                  endDate: event.end.dateTime,
                                  endTimeZone: event.end.dateTime,
                                  color: calendar.color,
                                  eventLocation: event.location,
                                  lat: cor["lat"],
                                  lng: cor["lon"],
                                });
                              }
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                        });
                      }
                    })
                    .then(() => {
                      console.log(eventList);
                    });
                }
              });
            })
            .catch((err) => {
              console.error("Execute error", err);
            });
        });
    });
  };
  console.log(process.env.REACT_APP_TMAP_API_KEY);


  // useEffect(() => {}, []);

  return (
    <>
      <div id={"content"} />
      <button id={"authorize_button"} onClick={submit}>
        authorize_button
      </button>
      {/*<button id={"signout_button"} onClick={apiCalendar.handleSignoutClick}>signout_button</button>*/}
    </>
  );
}

export default Calendar;

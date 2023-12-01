import React from "react";
import styled from "styled-components";
import PlanCard from "./PlanCard";
import {gapi} from "gapi-script";

let events = [];

function PlanCardList() {
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

            for (const calendar of updatedCalendarList) {
                if (localStorage.getItem(calendar.id) !== 'false') { // item false는 불러오지 않음
                    let timeMin = new Date();
                    let timeMax = new Date();
                    timeMin.setDate(timeMin.getDate() - 1);
                    timeMin.setHours(0, 0, 0, 0);
                    timeMax.setHours(23, 59, 59, 99);

                    const event_response = await gapi.client.calendar.events.list({
                        calendarId: calendar.id,
                        timeMax: timeMax.toISOString(),
                        timeMin: timeMin.toISOString(),
                    });

                    const event_data = event_response.result.items;
                    const event_list = event_data?.map((event: any) => ({
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
                        lat: 0.0,
                        lng: 0.0,
                    })) || [];

                    for (const event of event_list) {
                        let url =
                            "https://apis.openapi.sk.com/tmap/geo/fullAddrGeo?addressFlag=F01" +
                            "&coordType=WGS84GEO&version=1" +
                            "&fullAddr=" +
                            encodeURI(event.eventLocation) +
                            "&page=1" +
                            "&count=1";

                        const cor_response = await fetch(url, {
                            method: "GET",
                            headers: {
                                Accept: "application/json",
                                appKey: process.env.REACT_APP_TMAP_API_KEY,
                            },
                        });
                        const cor = await cor_response.json();
                        // console.log(cor);
                        if (cor["coordinateInfo"] !== undefined) {
                            let coordinate = cor["coordinateInfo"]["coordinate"][0];
                            event.lat = coordinate.lat;
                            event.lng = coordinate.lon;
                        }
                    }

                    events = events.concat(event_list);
               }
            }
            console.log(events);
        } catch (err) {
            console.error("Error loading GAPI or fetching calendar list", err);
        }
    };

    initGAPI();

    return (
        <PlanCardListSection>
            <PlanCard color="pink"/>
            <PlanCard color="purple"/>
        </PlanCardListSection>
    );
}

const PlanCardListSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
`;

export default PlanCardList;

import React, {useEffect} from "react";
import {instance} from "../api/axios";
import {gapi} from "gapi-script";


function Calendar() {

    const CLIENT_ID = process.env.GOOGLE_CLOUD_CLIENT_ID;
    const API_KEY = process.env.GOOGLE_CLOUD_CALENDAR_API_KEY;
    const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
    const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

    const getEvents = async () => {
        return new Promise(async (resolve, reject) => {
            console.log("apiCalendar sign");

            console.log(new Date());

            gapi.client.calendar.events.list({
                "calendarId": "ericano.rhee@gmail.com",
                "timeMax": "2023-11-29T23:59:59Z",
                "timeMin": "2023-11-29T00:00:00Z"
            })
                .then(function(response) {
                        // Handle the results here (response.result has the parsed body).
                        console.log("Response", response);
                    },
                    function(err) { console.error("Execute error", err); });

            gapi.client.calendar.calendarList.list({})
                .then(function(response) {
                        // Handle the results here (response.result has the parsed body).
                        console.log("Response", response);
                    },
                    function(err) { console.error("Execute error", err); });


            // var timeMax = new Date();
            // timeMax.setDate(timeMax.getDate() + 10)
            // ApiCalendar.listEvents({
            //     timeMin: new Date().toISOString(),
            //     timeMax: timeMax.toISOString(),
            //     showDeleted: true,
            //     maxResults: 10,
            //     orderBy: "updated"
            // }).then(({ result }) => {
            //     if (result.items) {
            //         console.log("Events From Calendar", result.items);
            //     } else {
            //         console.log("No Events");
            //     }
            //
            //     resolve(result);
            // });
        })
    }


    useEffect(() => {

    }, []);

    return (
        <>
            <div id={"content"}/>
            <button id={"authorize_button"} onClick={getEvents}>authorize_button</button>
            {/*<button id={"signout_button"} onClick={apiCalendar.handleSignoutClick}>signout_button</button>*/}
        </>
    );
}

export default Calendar;

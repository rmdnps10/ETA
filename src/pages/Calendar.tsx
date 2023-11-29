import React, {useEffect} from "react";
import {instance} from "../api/axios";
import ApiCalendar from "react-google-calendar-api";


function Calendar() {

    const CLIENT_ID = process.env.GOOGLE_CLOUD_CLIENT_ID;
    const API_KEY = process.env.GOOGLE_CLOUD_CALENDAR_API_KEY;
    const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
    const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

    // const config = {
    //     clientId: CLIENT_ID,
    //     apiKey: API_KEY,
    //     scope: SCOPES,
    //     discoveryDocs: [DISCOVERY_DOC]
    // }
    //
    // const apiCalendar = new ApiCalendar(config);

    const getEvents = async () => {
        return new Promise(async (resolve, reject) => {
            if (ApiCalendar.sign) {
                console.log("apiCalendar sign");
                var timeMax = new Date();
                timeMax.setDate(timeMax.getDate() + 10)
                ApiCalendar.listEvents({
                    timeMin: new Date().toISOString(),
                    timeMax: timeMax.toISOString(),
                    showDeleted: true,
                    maxResults: 10,
                    orderBy: "updated"
                }).then(({ result }) => {
                    if (result.items) {
                        console.log("Events From Calendar", result.items);
                    } else {
                        console.log("No Events");
                    }

                    resolve(result);
                });

            } else {
                console.log("apiCalendar not sign");
                ApiCalendar.handleAuthClick();
                resolve(null);
            }
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

import React, {useEffect} from "react";
import {instance} from "../api/axios";
import {gapi} from "gapi-script";

function execute() {
    return gapi.client.calendar.calendarList.list({})
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
            },
            function(err) { console.error("Execute error", err); });
}

function Settings() {
    useEffect(() => {

    }, []);

    return (
        <>

            <button onClick={execute}>execute</button>
        </>
    );
}

export default Settings;

import React from 'react'
import {gapi} from 'gapi-script';


/*
 * Create form to request access token from Google's OAuth 2.0 server.
 */

function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.readonly"})
        .then(function () {
                console.log("Sign-in successful");
            },
            function (err) {
                console.error("Error signing in", err);
            });
}

function loadClient() {
    gapi.client.setApiKey(process.env.REACT_APP_GOOGLE_CLOUD_CALENDAR_API_KEY);
    return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest")
        .then(function () {
                console.log("GAPI client loaded for API");
            },
            function (err) {
                console.error("Error loading GAPI client for API", err);
            });
}

// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
    return gapi.client.calendar.calendarList.list({})
        .then(function (response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
            },
            function (err) {
                console.error("Execute error", err);
            });
}

function auth() {
    authenticate().then(loadClient());
}

function Login() {

    gapi.load("client:auth2", function () {
        gapi.auth2.init({client_id: process.env.REACT_APP_GOOGLE_CLOUD_CLIENT_ID});
    });


    return (
        <>
            {/*<button onClick={signIn}>Login</button>*/}
            <button onClick={auth}>authorize and load</button>
            <button onClick={execute}>execute</button>
        </>
    )
}

export default Login

import React, {useEffect} from "react";
import MainHeader from "../components/MainHeader";
import PlanCardList from "../components/PlanCardList";
import {instance} from "../api/axios";

import {gapi} from 'gapi-script'

const CLIENT_ID = process.env.GOOGLE_CLOUD_CLIENT_ID;
const API_KEY = process.env.GOOGLE_CLOUD_CALENDAR_API_KEY;
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

let tokenClient;
let gapiInited = false;
let gisInited = false;


/**
 * Callback after api.js is loaded.
 */

function gapiLoaded() {
  gapi.load('client', initializeGapiClient);
}


/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */

async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
  console.log("initializeGapiClient");
  maybeEnableButtons();
}


/**
 * Callback after Google Identity Services are loaded.
 */

function gisLoaded() {
  tokenClient = gapi.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: '', // defined later
  });
  gisInited = true;

  console.log("gisLoaded");
  maybeEnableButtons();
}


/**
 * Enables user interaction after all libraries are loaded.
 */
function maybeEnableButtons() {
  if (gapiInited && gisInited) {
    document.getElementById('authorize_button').style.visibility = 'visible';
  }
}

/**
 *  Sign in the user upon button click.
 */
/*
function handleAuthClick() {
    tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
            throw (resp);
        }
        document.getElementById('signout_button').style.visibility = 'visible';
        document.getElementById('authorize_button').innerText = 'Refresh';
        await listUpcomingEvents();
    };

    if (gapi.client.getToken() === null) {
        // Prompt the user to select a Google Account and ask for consent to share their data
        // when establishing a new session.
        tokenClient.requestAccessToken({prompt: 'consent'});
    } else {
        // Skip display of account chooser and consent dialog for an existing session.
        tokenClient.requestAccessToken({prompt: ''});
    }
}


 */
/**
 *  Sign out the user upon button click.
 */
/*
function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
        google.accounts.oauth2.revoke(token.access_token);
        gapi.client.setToken('');
        document.getElementById('content').innerText = '';
        document.getElementById('authorize_button').innerText = 'Authorize';
        document.getElementById('signout_button').style.visibility = 'hidden';
    }
}


 */
/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */

/*
async function listUpcomingEvents() {
    let response;
    try {
        const request = {
            'calendarId': 'primary',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime',
        };
        response = await gapi.client.calendar.events.list(request);
    } catch (err) {
        document.getElementById('content').innerText = err.message;
        return;
    }

    const events = response.result.items;
    if (!events || events.length == 0) {
        document.getElementById('content').innerText = 'No events found.';
        return;
    }
    // Flatten to string to display
    const output = events.reduce(
        (str, event) => `${str}${event.summary} (${event.start.dateTime || event.start.date})\n`,
        'Events:\n');
    document.getElementById('content').innerText = output;
}


 */
function Main() {
  const gpiScript = window.document.createElement("script");
  gpiScript.src = "https://apis.google.com/js/api.js";
  gpiScript.async = true;
  gpiScript.defer = true;
  gpiScript.onload = gapiLoaded;
  document.body.appendChild(gpiScript);

  const gisScript = window.document.createElement("script");
  gisScript.src = "https://accounts.google.com/gsi/client";
  gisScript.async = true;
  gisScript.defer = true;
  gisScript.onload = gisLoaded;
  document.body.appendChild(gisScript);

  useEffect(() => {
    const fetchData = async () => {
      const res = await instance.get("/posts");
      console.log(res.data[2].title);
    };
    fetchData();
    document.getElementById('authorize_button').style.visibility = 'hidden';
    document.getElementById('signout_button').style.visibility = 'hidden';

  }, []);
  return (
      <>
        <MainHeader/>
        <PlanCardList/>
        <div id={"content"}/>
        <button id={"authorize_button"}>authorize_button</button>
        <button id={"signout_button"}>signout_button</button>
      </>
  );
}

export default Main;

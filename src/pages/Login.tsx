import React from 'react'
import { JWT } from 'google-auth-library'
import { gapi } from 'gapi-script';


/*
 * Create form to request access token from Google's OAuth 2.0 server.
 */
function oauthSignIn() {
  // Google's OAuth 2.0 endpoint for requesting an access token
  var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  // Create <form> element to submit parameters to OAuth 2.0 endpoint.
  var form = document.createElement('form');
  form.setAttribute('method', 'GET'); // Send as a GET request.
  form.setAttribute('action', oauth2Endpoint);

  // Parameters to pass to OAuth 2.0 endpoint.
  var params = {
    'client_id': '1008455855486-mu1dmilig6e1o98qam4f0i1v5cfmss55.apps.googleusercontent.com',
    'redirect_uri': 'http://localhost:3000/main',
    'response_type': 'token',
    'scope': 'https://www.googleapis.com/auth/calendar.readonly',
    'include_granted_scopes': 'true',
    'state': 'pass-through value'};

  // Add form parameters as hidden input values.
  for (var p in params) {
    var input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', p);
    input.setAttribute('value', params[p]);
    form.appendChild(input);
  }

  // Add form to page and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form);
  form.submit();

}

function signIn() {
}

function authenticate() {
  return gapi.auth2.getAuthInstance()
      .signIn({scope: "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.readonly"})
      .then(function() { console.log("Sign-in successful"); },
          function(err) { console.error("Error signing in", err); });
}
function loadClient() {
  gapi.client.setApiKey(process.env.GOOGLE_CLOUD_CALENDAR_API_KEY);
  return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest")
      .then(function() { console.log("GAPI client loaded for API"); },
          function(err) { console.error("Error loading GAPI client for API", err); });
}
// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
  return gapi.client.calendar.calendarList.list({})
      .then(function(response) {
            // Handle the results here (response.result has the parsed body).
            console.log("Response", response);
          },
          function(err) { console.error("Execute error", err); });
}

function auth() {
  authenticate().then(loadClient());
}

function Login() {

  // oauthSignIn();

  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: process.env.GOOGLE_CLOUD_CLIENT_ID});
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

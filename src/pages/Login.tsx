import React from "react";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import etaIcon from "../assets/images/ETAIcon.png";
import login from "../assets/images/login.png";
/*
 * Create form to request access token from Google's OAuth 2.0 server.
 */



function Login() {
  const navigate = useNavigate();
  const authenticate = () => {
    return gapi.auth2
      .getAuthInstance()
      .signIn({
        scope:
          "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.readonly",
      })
      .then(
        function () {
          console.log("Sign-in successful");
          navigate("/main");
        },
        function (err) {
          console.error("Error signing in", err);
        }
      );
  };
  const loadClient = () => {
    gapi.client.setApiKey(process.env.REACT_APP_GOOGLE_CLOUD_CALENDAR_API_KEY);
    return gapi.client
      .load("https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest")
      .then(
        function () {
          console.log("GAPI client loaded for API");
        },
        function (err) {
          console.error("Error loading GAPI client for API", err);
        }
      );
  };
  const auth = () => {
    authenticate().then(loadClient());
  };

  gapi.load("client:auth2", function () {
    gapi.auth2.init({
      client_id: process.env.REACT_APP_GOOGLE_CLOUD_CLIENT_ID,
    });
  });

  return (
      <LoginWrapper>
          <ETAIcon src={etaIcon}></ETAIcon>
          <Title>ETA</Title>
          <Subtitle>Log in to ETA to continue to ETA Dashboard.</Subtitle>
          <LoginIcon src={login} onClick={auth}/>
      </LoginWrapper>
  );
}

const LoginWrapper = styled.div`
    display: flex;
    width: 406px;
    height: 400px;
    margin: 130px auto;
  flex-direction: column;
  align-items: center;
  border-radius: 6px;
  background: var(--White---Background-Primary, #fff);
  /* Shadow Large */
  box-shadow: 0px 10px 10px -5px rgba(0, 0, 0, 0.04),
    0px 20px 25px -5px rgba(0, 0, 0, 0.1);
`;
const ETAIcon = styled.img`
  text-align: center;
  width: 100px;
`;
const LoginIcon = styled.img`
  margin-top: 30px;
  height: 50px;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 30px;
  text-align:center;
  font-weight: 500;x
`;

const Subtitle = styled.div`
  margin-top: 16px;
  color: var(--Text-Primary, #2d333a);
  text-align: center;
  font-family: SF Pro Display;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
  letter-spacing: 0.25px;
`;

export default Login;

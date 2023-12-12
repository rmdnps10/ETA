import {BrowserRouter} from "react-router-dom";
import Router from "./Router";
import {GlobalStyles} from "./style/GloblalStyles";
import {ThemeProvider} from "styled-components";
import theme from "./style/theme";
import {styled} from "styled-components";
import {RecoilRoot} from "recoil";
import React, {useEffect} from "react";
import schedule from "node-schedule";
// import { Cron } from 'react-js-cron';
// import { cron } from 'node-cron';
// import { CronJob } from 'cron';
import 'react-js-cron/dist/styles.css';
import {gapi} from "gapi-script";
import sample_routes from "./test/sample_routes_req.json";
import axios from "axios";



function App() {


    return (
        <>
            <RecoilRoot>
                <BrowserRouter>
                    <GlobalStyles/>
                    <ThemeProvider theme={theme}>
                        <AppContainer>
                            <Router/>
                        </AppContainer>
                    </ThemeProvider>
                </BrowserRouter>
            </RecoilRoot>
        </>
    );
}

// 고정형
const AppContainer = styled.div`
  width: 60%;
  position: relative;
  margin: 0 auto;
`;

export default App;

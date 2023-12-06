import {BrowserRouter} from "react-router-dom";
import Router from "./Router";
import {GlobalStyles} from "./style/GloblalStyles";
import {ThemeProvider} from "styled-components";
import theme from "./style/theme";
import {styled} from "styled-components";
import {RecoilRoot} from "recoil";
import React, {useEffect} from "react";
import schedule from "node-schedule";

function App() {
    schedule.scheduleJob('10 * * * * *', async () => {
        console.log(new Date());
    })

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

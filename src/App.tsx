import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { GlobalStyles } from "./style/GloblalStyles";
import { ThemeProvider } from "styled-components";
import theme from "./style/theme";
import { styled } from "styled-components";
import { RecoilRoot } from "recoil";
import React from "react";

function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <GlobalStyles />
          <ThemeProvider theme={theme}>
            <AppContainer>
              <Router />
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
  margin: 0 auto;
`;

export default App;

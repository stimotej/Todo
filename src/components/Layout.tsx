import React, { useState } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, ThemeType } from "../theme/theme";
import Header from "./Header";

const Layout: React.FC = ({ children }) => {
  const [themeDark, setThemeDark] = useState(false);

  return (
    <ThemeProvider theme={themeDark ? darkTheme : lightTheme}>
      <MainContainer>
        <GlobalStyle />
        <Container>
          <Header
            themeButton
            onClick={() => setThemeDark(!themeDark)}
            themeDark={themeDark}
          />
          {children}
        </Container>
      </MainContainer>
    </ThemeProvider>
  );
};

const GlobalStyle = createGlobalStyle<{ theme: ThemeType }>`
  * {
    background-color: ${({ theme }) => theme.background};
    font-family: 'Open Sans', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    font-size:100%;
    outline: none;
  }
`;

const MainContainer = styled.main`
  @media (min-width: 768px) {
    display: flex;
    justify-content: center;
  }
`;

const Container = styled.div`
  padding: 0 20px 0 20px;
  width: 100%;

  @media (min-width: 768px) {
    max-width: 60%;
  }
`;

export default Layout;

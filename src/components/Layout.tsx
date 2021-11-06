import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { getOptionsFromDB, setOptionsInDB } from "../data/todosDB";
import { lightTheme, darkTheme, ThemeType } from "../theme/theme";
import Header from "./Header";

interface LayoutProps {
  title?: string;
  themeButton?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, title, themeButton }) => {
  const [themeDark, setThemeDark] = useState(false);

  useEffect(() => {
    getOptionsFromDB((options) => {
      if (options) setThemeDark(options.darkTheme);
    });
  }, []);

  const handleChangeTheme = () => {
    const options = {
      darkTheme: !themeDark,
    };
    setOptionsInDB(options, () => {
      setThemeDark(!themeDark);
    });
  };

  return (
    <ThemeProvider theme={themeDark ? darkTheme : lightTheme}>
      <MainContainer>
        <GlobalStyle />
        <Container>
          <Header
            title={title}
            themeButton={themeButton}
            onClick={handleChangeTheme}
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
    font-family: 'Open Sans', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    font-size:100%;
    outline: none;
  }
  html {
    background-color: ${({ theme }) => theme.background};
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

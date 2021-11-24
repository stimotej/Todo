import React, { useState, useEffect, useContext } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { getOptionsFromDB, setOptionsInDB } from "../data/todosDB";
import { lightTheme, darkTheme, ThemeType } from "../themes/theme";

const Layout: React.FC = ({ children }) => {
  const [themeDark, setThemeDark] = useState(false);

  // getOptionsFromDB((options) => {
  //   if (options) setThemeDark(options.darkTheme);
  // });

  useEffect(() => {
    setThemeDark(localStorage.getItem("theme") === "true");
    // console.log(themeDark);
  }, []);

  const handleChangeTheme = () => {
    // const options = {
    //   darkTheme: !themeDark,
    // };
    // setOptionsInDB(options, () => {
    //   setThemeDark(!themeDark);
    // });
    localStorage.setItem("theme", (!themeDark).toString());
    setThemeDark(!themeDark);
  };

  return (
    <ThemeProvider
      theme={{
        ...(localStorage.getItem("theme") === "true" ? darkTheme : lightTheme),
        themeDark,
        handleChangeTheme,
      }}
    >
      <Background />
      <MainContainer>
        <GlobalStyle />
        <Container>{children}</Container>
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
    font-size: 100%;
    outline: none;
  }

  .theme-dark {
    background-color: ${darkTheme.background};
  }

  .theme-light {
    background-color: ${lightTheme.background};
  }
`;

const Background = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: -100;
  background-color: ${({ theme }) => theme.background};
  transition: background-color 0.5s ease;
`;

const MainContainer = styled.main`
  display: flex;

  @media (min-width: 768px) {
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

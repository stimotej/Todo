import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import ActionBar from "./ActionBar";
import Header from "./Header";

const Layout: React.FC = ({ children }) => {
  return (
    <MainContainer>
      <GlobalStyle />
      <Container>
        <Header />
        {children}
        <ActionBar />
      </Container>
    </MainContainer>
  );
};

const GlobalStyle = createGlobalStyle`
  * {
    background-color: #F5F5F5;
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
    background-color: yellow;
  }
`;

export default Layout;

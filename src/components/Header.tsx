import React, { useContext } from "react";
import { DarkMode, LightMode } from "@styled-icons/material-outlined";
import styled, { ThemeContext } from "styled-components";
import Icon from "./Icon";

interface HeaderProps {
  title?: string;
  themeButton?: boolean;
}

const Title: React.FC<HeaderProps> = ({ title, themeButton }) => {
  const themeContext = useContext(ThemeContext);

  return (
    <HeaderContainer>
      <TitleTodo>{title || "Todo"}</TitleTodo>
      {themeButton && (
        <ThemeButton onClick={themeContext.handleChangeTheme}>
          <Icon icon={themeContext.themeDark ? LightMode : DarkMode} />
        </ThemeButton>
      )}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  margin-top: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TitleTodo = styled.h1`
  font-size: 1.5rem;
  font-weight: 400;
  color: ${({ theme }) => theme.text};
  transition: all 0.5s ease;
`;

const ThemeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 16px;
  border-radius: 50%;

  &:hover {
    background-color: ${({ theme }) => theme.main};
  }
`;

export default Title;

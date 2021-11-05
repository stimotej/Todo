import React from "react";
import { DarkMode, LightMode } from "@styled-icons/material";
import styled from "styled-components";
import Icon from "./Icon";

interface HeaderProps {
  themeButton?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  themeDark: boolean;
}

const Title: React.FC<HeaderProps> = ({ themeButton, onClick, themeDark }) => {
  return (
    <HeaderContainer>
      <TitleTodo>Todo</TitleTodo>
      {themeButton && (
        <ThemeButton onClick={onClick}>
          <Icon icon={themeDark ? LightMode : DarkMode} />
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
`;

const ThemeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  padding: 16px;
  border-radius: 50%;

  &:hover {
    background-color: ${({ theme }) => theme.main};
  }
`;

export default Title;

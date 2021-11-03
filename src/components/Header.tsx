import React from "react";
import { MdDarkMode } from "react-icons/md";
import styled from "styled-components";

const Title: React.FC = () => {
  return (
    <HeaderContainer>
      <TitleTodo>Todo</TitleTodo>
      <ThemeButton>
        <MdDarkMode
          style={{
            backgroundColor: "transparent",
            width: "24px",
            height: "24px",
          }}
        />
      </ThemeButton>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.article`
  margin-top: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TitleTodo = styled.h1`
  font-size: 1.5rem;
  font-weight: 400;
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
    background-color: #eeeeee;
  }
`;

export default Title;

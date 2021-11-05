import React from "react";
import { ChevronLeft, Add } from "@styled-icons/material";
import styled from "styled-components";
import Icon from "./Icon";

interface ActionBarProps {
  handleAddTask: React.MouseEventHandler<HTMLButtonElement>;
}

const ActionBar: React.FC<ActionBarProps> = ({ handleAddTask }) => {
  return (
    <ActionBarContainer>
      <Button>
        <Icon icon={ChevronLeft} margin />
        Home
      </Button>
      <Button onClick={handleAddTask}>
        <Icon icon={Add} margin />
        Add task
      </Button>
    </ActionBarContainer>
  );
};

const ActionBarContainer = styled.section`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.backdropColor};
  backdrop-filter: blur(30px);
  width: 100%;
  bottom: 0;
  right: 0;

  @media (min-width: 768px) {
    width: calc(60% - 40px);
    right: 50%;
    transform: translateX(50%);
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1.25px;
  font-size: 0.875rem;
  font-weight: 500;
`;

export default ActionBar;

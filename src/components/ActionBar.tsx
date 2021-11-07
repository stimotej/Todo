import React from "react";
import { Link } from "gatsby";
import { ChevronLeft, Add } from "@styled-icons/material-outlined";
import styled from "styled-components";
import Icon from "./Icon";

interface ActionBarProps {
  navigationText?: string;
  navigationLink?: string;
  actionText?: string;
  handleAction?: React.MouseEventHandler<HTMLButtonElement>;
}

const ActionBar: React.FC<ActionBarProps> = ({
  navigationText,
  navigationLink,
  actionText,
  handleAction,
}) => {
  return (
    <ActionBarContainer>
      {navigationText && (
        <Button as={Link} to={navigationLink}>
          <Icon icon={ChevronLeft} margin />
          {navigationText}
        </Button>
      )}
      {actionText && (
        <Button onClick={handleAction} alignRight={!navigationText}>
          <Icon icon={Add} margin />
          {actionText}
        </Button>
      )}
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
  transition: all 0.5s ease;

  @media (min-width: 768px) {
    width: calc(60% - 40px);
    right: 50%;
    transform: translateX(50%);
  }
`;

const Button = styled.button<{ alignRight?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: ${({ alignRight }) => (alignRight ? "auto" : "none")};
  padding: 16px;
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1.25px;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.5s ease;
`;

export default ActionBar;

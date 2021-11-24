import React from "react";
import { Link } from "gatsby";
import { StyledIcon } from "@styled-icons/styled-icon";
import { ChevronLeft } from "@styled-icons/material-outlined";
import styled from "styled-components";
import Icon from "./Icon";
import { AnimatePresence, motion } from "framer-motion";

interface ActionBarProps {
  actionText: string;
  actionIcon?: StyledIcon;
  handleAction: React.MouseEventHandler<HTMLButtonElement>;
}

const ActionBar: React.FC<ActionBarProps> = ({
  actionText,
  actionIcon,
  handleAction,
}) => {
  return (
    <ActionBarContainer>
      <Button onClick={handleAction}>
        {actionIcon && <Icon icon={actionIcon} marginRight />}
        {actionText}
      </Button>
    </ActionBarContainer>
  );
};

const ActionBarContainer = styled(motion.section)`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.actionBarColor};
  backdrop-filter: blur(30px);
  width: 100%;
  bottom: 0;
  right: 0;
  transition: background-color 0.5s ease;

  @media (min-width: 768px) {
    padding: 0 calc(20% + 20px);
  }
`;

const Button = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
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

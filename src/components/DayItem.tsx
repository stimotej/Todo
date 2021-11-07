import React from "react";
import styled from "styled-components";
import { ChevronRight } from "@styled-icons/material-outlined/ChevronRight";
import Icon from "../components/Icon";

interface DayItemProps {
  title: string;
  taskCount: number;
}

const DayItem: React.FC<DayItemProps> = ({ title, taskCount }) => {
  return (
    <DayContainer>
      <TextContainer>
        <Title>{title}</Title>
        <TaskCount>{taskCount} tasks</TaskCount>
      </TextContainer>
      <Icon icon={ChevronRight} />
    </DayContainer>
  );
};

const DayContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: ${({ theme }) => theme.main};
  border-radius: 20px;
  padding: 20px;
  margin-top: 20px;
  transition: all 0.5s ease;

  &:hover {
    cursor: pointer;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 20px;
  transition: all 0.5s ease;
`;

const TaskCount = styled.p`
  color: ${({ theme }) => theme.textLight};
  font-size: 1rem;
  font-weight: 400;
  transition: all 0.5s ease;
`;

export default DayItem;

import React from "react";
import styled from "styled-components";
import {
  Done,
  CalendarToday,
  ExpandMore,
  ExpandLess,
} from "@styled-icons/material-outlined";
import { motion } from "framer-motion";
import Icon from "./Icon";

interface DaySelectProps {
  selectedDay: number;
  setSelectedDay: React.Dispatch<React.SetStateAction<number>>;
  showCalendar: boolean;
  setShowCalendar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Tabs: React.FC<DaySelectProps> = ({
  selectedDay,
  setSelectedDay,
  showCalendar,
  setShowCalendar,
}) => {
  const handleDoneTab = () => {
    setSelectedDay(0);
    setShowCalendar(false);
  };

  const handleAllTasksTab = () => {
    setSelectedDay(1);
    setShowCalendar(false);
  };

  const handleCalendarTab = () => {
    if (selectedDay in [0, 1]) setSelectedDay(new Date().getTime());
    setShowCalendar(!showCalendar);
  };

  return (
    <TabsContainer>
      <TabSelectContainer>
        <TabButton onClick={handleDoneTab} $selected={selectedDay === 0} layout>
          <Icon icon={Done} marginRight={selectedDay === 0} layout />
          {selectedDay === 0 && (
            <Title initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              Done
            </Title>
          )}
        </TabButton>
        <TabButton
          onClick={handleAllTasksTab}
          $selected={selectedDay === 1}
          layout
        >
          <Title layout>All</Title>
          {selectedDay === 1 && (
            <Title
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              $marginLeft
            >
              Tasks
            </Title>
          )}
        </TabButton>
        <TabButton
          onClick={handleCalendarTab}
          $selected={!(selectedDay in [0, 1])}
          layout
        >
          <Icon
            icon={CalendarToday}
            marginRight={!(selectedDay in [0, 1])}
            layout
          />
          {!(selectedDay in [0, 1]) && (
            <Icon icon={showCalendar ? ExpandLess : ExpandMore} marginLeft />
          )}
        </TabButton>
      </TabSelectContainer>
    </TabsContainer>
  );
};

const TabsContainer = styled.section`
  display: flex;
  padding: 20px 0 40px 0;
  width: calc(100% + 40px);
  margin-left: -20px;
`;

const TabSelectContainer = styled.div`
  display: flex;
  width: 100%;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding: 0 20px 0 20px;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 768px) {
    overflow-y: auto;
    -ms-overflow-style: auto;
    scrollbar-width: auto;
  }
`;

const TabButton = styled(motion.button)<{ $selected: boolean }>`
  flex: ${({ $selected }) => ($selected ? 2 : 1)};
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, $selected }) =>
    $selected ? theme.accent : theme.main};
  border: none;
  cursor: pointer;
  border-radius: 20px;
  padding: 16px;
  margin-right: 12px;
  min-width: 70px;

  & * {
    color: ${({ theme, $selected }) =>
      $selected ? theme.accentText : theme.text};
  }

  @media (min-width: 576px) {
    flex-direction: row;
    flex: unset;
  }
`;

const Title = styled(motion.h5)<{ $marginLeft?: boolean }>`
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 1.25px;
  text-transform: uppercase;
  margin-left: ${({ $marginLeft }) => ($marginLeft ? "5px" : "0")};
`;

const Day = styled.p`
  font-size: 1rem;
  font-weight: 400;
`;

export default Tabs;

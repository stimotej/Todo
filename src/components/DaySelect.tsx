import React from "react";
import styled from "styled-components";
import { getThisWeekDays, dayNames, compareDates } from "../data/dates";
import { History, Done } from "@styled-icons/material-outlined";
import Icon from "../components/Icon";

interface DaySelectProps {
  selectedDay: number;
  setSelectedDay: React.Dispatch<React.SetStateAction<number>>;
}

const DaySelect: React.FC<DaySelectProps> = ({
  selectedDay,
  setSelectedDay,
}) => {
  return (
    <CalendarContainer>
      <DaySelectContainer>
        <DayButton
          onClick={() => setSelectedDay(0)}
          selected={selectedDay === 0}
        >
          <Icon icon={Done} />
        </DayButton>
        <DayButton
          onClick={() => setSelectedDay(1)}
          selected={selectedDay === 1}
        >
          <Title>All</Title>
          <Title>Tasks</Title>
        </DayButton>
        {getThisWeekDays().map((day, index) => (
          <DayButton
            key={index}
            onClick={() => setSelectedDay(day.getTime())}
            selected={compareDates(new Date(selectedDay), day)}
          >
            <Title>{dayNames[day.getDay()]}</Title>
            <Day>{day.getDate()}</Day>
          </DayButton>
        ))}
      </DaySelectContainer>
    </CalendarContainer>
  );
};

const CalendarContainer = styled.section`
  display: flex;
  padding: 20px 0 40px 0;
  width: calc(100% + 40px);
  margin-left: -20px;
`;

const DaySelectContainer = styled.div`
  display: flex;
  width: 100%;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding: 0 40px 0 20px;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 768px) {
    overflow-y: auto;
    -ms-overflow-style: auto;
    scrollbar-width: auto;
  }
`;

const DayButton = styled.button<{ selected: boolean }>`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, selected }) =>
    selected ? theme.accent : theme.main};
  border: none;
  cursor: pointer;
  border-radius: 20px;
  padding: 16px;
  margin-right: 12px;
  min-width: 70px;
  transition: all 0.5s ease;

  & * {
    color: ${({ theme, selected }) =>
      selected ? theme.accentText : theme.text};
  }
`;

const Title = styled.h5`
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 1.25px;
  text-transform: uppercase;
`;

const Day = styled.p`
  font-size: 1rem;
  font-weight: 400;
`;

export default DaySelect;

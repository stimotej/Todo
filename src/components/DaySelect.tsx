import React from "react";
import styled from "styled-components";
import { getThisWeekDays, dayNames, compareDates } from "../data/dates";

interface DaySelectProps {
  selectedDay: Date;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>;
}

const DaySelect: React.FC<DaySelectProps> = ({
  selectedDay,
  setSelectedDay,
}) => {
  return (
    <CalendarContainer>
      <DaySelectContainer>
        {getThisWeekDays().map((day, index) => (
          <DayButton
            key={index}
            onClick={() => setSelectedDay(day)}
            selected={compareDates(selectedDay, day)}
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
  width: 100%;
`;

const DaySelectContainer = styled.div`
  display: flex;
  width: 100%;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

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
  color: ${({ theme, selected }) => (selected ? theme.accentText : theme.text)};
  border: none;
  cursor: pointer;
  border-radius: 20px;
  padding: 16px;
  margin-right: 12px;
  min-width: 70px;
  transition: all 0.5s ease;
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

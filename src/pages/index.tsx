import React, { useState, useEffect, useRef } from "react";
import Tabs from "../components/Tabs";
import Seo from "../components/Seo";
import TaskList from "../components/TaskList";
import Header from "../components/Header";
import Calendar from "../components/Calendar";
import styled from "styled-components";
import { getAllTaskDates } from "../data/taskList";
import { getTaskListFromDB } from "../data/todosDB";

const IndexPage: React.FC = () => {
  // selectedDate states:
  // 0 - done tasks
  // 1 - all tasks
  // 2 - calendar
  // any date - tasks on that date
  const [selectedDay, setSelectedDay] = useState(1);
  const [showCalendar, setShowCalendar] = useState(false);

  const [activeDays, setActiveDays] = useState([null]);

  const handleDateSelected = (date: number) => {
    setSelectedDay(date);
    setShowCalendar(false);
  };

  useEffect(() => {
    getTaskListFromDB((tasks) => {
      setActiveDays(getAllTaskDates(tasks));
    });
  }, [showCalendar]);

  return (
    <>
      <Header themeButton />
      <Seo title="Todo" />
      <Tabs
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        showCalendar={showCalendar}
        setShowCalendar={setShowCalendar}
      />
      {showCalendar && (
        <CalendarContainer>
          <Calendar
            selectedDayProp={new Date(selectedDay)}
            onDateSelected={handleDateSelected}
            activeDays={activeDays}
          />
        </CalendarContainer>
      )}
      <TaskList selectedDay={selectedDay} />
    </>
  );
};

const CalendarContainer = styled.div`
  padding-bottom: 60px;
`;

export default IndexPage;

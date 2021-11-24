import React, { useState, useEffect } from "react";
import Tabs from "../components/Tabs";
import Seo from "../components/Seo";
import TaskList from "../components/TaskList";
import Header from "../components/Header";
import Calendar from "../components/Calendar";
import styled from "styled-components";
import Layout from "../components/Layout";
import { motion, AnimatePresence } from "framer-motion";
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
    <Layout>
      <Header themeButton />
      <Seo title="Todo" />
      <Tabs
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        showCalendar={showCalendar}
        setShowCalendar={setShowCalendar}
      />
      <AnimatePresence>
        {showCalendar && (
          <CalendarContainer
            initial={{ y: -100, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -100,
              opacity: 0,
              transition: {
                duration: 0.2,
                type: "spring",
                bounce: 0,
              },
            }}
          >
            <Calendar
              selectedDayProp={new Date(selectedDay)}
              onDateSelected={handleDateSelected}
              activeDays={activeDays}
            />
          </CalendarContainer>
        )}
      </AnimatePresence>
      <TaskList selectedDay={selectedDay} />
    </Layout>
  );
};

const CalendarContainer = styled(motion.div)`
  padding-bottom: 60px;
`;

export default IndexPage;

import React, { useState } from "react";
import DaySelect from "../components/DaySelect";
import Seo from "../components/Seo";
import TaskList from "../components/TaskList";
import Header from "../components/Header";

const IndexPage: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState(new Date().getTime());
  return (
    <>
      <Header themeButton />
      <Seo title="Todo" />
      <DaySelect selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      <TaskList selectedDay={selectedDay} />
    </>
  );
};

export default IndexPage;

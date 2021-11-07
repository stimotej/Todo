import React from "react";
import CalendarButton from "../components/CalendarButton";
import Seo from "../components/Seo";
import TaskList from "../components/TaskList";
import Header from "../components/Header";

const IndexPage: React.FC = () => {
  return (
    <>
      <Header themeButton />
      <Seo title="Todo" />
      <CalendarButton />
      <TaskList />
    </>
  );
};

export default IndexPage;

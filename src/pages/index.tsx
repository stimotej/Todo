import React from "react";
import CalendarButton from "../components/CalendarButton";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import TaskList from "../components/TaskList";

const IndexPage: React.FC = () => {
  return (
    <Layout>
      <Seo title="Todo" />
      <CalendarButton />
      <TaskList />
    </Layout>
  );
};

export default IndexPage;

import React from "react";
import Header from "../components/Header";
import DayList from "../components/DayList";

const Days: React.FC = () => {
  return (
    <>
      <Header title="Days" />
      <DayList />
    </>
  );
};

export default Days;

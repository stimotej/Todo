import React, { useState } from "react";
import styled from "styled-components";
import DayItem from "../components/DayItem";
import ActionBar from "../components/ActionBar";

const DayList = () => {
  const [days, setDays] = useState([]);

  const handleAddDay = () => {};

  return (
    <>
      <DayListContainer>
        <button
          onClick={() =>
            setDays([...days, { title: "new item", taskCount: 2 }])
          }
        >
          Add Day
        </button>
        {days.map((day, index) => (
          <DayItem key={index} title={day.title} taskCount={day.taskCount} />
        ))}
      </DayListContainer>

      <ActionBar
        navigationText="Home"
        navigationLink="/"
        actionText="Add day"
        handleAction={() => {}}
      />
    </>
  );
};

const DayListContainer = styled.section``;

export default DayList;

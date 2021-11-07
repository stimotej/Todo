import React, { useState } from "react";
import styled from "styled-components";
import DayItem from "../components/DayItem";
import ActionBar from "../components/ActionBar";
import Modal from "./Modal";

const DayList = () => {
  const [days, setDays] = useState([]);

  const [showModal, setShowModal] = useState(false);

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

      <Modal
        show={showModal}
        title="Add day"
        actionText="Add day"
        handleAction={handleAddDay}
        handleClose={() => setShowModal(false)}
      >
        hello
      </Modal>

      <ActionBar
        navigationText="Home"
        navigationLink="/"
        actionText="Add day"
        handleAction={() => setShowModal(true)}
      />
    </>
  );
};

const DayListContainer = styled.section``;

export default DayList;

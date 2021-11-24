import React, { useEffect, useState, useCallback, useRef } from "react";
import styled from "styled-components";
import {
  CalendarToday,
  // Schedule,
  PriorityHigh,
} from "@styled-icons/material-outlined";
import { editTaskInDB, Task } from "../data/todosDB";
import Icon from "./Icon";
import Textarea from "./Textarea";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";

interface EditTaskModalProps {
  editingTask: Task;
  handleClose: (arg0: Task) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  editingTask,
  handleClose,
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, []);

  // Text, date and important states for edit task modal input fields
  const [text, setText] = useState(editingTask.text);
  const [date, setDate] = useState(
    new Date(editingTask.date).toISOString().substr(0, 10)
  );
  const [important, setImportant] = useState(editingTask.important);

  // True if min-width is 768px
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  // Ref for showing and hiding task textarea warning
  const taskTextWarning = useRef(null);

  // Ref for date input to focus input on its container click
  const dateInput = useRef(null);

  const handleEditDone = () => {
    if (text === "" || !text.trim()) {
      taskTextWarning.current.innerHTML = "Task can't be empty";
      return;
    }
    const editedTask = {
      text: text,
      date: new Date(date).getTime(),
      important: important,
      done: editingTask.done,
      order: editingTask.order,
    };
    editTaskInDB(
      +editingTask.id,
      editedTask,
      () => {
        handleClose(editedTask);
      },
      () => {
        handleClose(null);
      }
    );
  };

  return (
    <>
      <Backdrop
        id="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={handleEditDone}
      />
      <ModalContainer
        initial={{ y: "100%", x: isDesktop ? "-50%" : "0" }}
        animate={{ y: 0, x: isDesktop ? "-50%" : "0" }}
        exit={{ y: "100%", x: isDesktop ? "-50%" : "0" }}
        transition={{ duration: 0.2, type: "spring", bounce: 0 }}
      >
        <Title>Edit task</Title>
        <ModalBody>
          <TextareaContainer>
            <Textarea
              placeholder="Enter your task"
              value={text}
              onChange={(textarea) => {
                if (textarea.value.trim())
                  taskTextWarning.current.innerHTML = "";
                setText(textarea.value);
              }}
            />
          </TextareaContainer>
          <TaskTextWarning ref={taskTextWarning} />
          <DateAndTimeContainer onClick={() => dateInput.current.focus()}>
            <DateSelect>
              <Icon icon={CalendarToday} marginRight />
              <Text>Date</Text>
              <DateInput
                type="date"
                ref={dateInput}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </DateSelect>
            {/* <Divider />
            <TimeSelect>
              <Icon icon={Schedule} margin />
              <Text>Time</Text>
              <Text value>12:12</Text>
            </TimeSelect> */}
          </DateAndTimeContainer>
          <ImportantSwitch onClick={() => setImportant(!important)}>
            <Icon icon={PriorityHigh} marginRight />
            <Text>Important</Text>
            <ToggleSwitch $active={important}>
              <motion.div layout />
            </ToggleSwitch>
          </ImportantSwitch>
        </ModalBody>
        <ActionsContainer>
          <ActionButton onClick={() => handleClose(null)}>Close</ActionButton>
          <ActionButton onClick={handleEditDone}>Done</ActionButton>
        </ActionsContainer>
      </ModalContainer>
    </>
  );
};

const Backdrop = styled(motion.div)`
  position: absolute;
  overflow: auto;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: ${({ theme }) => theme.backdropColor};
  backdrop-filter: blur(5px);
`;

const ModalContainer = styled(motion.div)`
  position: fixed;
  background-color: ${({ theme }) => theme.background};
  width: 100%;
  height: auto;
  max-height: 90%;
  bottom: 0;
  left: 0;
  padding: 20px;
  border-radius: 20px 20px 0 0;
  z-index: 4;

  @media (min-width: 768px) {
    max-width: 60%;
    left: 50%;
  }
`;

const Title = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  margin-top: 10px;
  color: ${({ theme }) => theme.text};
`;

const ModalBody = styled.div`
  margin: 20px 0;
`;

const TextareaContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.main};
  border-radius: 10px;
  padding: 20px;
`;

const TaskTextWarning = styled.p`
  font-size: 0.75rem;
  font-weight: 400;
  color: ${({ theme }) => theme.error};
`;

const DateAndTimeContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.main};
  padding: 10px;
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
`;

const DateSelect = styled.div`
  display: flex;
  padding: 10px;
`;

// const TimeSelect = styled.div`
//   display: flex;
//   padding: 10px;
// `;

// const Divider = styled.hr`
//   width: calc(100% - 24px - 20px);
//   margin: 10px 0 10px auto;
// `;

const Text = styled.p`
  flex: 1;
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  font-weight: 400;
`;

const DateInput = styled.input`
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  font-weight: 400;
  text-align: right;
  background-color: transparent;
  outline: none;
  border: none;
  -webkit-appearance: none;

  &::-webkit-inner-spin-button,
  &::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  }
`;

const ImportantSwitch = styled.div`
  display: flex;
  width: 100%;
  background-color: ${({ theme }) => theme.main};
  padding: 20px;
  border-radius: 10px;
`;

const ToggleSwitch = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  background-color: ${({ theme, $active }) =>
    $active ? theme.success : theme.background};
  width: 48px;
  height: 24px;
  border-radius: 60px;
  transition: background-color 0.5s ease;

  & div {
    background-color: ${({ theme }) => theme.accent};
    width: 24px;
    height: 24px;
    margin-left: ${({ $active }) => ($active ? "calc(100% - 24px)" : "0")};
    border-radius: 60px;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1.25px;
  font-size: 0.875rem;
  font-weight: 500;
`;

export default EditTaskModal;

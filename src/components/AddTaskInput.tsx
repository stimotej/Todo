import React, { useState } from "react";
import styled from "styled-components";
import { addTaskToDB, Task } from "../data/todosDB";

interface AddTaskInputProps {
  taskList: Task[],
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>
}

const AddTaskInput: React.FC<AddTaskInputProps> = ({ taskList, setTaskList }) => {
  const [task, setTask] = useState("");

  // Add task to db and update state
  const handleAddTask: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    // Check if input is empty or just spaces
    if (task && task.trim()) {
      const newTask = {
        text: task.trim(),
        date: new Date().getTime(),
      };
      addTaskToDB(newTask, (id) => {
        setTaskList([...taskList, { id, ...newTask }]);
      });
    }
    setTask("");
  };

  return (
    <AddTaskContainer onSubmit={handleAddTask}>
      <TextInput
        type="text"
        placeholder="Write your task"
        id="add-task-input"
        autoComplete="off"
        value={task}
        onChange={(e) => {
          setTask(e.target.value);
        }}
        required
      />
      <AddButton type="submit" id="add-task-btn">
        Add
      </AddButton>
    </AddTaskContainer>
  );
};

const AddTaskContainer = styled.form`
  position: fixed;
  background-color: yellow;
  width: calc(100% - 40px);
  bottom: 20px;
  right: 20px;
  @media (min-width: 768px) {
    width: calc(60% - 40px);
    right: 50%;
    transform: translateX(50%);
  }
`;

const TextInput = styled.input`
  position: absolute;
  width: 100%;
  bottom: 0;
  right: 0;
  border-radius: 30px;
  outline: none;
  border: none;
  background-color: white;
  padding: 16px 24px;
  font-size: 1rem;
`;

const AddButton = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: black;
  color: white;
  border: none;
  cursor: pointer;
  padding: 16px 24px;
  border-radius: 30px;
  text-transform: uppercase;
  letter-spacing: 1.25px;
  font-size: 0.875rem;
  font-weight: 500;

  &:hover {
    background-color: #212121;
  }
`;

export default AddTaskInput;

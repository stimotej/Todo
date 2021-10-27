import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Seo from "../components/SEO";
import Task from "../components/Task";

import {
  getTaskListFromDB,
  addTaskToDB,
  deleteTasksFromDb,
  editTaskInDb,
} from "../data/indexedDB";

const IndexPage = () => {
  const [task, setTask] = useState("");
  const [taskDoneList, setTaskDoneList] = useState([]);
  const [taskList, setTaskList] = useState([]);

  const [timeoutId, setTimeoutId] = useState("");

  useEffect(() => {
    !("indexedDB" in window) &&
      alert("Todo app is not supported in this browser");
    getTaskListFromDB(setTaskList);

    let addTaskBtn = document.getElementById("add-task-btn");
    let addTaskInput = document.getElementById("add-task-input");

    addTaskInput.style.paddingRight = `${addTaskBtn.offsetWidth + 10}px`;
    addTaskInput.style.height = `${addTaskBtn.offsetHeight}px`;
  }, []);

  const handleAddTask = (e) => {
    e.preventDefault();
    task && addTaskToDB(taskList, setTaskList, task);
    setTask("");
  };

  const handleSetTaskDone = (id) => {
    let taskDoneListCopy = [...taskDoneList];
    if (!taskDoneList.includes(id)) taskDoneListCopy.push(id);
    else {
      let index = taskDoneListCopy.findIndex((taskDone) => taskDone === id);
      taskDoneListCopy.splice(index, 1);
    }

    timeoutId && clearTimeout(timeoutId);
    let tID =
      taskDoneListCopy.length === 0
        ? null
        : setTimeout(() => {
            deleteTasksFromDb(taskList, setTaskList, taskDoneListCopy);
            setTaskDoneList([]);
            setTimeoutId(null);
          }, 3000);
    setTimeoutId(tID);
    setTaskDoneList(taskDoneListCopy);
  };

  const handleEditTask = (e, id) => {
    if (e.target.value === "" || !e.target.value.trim())
      deleteTasksFromDb(taskList, setTaskList, [id]);
    else editTaskInDb(taskList, setTaskList, id, e.target.value);
  };

  const getCurrentDate = () => {
    let d = new Date();
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <MainContainer>
      <Seo title="Todo" />
      <GlobalStyle />
      <Container>
        <TitleContainer>
          <Title>todo</Title>
          <TextDate>{getCurrentDate()}</TextDate>
        </TitleContainer>
        <TaskList>
          {taskList.length === 0 ? (
            <TaskListEmptyText>No tasks yet :(</TaskListEmptyText>
          ) : (
            taskList.map((item) => (
              <Task
                text={item.text}
                key={item.id}
                onClick={() => handleSetTaskDone(item.id)}
                onBlur={(e) => handleEditTask(e, item.id)}
                done={taskDoneList.includes(item.id)}
              />
            ))
          )}
        </TaskList>
        <AddTaskContainer onSubmit={handleAddTask}>
          <TextInput
            type="text"
            placeholder="Write your task"
            id="add-task-input"
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
      </Container>
    </MainContainer>
  );
};

const GlobalStyle = createGlobalStyle`
  * {
    background: #F5F5F5;
    font-family: 'Open Sans', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    font-size:100%
  }
`;

const MainContainer = styled.main`
  @media (min-width: 768px) {
    display: flex;
    justify-content: center;
  }
`;

const Container = styled.section`
  padding: 0 20px 0 20px;
  width: 100%;
  @media (min-width: 768px) {
    max-width: 60%;
  }
`;

const TitleContainer = styled.article`
  margin: 80px 0 80px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 10px;
`;

const TextDate = styled.h3`
  font-size: 1.125rem;
  font-weight: 300;
`;

const TaskList = styled.ul`
  list-style-type: none;
  padding-bottom: 100px;
`;

const TaskListEmptyText = styled.p`
  color: rgba(0, 0, 0, 0.5);
  text-align: center;
`;

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

export default IndexPage;

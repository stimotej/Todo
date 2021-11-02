import React, { useState, useRef, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { useMediaQuery } from "react-responsive";
import { useBeforeunload } from "react-beforeunload";
import Seo from "../components/Seo";
import TaskItem from "../components/TaskItem";
import Title from "../components/Title";
import AddTaskInput from "../components/AddTaskInput";

import {
  getTaskListFromDB,
  deleteTasksFromDb,
  editTaskInDb,
  setTasksInDb,
  Task
} from "../data/todosDB";

const IndexPage: React.FC = () => {
  const [taskDoneList, setTaskDoneList] = useState<number[]>([]);
  const [taskList, setTaskList] = useState<Task[]>([]);

  // taskList ref for getting current value of state inside setTimeout
  const taskListRef = useRef(taskList);
  taskListRef.current = taskList;

  // taskDoneList ref for getting current value of state inside setTimeout
  const taskDoneListRef = useRef(taskDoneList);
  taskDoneListRef.current = taskDoneList;

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  useEffect(() => {
    !("indexedDB" in window) &&
      alert("Todo app is not supported in this browser");

    getTaskListFromDB((tasks) => {
      setTaskList(tasks);
    });

    let addTaskBtn = document.getElementById("add-task-btn");
    let addTaskInput = document.getElementById("add-task-input");

    addTaskInput.style.paddingRight = `${addTaskBtn.offsetWidth + 10}px`;
    addTaskInput.style.height = `${addTaskBtn.offsetHeight}px`;
  }, []);

  // If there are checked tasks delete them onBeforeUnload
  useBeforeunload(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      deleteTasksFromDb(taskDoneList);
    }
  });

  // Remove task and update state
  const handleSetTaskDone = (id: number) => {
    let taskDoneListCopy = [...taskDoneList];

    // If checked id doesn't exist in taskDoneList add it otherwise delete it
    if (!taskDoneList.includes(id)) taskDoneListCopy.push(id);
    else {
      let index = taskDoneListCopy.findIndex((taskDone) => taskDone === id);
      taskDoneListCopy.splice(index, 1);
    }

    // If timeout is already running clear it
    timeoutId && clearTimeout(timeoutId);

    // Start timeout and after 3s delete selected tasks
    let tID =
      taskDoneListCopy.length === 0
        ? null
        : setTimeout(() => {
            deleteTasksFromDb(taskDoneListRef.current, () => {
              let taskListCopy = [...taskListRef.current];

              taskDoneListRef.current.forEach((id) => {
                let index = taskListCopy.findIndex((item) => item.id === id);
                taskListCopy.splice(index, 1);
              });

              setTaskList(taskListCopy);

              setTaskDoneList([]);
              setTimeoutId(null);
            });
          }, 3000);
    setTimeoutId(tID);
    setTaskDoneList(taskDoneListCopy);
  };

  // Edit task in db and update state
  const handleEditTask = (textarea: HTMLTextAreaElement, id: number) => {
    // Check if input is empty or just spaces
    // If it is delete from db and update state
    if (textarea.value === "" || !textarea.value.trim())
      deleteTasksFromDb([id], () => {
        let taskListCopy = [...taskList];
        const index = taskListCopy.findIndex((item) => item.id === id);
        taskListCopy.splice(index, 1);
        setTaskList(taskListCopy);
      });
    else {
      const editedTask = {
        text: textarea.value,
        date: new Date().getTime(),
      };
      editTaskInDb(id, editedTask, () => {
        let taskListCopy = [...taskList];
        let index = taskListCopy.findIndex((item) => item.id === id);
        taskListCopy[index] = { id, ...editedTask };
        setTaskList(taskListCopy);
      });
    }
  };

  const handleOnDragEnd = (result: DropResult) => {
    // If item is dragged outside of droppable return
    if (!result.destination) return;

    let taskListCopy = [...taskList];

    // Move item to destination index
    let [reorderedTask] = taskListCopy.splice(result.source.index, 1);
    taskListCopy.splice(result.destination.index, 0, reorderedTask);

    // Get indexes of completed tasks when list is reordered
    let taskDoneListIndexes =
      timeoutId &&
      taskDoneList.map((taskDoneId) =>
        taskListCopy.findIndex((item) => item.id === taskDoneId)
      );

    // Sort IDs to keep items sorted in db
    let idList = taskListCopy.map((item) => item.id);
    // Add + in front of Indexable a, b to convert them to numbers
    idList.sort((a, b) => +a - +b);
    taskListCopy.forEach((item, index) => (item.id = idList[index]));

    // Store new taskList IDs to taskDoneList
    if (timeoutId) {
      const newTaskDoneList = taskDoneListIndexes.map(
        (item) => +taskListCopy[item].id
      );
      setTaskDoneList(newTaskDoneList);
    }

    setTaskList(taskListCopy);

    setTasksInDb(taskListCopy);
  };

  return (
    <MainContainer>
      <Seo title="Todo" />
      <GlobalStyle />
      <Container>
        <Title />
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="tasks-droppable">
            {(provided) => (
              <TaskList {...provided.droppableProps} ref={provided.innerRef}>
                {taskList.length === 0 ? (
                  <TaskListEmptyText>No tasks yet :(</TaskListEmptyText>
                ) : (
                  taskList.map((item, index) => (
                    <Draggable
                      key={item.date}
                      draggableId={item.date.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...(!isDesktop && provided.dragHandleProps)}
                          ref={provided.innerRef}
                        >
                          <TaskItem
                            text={item.text}
                            dragHandleProps={provided.dragHandleProps}
                            onClick={() => handleSetTaskDone(+item.id)}
                            onBlur={(e) => handleEditTask(e.target, +item.id)}
                            done={taskDoneList.includes(+item.id)}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </DragDropContext>
        <AddTaskInput taskList={taskList} setTaskList={setTaskList} />
      </Container>
    </MainContainer>
  );
};

const GlobalStyle = createGlobalStyle`
  * {
    background-color: #F5F5F5;
    font-family: 'Open Sans', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    font-size:100%;
    outline: none;
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

const TaskList = styled.ul`
  list-style-type: none;
  padding-bottom: 100px;
`;

const TaskListEmptyText = styled.p`
  color: rgba(0, 0, 0, 0.5);
  text-align: center;
`;

export default IndexPage;

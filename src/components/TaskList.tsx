import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useMediaQuery } from "react-responsive";
import { useBeforeunload } from "react-beforeunload";
import TaskItem from "../components/TaskItem";

import {
  getTaskListByDateFromDB,
  getTaskListBeforeTodayFromDB,
  deleteTasksFromDB,
  editTaskInDB,
  setTasksInDB,
  addTaskToDB,
  Task,
} from "../data/todosDB";
import ActionBar from "./ActionBar";
import { compareDates, getDayName } from "../data/dates";
import EditTaskModal from "./EditTaskModal";

interface TaskListProps {
  selectedDay: number;
}

const TaskList: React.FC<TaskListProps> = ({ selectedDay }) => {
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

  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    !("indexedDB" in window) &&
      alert("Todo app is not supported in this browser");

    if (selectedDay === 0)
      getTaskListBeforeTodayFromDB((task) => {
        setTaskList(task);
      });
    else
      getTaskListByDateFromDB(new Date(selectedDay), (tasks) => {
        setTaskList(tasks);
      });
  }, [selectedDay]);

  // If there are checked tasks delete them onBeforeUnload
  useBeforeunload(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      deleteTasksFromDB(taskDoneList);
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
            deleteTasksFromDB(taskDoneListRef.current, () => {
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
  const handleEditTaskText = (textarea: HTMLTextAreaElement, id: number) => {
    // Check if input is empty or just spaces
    // If it is delete from db and update state
    if (textarea.value === "" || !textarea.value.trim())
      deleteTasksFromDB([id], () => {
        let taskListCopy = [...taskList];
        const index = taskListCopy.findIndex((item) => item.id === id);
        taskListCopy.splice(index, 1);
        setTaskList(taskListCopy);
      });
    else {
      const editedTask = {
        text: textarea.value,
      };
      editTaskInDB(id, editedTask, () => {
        let taskListCopy = [...taskList];
        let index = taskListCopy.findIndex((item) => item.id === id);
        taskListCopy[index] = { id, ...taskListCopy[index], ...editedTask };
        setTaskList(taskListCopy);
      });
    }
  };

  const handleCloseModal = (editedTask: Task) => {
    if (editedTask) {
      let taskListCopy = [...taskList];
      let index = taskListCopy.findIndex((item) => item.id === editedTask.id);
      taskListCopy[index] = { ...taskListCopy[index], ...editedTask };
      console.log({ ...editedTask, ...taskListCopy[index] });
      setTaskList(taskListCopy);
    }
    setEditingTask(null);
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

    setTasksInDB(taskListCopy);
  };

  const handleAddTask = () => {
    let taskListCopy = [...taskList];
    const newTask = {
      createdAt: new Date().getTime(),
      date: selectedDay,
      text: "",
      important: false,
    };
    addTaskToDB(newTask, (id) => {
      taskListCopy.push({ id, ...newTask });
      setTaskList(taskListCopy);
    });
  };

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <ListTitle>
          {selectedDay === 0
            ? "History"
            : compareDates(new Date(selectedDay), new Date())
            ? "Today"
            : getDayName(new Date(selectedDay))}
        </ListTitle>
        <Droppable droppableId="tasks-droppable">
          {(provided) => (
            <TaskListContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {taskList.length === 0 ? (
                <TaskListEmptyText>No tasks yet :(</TaskListEmptyText>
              ) : (
                taskList.map((item, index) => (
                  <Draggable
                    key={item.createdAt}
                    draggableId={item.createdAt.toString()}
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
                          onBlur={(e) => handleEditTaskText(e.target, +item.id)}
                          handleEditTask={() => setEditingTask(item)}
                          done={taskDoneList.includes(+item.id)}
                          important={item.important}
                        />
                      </div>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </TaskListContainer>
          )}
        </Droppable>
      </DragDropContext>

      {editingTask && (
        <EditTaskModal
          editingTask={editingTask}
          handleClose={handleCloseModal}
        />
      )}

      <ActionBar actionText="Add task" handleAction={handleAddTask} />
    </>
  );
};

const ListTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  transition: all 0.5s ease;
`;

const TaskListContainer = styled.ul`
  list-style-type: none;
  padding-bottom: 100px;
`;

const TaskListEmptyText = styled.p`
  color: ${({ theme }) => theme.textLight};
  text-align: center;
  margin-top: 60px;
  transition: all 0.5s ease;
`;

export default TaskList;

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
  getTaskListFromDB,
  deleteTasksFromDB,
  editTaskInDB,
  setTasksInDB,
  addTaskToDB,
  Task,
  getDoneTaskListFromDB,
} from "../data/todosDB";
import ActionBar from "./ActionBar";
import { compareDates, formatDate, getDayName } from "../data/dates";
import EditTaskModal from "./EditTaskModal";
import {
  getListOfDoneTasks,
  toggleTaskDone,
  getListOfNotDoneTasks,
  getTaskListWithoutTask,
  editTaskText,
  moveTask,
  resetTasksOrder,
  getIdListOfDoneTasks,
} from "../data/taskList";
import { Add } from "@styled-icons/material-outlined";

interface TaskListProps {
  selectedDay: number;
}

const TaskList: React.FC<TaskListProps> = ({ selectedDay }) => {
  // Task list state that holds all tasks
  const [taskList, setTaskList] = useState<Task[]>([]);
  // Editing task state that opens modal and gives it task data
  const [editingTask, setEditingTask] = useState(null);

  // taskList ref for getting current value of state inside setTimeout
  const taskListRef = useRef(taskList);
  taskListRef.current = taskList;

  // Store timeout id so setTimeout can be cleared
  let timeoutID = useRef<NodeJS.Timeout>(null);

  // True if min-width is 768px
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  // Get ref of current active task item textarea
  const activeTaskTextarea = useRef(null);

  useEffect(() => {
    // Check if browser supports indexedDB
    !("indexedDB" in window) &&
      alert("Todo app is not supported in this browser");

    // If selected day is 0 get done tasks, if day is 1 get days before today and
    // if it is not get tasks from selected day
    if (selectedDay === 0)
      getDoneTaskListFromDB((tasks) => {
        setTaskList(tasks);
      });
    else if (selectedDay === 1)
      getTaskListFromDB((tasks) => {
        setTaskList(tasks);
      });
    else
      getTaskListByDateFromDB(new Date(selectedDay), (tasks) => {
        setTaskList(tasks);
      });

    return () => {
      if (timeoutID.current) {
        clearTimeout(timeoutID.current);
        if (selectedDay === 0) setTasksInDB(getListOfDoneTasks(taskList));
        else setTasksInDB(getListOfNotDoneTasks(taskList));
      }
    };
  }, [selectedDay]);

  // If there are checked tasks update DB onBeforeUnload
  useBeforeunload(() => {
    if (timeoutID.current) {
      clearTimeout(timeoutID.current);
      setTasksInDB(getListOfDoneTasks(taskList));
    }
  });

  // Remove task and update state
  const handleSetTaskDone = (id: number) => {
    // If timeout is already running clear it
    timeoutID.current && clearTimeout(timeoutID.current);

    // Update taskList with task marked as done
    setTaskList(toggleTaskDone(taskList, id));

    // Check is done tasks tab is selected
    const isDoneTasksSelected = selectedDay === 0;

    // Get list of tasks marked as done/not done
    let listOfTasks = isDoneTasksSelected
      ? getListOfNotDoneTasks(taskList)
      : getListOfDoneTasks(taskList);

    // Start timeout and after 3s/500ms update state and DB
    timeoutID.current =
      listOfTasks.length === 0
        ? null
        : setTimeout(
            () => {
              setTasksInDB(listOfTasks, () => {
                // Update taskList to all tasks not marked/marked as done
                setTaskList(
                  isDoneTasksSelected
                    ? getListOfDoneTasks(taskListRef.current)
                    : getListOfNotDoneTasks(taskListRef.current)
                );
                // Clear timeout id
                timeoutID.current = null;
              });
            },
            isDoneTasksSelected ? 500 : 2000
          );
  };

  // Callback for editingTask
  // If edit task button clicked wait until editingTask state is set than blur
  useEffect(() => {
    activeTaskTextarea.current && activeTaskTextarea.current.blur();
  }, [editingTask]);

  // Edit task in db and update state
  const handleEditTaskText = (text: string, id: number) => {
    // Check if input is empty or just spaces
    // If it is delete from db and update state

    // If task text is empty and edit task modal not opened delete task
    if ((text === "" || !text.trim()) && !editingTask) {
      deleteTasksFromDB([id], () => {
        // Set task list without deleted empty item
        setTaskList(getTaskListWithoutTask(taskList, id));
      });
    } else {
      // Edit text of the task
      editTaskInDB(id, { text: text }, () => {
        // Set task list with changed tasks text
        setTaskList(editTaskText(taskList, id, text));
      });
    }
  };

  const handleOnDragEnd = (result: DropResult) => {
    // If item is dragged outside of droppable return
    if (!result.destination) return;

    // Make copy of task list
    let taskListCopy = [...taskList];

    // Move item to destination index in task list
    taskListCopy = moveTask(
      taskList,
      result.source.index,
      result.destination.index
    );

    // Reset task order from 1 to n of tasks to keep order in db
    taskListCopy = resetTasksOrder(taskListCopy);

    // Set task list state
    setTaskList(taskListCopy);
    // Store reordered tasks to db
    setTasksInDB(taskListCopy);
  };

  const handleAddTask: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    let taskListCopy = [...taskList];
    const newTask = {
      createdAt: new Date().getTime(),
      date: selectedDay === 1 ? new Date().getTime() : selectedDay,
      text: "",
      important: false,
      done: false,
      order: taskList.length,
    };
    addTaskToDB(newTask, (id) => {
      taskListCopy.push({ id, ...newTask });
      setTaskList(taskListCopy);
    });
    activeTaskTextarea.current && activeTaskTextarea.current.focus();
  };

  const handleDeleteDoneTasks = () => {
    const idListOfDoneTasks = getIdListOfDoneTasks(taskList);
    deleteTasksFromDB(idListOfDoneTasks, () => {
      setTaskList([]);
    });
  };

  const handleCloseModal = (editedTask: Task) => {
    // Check if task was edited
    if (editedTask) {
      let taskListCopy = [...taskList];

      const index = taskListCopy.findIndex(
        (item) => item.id === editingTask.id
      );

      // If date is changed delete task from taskList if not update it
      if (
        !compareDates(new Date(editingTask.date), new Date(editedTask.date)) &&
        !(selectedDay in [0, 1])
      )
        taskListCopy.splice(index, 1);
      else taskListCopy[index] = { ...editingTask, ...editedTask };

      setTaskList(taskListCopy);
    }
    // If cancel was clicked when editing empty task delete it
    else if (editingTask.text === "" || !editingTask.text.trim())
      deleteTasksFromDB([editingTask.id], () => {
        setTaskList(getTaskListWithoutTask(taskList, editingTask.id));
      });
    // Close the modal
    setEditingTask(null);
  };

  return (
    <>
      <DragDropContext
        onDragEnd={handleOnDragEnd}
        onDragStart={() =>
          activeTaskTextarea.current && activeTaskTextarea.current.blur()
        }
      >
        <ListTitle>
          {selectedDay === 0
            ? "Done tasks"
            : selectedDay === 1
            ? "All tasks"
            : compareDates(new Date(selectedDay), new Date())
            ? "Today"
            : formatDate(new Date(selectedDay))}
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
                    key={+item.id}
                    draggableId={item.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...(!isDesktop && provided.dragHandleProps)}
                        ref={provided.innerRef}
                      >
                        <TaskItem
                          task={item}
                          dragHandleProps={provided.dragHandleProps}
                          onClick={() => handleSetTaskDone(+item.id)}
                          onBlur={(text) => handleEditTaskText(text, +item.id)}
                          handleEditTask={(currentText) => {
                            setEditingTask({ ...item, text: currentText });
                          }}
                          activeTaskTextarea={activeTaskTextarea}
                          showDate={selectedDay === 1}
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

      {selectedDay == 0 ? (
        <ActionBar
          actionText="Delete done tasks"
          handleAction={handleDeleteDoneTasks}
        />
      ) : (
        <ActionBar
          actionText="Add task"
          actionIcon={Add}
          handleAction={handleAddTask}
        />
      )}
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

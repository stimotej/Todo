import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useMediaQuery } from "react-responsive";
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
  setTaskInDB,
} from "../data/todosDB";
import ActionBar from "./ActionBar";
import { compareDates, formatDate } from "../data/dates";
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
  getListWithoutTask,
} from "../data/taskList";
import { Add } from "@styled-icons/material-outlined";
import {
  motion,
  AnimatePresence,
  AnimateSharedLayout,
  useIsPresent,
} from "framer-motion";

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

  // True if min-width is 768px
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  // Get ref of current active task item textarea
  const activeTaskTextarea = useRef(null);

  const [animateTaskItemExit, setAnimateTaskItemExit] = useState(false);

  const taskItemVariants = {
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
      },
    }),
    hidden: { x: -50, opacity: 0 },
  };

  useEffect(() => {
    // Check if browser supports indexedDB
    !("indexedDB" in window) &&
      alert("Todo app is not supported in this browser");

    setAnimateTaskItemExit(false);

    // If selected day is 0 get done tasks, if day is 1 get days before today
    // else get tasks from selected day
    if (selectedDay === 0) {
      getDoneTaskListFromDB((tasks) => {
        setTaskList(tasks);
        setAnimateTaskItemExit(true);
      });
    } else if (selectedDay === 1) {
      getTaskListFromDB((tasks) => {
        setTaskList(tasks);
        setAnimateTaskItemExit(true);
      });
    } else {
      getTaskListByDateFromDB(new Date(selectedDay), (tasks) => {
        setTaskList(tasks);
        setAnimateTaskItemExit(true);
      });
    }
  }, [selectedDay]);

  // Remove task and update state
  const handleSetTaskDone = async (id: number) => {
    const doneTask = toggleTaskDone(taskList, id);

    // Update state and DB
    setTaskInDB(doneTask, () => {
      // Update taskList to all tasks not marked/marked as done
      setTaskList(getListWithoutTask(taskList, doneTask));
    });
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

  const handleAddTask = () => {
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
              $emptyTaskList={!(selectedDay in [0, 1])}
            >
              {taskList.length === 0 && (
                <TaskListEmptyText
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.3 } }}
                >
                  No tasks yet :(
                </TaskListEmptyText>
              )}
              <AnimatePresence>
                {taskList.map((item, index) => (
                  <motion.div
                    key={+item.id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    exit={animateTaskItemExit && "hidden"}
                    variants={taskItemVariants}
                  >
                    <Draggable draggableId={item.id.toString()} index={index}>
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
                            onBlur={(text) =>
                              handleEditTaskText(text, +item.id)
                            }
                            onEnterPressed={() => handleAddTask()}
                            handleEditTask={(currentText) => {
                              setEditingTask({
                                ...item,
                                text: currentText,
                              });
                            }}
                            activeTaskTextarea={activeTaskTextarea}
                            showDate={selectedDay === 1}
                          />
                        </div>
                      )}
                    </Draggable>
                  </motion.div>
                ))}
              </AnimatePresence>

              {provided.placeholder}
            </TaskListContainer>
          )}
        </Droppable>
      </DragDropContext>

      <AnimatePresence>
        {editingTask && (
          <EditTaskModal
            editingTask={editingTask}
            handleClose={handleCloseModal}
          />
        )}
      </AnimatePresence>

      <AnimateSharedLayout>
        {selectedDay === 0 ? (
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
      </AnimateSharedLayout>
    </>
  );
};

const ListTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  transition: all 0.5s ease;
`;

const TaskListContainer = styled(motion.ul)<{ $emptyTaskList?: boolean }>`
  list-style-type: none;
  padding-bottom: 100px;
  position: relative;
  margin-bottom: ${({ $emptyTaskList }) => ($emptyTaskList ? "100px" : "0")};
`;

const TaskListEmptyText = styled(motion.p)`
  color: ${({ theme }) => theme.textLight};
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export default TaskList;

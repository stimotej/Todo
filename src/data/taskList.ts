export const getListOfDoneTasks = (taskList) => {
  return [...taskList].filter((task) => task.done);
};

export const getIdListOfDoneTasks = (taskList) => {
  return [...taskList].filter((task) => task.done).map((task) => task.id);
};

export const getListOfNotDoneTasks = (taskList) => {
  return [...taskList].filter((task) => !task.done);
};

export const getListWithoutTask = (taskList, task) => {
  return [...taskList].filter((item) => item.id !== task.id);
};

export const toggleTaskDone = (taskList, id) => {
  let taskListCopy = [...taskList];
  const index = taskListCopy.findIndex((item) => item.id === id);
  taskListCopy[index].done = !taskListCopy[index].done;
  return taskListCopy[index];
};

export const getTaskListWithoutTask = (taskList, id) => {
  return [...taskList].filter((task) => task.id !== id);
};

export const editTaskText = (taskList, id, text) => {
  let taskListCopy = [...taskList];
  const index = taskListCopy.findIndex((item) => item.id === id);
  taskListCopy[index].text = text;
  return taskListCopy;
};

export const moveTask = (taskList, sourceIndex, destinationIndex) => {
  let taskListCopy = [...taskList];
  let [reorderedTask] = taskListCopy.splice(sourceIndex, 1);
  taskListCopy.splice(destinationIndex, 0, reorderedTask);
  return taskListCopy;
};

export const resetTasksOrder = (taskList) => {
  let taskListCopy = [...taskList];
  taskListCopy.forEach((item, index) => (item.order = index + 1));
  return taskListCopy;
};

export const getAllTaskDates = (taskList) => {
  let dates = [];
  taskList.forEach((task) => {
    if (!(task.date in dates)) dates.push(task.date);
  });
  return dates;
};

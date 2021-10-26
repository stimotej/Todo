import Dexie from "dexie";

const db = new Dexie("TodoDB");
db.version(1).stores({ tasks: "++id" });

export const getTaskListFromDB = (setTaskList) => {
  db.table("tasks")
    .toArray()
    .then((tasks) => {
      setTaskList(tasks);
    });
};

export const addTaskToDB = (taskList, setTaskList, text) => {
  const task = {
    text,
    date: new Date().getTime(),
  };
  db.table("tasks")
    .add(task)
    .then((id) => {
      setTaskList([...taskList, Object.assign({}, task, { id })]);
    });
};

export const deleteTasksFromDb = (taskList, setTaskList, taskDoneList) => {
  db.table("tasks")
    .bulkDelete(taskDoneList)
    .then(() => {
      let taskListCopy = [...taskList];
      taskDoneList.forEach((id) => {
        var index = taskListCopy.findIndex((task) => task.id === id);
        taskListCopy.splice(index, 1);
      });
      setTaskList(taskListCopy);
    });
};

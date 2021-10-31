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
      setTaskList([...taskList, { id, ...task }]);
    });
};

export const reorderTasksInDb = (taskList) => {
  db.table("tasks")
    .bulkPut(taskList)
    .then((lastKey) => {
      // console.log(lastKey);
    })
    .catch((e) => {
      console.log(e);
    });
};

export const deleteTasksFromDbgg = (taskDoneList) => {
  db.table("tasks").bulkDelete(taskDoneList);
};

export const deleteTasksFromDb = (taskList, setTaskList, taskDoneList) => {
  db.table("tasks")
    .bulkDelete(taskDoneList)
    .then(() => {
      let taskListCopy = [...taskList];

      taskDoneList.forEach((id) => {
        let index = taskListCopy.findIndex((task) => task.id === id);
        taskListCopy.splice(index, 1);
      });

      setTaskList(taskListCopy);
    });
};

export const editTaskInDb = (taskList, setTaskList, id, text) => {
  const editedTask = {
    text,
    date: new Date().getTime(),
  };
  db.table("tasks")
    .update(id, editedTask)
    .then(() => {
      let taskListCopy = [...taskList];
      let index = taskListCopy.findIndex((task) => task.id === id);
      taskListCopy[index] = { id, ...editedTask };
      setTaskList(taskListCopy);
    });
};

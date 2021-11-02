import Dexie, { IndexableType } from "dexie";

const db = new Dexie("TodoDB");
db.version(1).stores({ tasks: "++id" });

export interface Task {
  id?: IndexableType,
  text: string,
  date: number
}

export const getTaskListFromDB = (callback?: (tasks: Task[]) => void) : void => {
  db.table("tasks")
    .toArray()
    .then((tasks) => {
      callback && callback(tasks);
    });
};

export const addTaskToDB = (task : Task, callback?: (id: IndexableType) => void) : void => {
  db.table("tasks")
    .add(task)
    .then((id) => {
      callback && callback(id);
    });
};

export const setTasksInDb = (taskList: Task[], callback?: (id: IndexableType) => void) : void => {
  db.table("tasks")
    .bulkPut(taskList)
    .then((lastKey) => {
      callback && callback(lastKey);
    });
};

export const deleteTasksFromDb = (taskIdList: number[], callback?: () => void) : void => {
  db.table("tasks")
    .bulkDelete(taskIdList)
    .then(() => {
      callback && callback();
    });
};

export const editTaskInDb = (id: number, editedTask: Task, callback?: () => void) : void => {
  db.table("tasks")
    .update(id, editedTask)
    .then(() => {
      callback && callback();
    });
};

import Dexie, { IndexableType } from "dexie";

const db = new Dexie("TodoDB");
const dbVersion = 1.2;
db.version(dbVersion).stores({ tasks: "++id", options: "++id", days: "++id" });

export interface Task {
  id?: IndexableType;
  text: string;
  createdAt?: number;
  date?: number;
  important?: boolean;
}

export const getTaskListFromDB = (callback?: (tasks: Task[]) => void): void => {
  db.table("tasks")
    .toArray()
    .then((tasks) => {
      callback && callback(tasks);
    });
};

export const addTaskToDB = (
  task: Task,
  callback?: (id: IndexableType) => void
): void => {
  db.table("tasks")
    .add(task)
    .then((id) => {
      callback && callback(id);
    });
};

export const setTasksInDB = (
  taskList: Task[],
  callback?: (id: IndexableType) => void
): void => {
  db.table("tasks")
    .bulkPut(taskList)
    .then((lastKey) => {
      callback && callback(lastKey);
    });
};

export const deleteTasksFromDB = (
  taskIdList: number[],
  callback?: () => void
): void => {
  db.table("tasks")
    .bulkDelete(taskIdList)
    .then(() => {
      callback && callback();
    });
};

export const editTaskInDB = (
  id: number,
  editedTask: Task,
  callback?: () => void
): void => {
  db.table("tasks")
    .update(id, editedTask)
    .then(() => {
      callback && callback();
    });
};

export interface Options {
  darkTheme: boolean;
}

export const getOptionsFromDB = (
  callback?: (options: Options) => void
): void => {
  db.table("options")
    .get(1)
    .then((options) => {
      callback && callback(options);
    });
};

export const setOptionsInDB = (
  options: Options,
  callback?: () => void
): void => {
  db.table("options")
    .put({ id: 1, ...options })
    .then(() => {
      callback && callback();
    });
};

interface Day {
  title: string;
  date: number;
  taskCount: number;
}

export const getDaysFromDB = (callback?: (days: Day[]) => void): void => {
  db.table("days")
    .toArray()
    .then((options) => {
      callback && callback(options);
    });
};

export const addDayToDB = (
  day: Day,
  callback?: (id: IndexableType) => void
): void => {
  db.table("days")
    .add(day)
    .then((id) => {
      callback && callback(id);
    });
};

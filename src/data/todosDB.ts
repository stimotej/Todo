import Dexie, { IndexableType } from "dexie";
import { compareDates } from "./dates";

const db = new Dexie("TodoDB");
const dbVersion = 1.4;
db.version(dbVersion).stores({ tasks: "++id,order", options: "++id" });

export interface Task {
  id?: IndexableType;
  text: string;
  createdAt?: number;
  date: number;
  important: boolean;
  done: boolean;
  order: number;
}

export const getTaskListByDateFromDB = (
  date: Date,
  callback?: (tasks: Task[]) => void
): void => {
  db.table("tasks")
    .orderBy("order")
    .filter((task) => compareDates(new Date(task.date), date))
    .filter((task) => !task.done)
    .toArray()
    .then((tasks) => {
      callback && callback(tasks);
    });
};

export const getTaskListFromDB = (callback?: (tasks: Task[]) => void): void => {
  db.table("tasks")
    .orderBy("order")
    .filter((task) => !task.done)
    .toArray()
    .then((tasks) => {
      callback && callback(tasks);
    });
};

export const getDoneTaskListFromDB = (
  callback?: (tasks: Task[]) => void
): void => {
  db.table("tasks")
    .orderBy("order")
    .filter((task) => task.done)
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

export const setTaskInDB = (
  editedTask: Task,
  callback?: () => void,
  errorCallback?: () => void
): void => {
  db.table("tasks")
    .put(editedTask)
    .then(() => {
      callback && callback();
    })
    .catch(() => {
      errorCallback && errorCallback();
    });
};

export const editTaskInDB = (
  id: number,
  editedTask: {},
  callback?: () => void,
  errorCallback?: () => void
): void => {
  db.table("tasks")
    .update(id, editedTask)
    .then(() => {
      callback && callback();
    })
    .catch(() => {
      errorCallback && errorCallback();
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

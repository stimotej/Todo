const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const dayFullNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getThisWeekDays = () => {
  const today = new Date();
  const currentDate = today.getDate();
  const weekDays = [...Array(7).keys()].map(
    (i) => new Date(today.setDate(currentDate + i))
  );

  return weekDays;
};

export const compareDates = (firstDate: Date, secondDate: Date) => {
  return firstDate.getDate() === secondDate.getDate() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getFullYear() == secondDate.getFullYear()
    ? true
    : false;
};

export const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const getDayName = (date: Date) => {
  return dayFullNames[date.getDay()];
};

export const beforeToday = (date: Date) => {
  const today = new Date();

  return date.getDate() < today.getDate() &&
    date.getMonth() <= today.getMonth() &&
    date.getFullYear() <= today.getFullYear()
    ? true
    : false;
};

export const notInThisWeek = (date: Date) => {
  getThisWeekDays().forEach((dayInWeek) => {
    if (compareDates(dayInWeek, date)) return false;
  });
  return true;
};

export { dayNames, dayFullNames, monthNames };

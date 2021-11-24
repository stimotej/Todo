import React from "react";
import styled, { keyframes } from "styled-components";
import Icon from "../components/Icon";
import {
  ExpandMore,
  ExpandLess,
  ArrowBackIos,
  ArrowForwardIos,
} from "@styled-icons/material-outlined";
import { compareDates, monthNames } from "../data/dates";

interface CalendarProps {
  selectedDayProp: Date;
  onDateSelected?: (arg0: number) => void;
  activeDays?: Date[];
}

const Calendar: React.FC<CalendarProps> = ({
  selectedDayProp,
  onDateSelected,
  activeDays,
}) => {
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const years = [...Array(200).keys()].map((i) => 2008 + i);

  const tableRef = React.useRef(null);
  const selectedYearRef = React.useRef(null);

  const [year, setYear] = React.useState(selectedDayProp.getFullYear());
  const [month, setMonth] = React.useState(selectedDayProp.getMonth());

  const [selectYear, setSelectYear] = React.useState(false);

  const [selectedDate, setSelectedDate] = React.useState(selectedDayProp);

  const today = new Date();

  const getFirstDayOfMonth = () => {
    return new Date(year, month, 1).getDay();
  };

  const handleSelectDate = (date) => {
    setSelectedDate(new Date(year, month, date));
    onDateSelected && onDateSelected(new Date(year, month, date).getTime());
  };

  const handleMonthBack = () => {
    if (month + 1 <= 1) {
      setMonth(11);
      setYear(year - 1);
    } else setMonth(month - 1);
  };

  const handleMonthForward = () => {
    if (month + 1 >= 12) {
      setMonth(0);
      setYear(year + 1);
    } else setMonth(month + 1);
  };

  const handleSelectYear = (selectedYear) => {
    setYear(selectedYear);
    setSelectYear(false);
  };

  React.useEffect(() => {
    selectedYearRef.current &&
      selectedYearRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
  }, [selectYear]);

  const monthTableBody = () => {
    let dates = [];
    let row = [];
    let date = new Date();
    let firstDayOfMonth = getFirstDayOfMonth();

    let props = {
      $today: false,
      $selected: false,
      $active: false,
      $otherMonth: false,
    };

    [...Array(35).keys()].forEach((i) => {
      date = new Date(year, month, i + 1 - firstDayOfMonth + 1);

      props = {
        $today: compareDates(date, today),
        $selected: compareDates(date, selectedDate),
        $active:
          activeDays &&
          activeDays.filter((day) => compareDates(new Date(day), date)).length
            ? true
            : false,
        $otherMonth: date.getMonth() !== month,
      };

      row.push(
        <TableData key={date.getTime()}>
          <DateButton
            {...props}
            onClick={() => handleSelectDate(i + 1 - firstDayOfMonth + 1)}
          >
            {date.getDate()}
            <Circle />
          </DateButton>
        </TableData>
      );

      if ((i + 1) % 7 === 0) {
        dates.push(<tr key={date.getTime()}>{row}</tr>);
        row = [];
      }
    }, this);

    return dates;
  };

  return (
    <>
      <SelectMonthContainer>
        <SelectMonthAndYear onClick={() => setSelectYear(!selectYear)}>
          <Text>
            {monthNames[month]}, {year}.
          </Text>
          <Icon icon={selectYear ? ExpandLess : ExpandMore} />
        </SelectMonthAndYear>
        {!selectYear && (
          <MonthButtonsContainer>
            <MonthButton onClick={handleMonthBack}>
              <Icon icon={ArrowBackIos} />
            </MonthButton>
            <MonthButton onClick={handleMonthForward}>
              <Icon icon={ArrowForwardIos} />
            </MonthButton>
          </MonthButtonsContainer>
        )}
      </SelectMonthContainer>
      <div ref={tableRef}>
        {selectYear ? (
          <YearSelectContainer $height={tableRef.current.offsetHeight}>
            {years.map((yearItem) => (
              <YearItem key={yearItem}>
                <YearButton
                  ref={yearItem === year ? selectedYearRef : null}
                  $selected={yearItem === year}
                  onClick={() => handleSelectYear(yearItem)}
                >
                  {yearItem}
                </YearButton>
              </YearItem>
            ))}
          </YearSelectContainer>
        ) : (
          <Table>
            <thead>
              <tr>
                {dayNames.map((dayName) => (
                  <TableHeader key={dayName}>{dayName}</TableHeader>
                ))}
              </tr>
            </thead>
            <tbody>{monthTableBody()}</tbody>
          </Table>
        )}
      </div>
    </>
  );
};

const SelectMonthContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SelectMonthAndYear = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 10px;
  border-radius: 20px;

  &:hover {
    background-color: ${({ theme }) => theme.main};
  }
`;

const Text = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
`;

const MonthButtonsContainer = styled.div`
  display: flex;
`;

const MonthButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;

  &:hover {
    background-color: ${({ theme }) => theme.main};
  }
`;

const YearSelectContainer = styled.div<{ $height: number }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  max-height: ${({ $height }) => $height}px;
  overflow-y: auto;
`;

const YearItem = styled.div`
  padding: 10px;
`;

const YearButton = styled.button<{ $selected: boolean }>`
  border: none;
  background-color: ${({ theme, $selected }) =>
    $selected ? theme.accent : "transparent"};
  color: ${({ theme, $selected }) =>
    $selected ? theme.accentText : theme.text};
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.accentText};
  }
`;

const Table = styled.table`
  width: 100%;
  table-layout: fixed;
`;

const TableHeader = styled.th`
  padding: 10px;
  font-size: 0.875rem;
  font-weight: 400;
  color: ${({ theme }) => theme.textLight};
  text-transform: uppercase;
`;

const TableData = styled.td`
  text-align: center;
  vertical-align: middle;
`;

const DateButton = styled.button<{
  $today: boolean;
  $selected: boolean;
  $active: boolean;
  $otherMonth: boolean;
}>`
  font-size: 0.875rem;
  font-weight: 400;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  color: ${({ theme, $selected, $otherMonth }) =>
    $selected ? theme.accentText : $otherMonth ? theme.textLight : theme.text};
  background-color: ${({ theme, $selected, $today }) =>
    $selected ? theme.accent : $today ? theme.main : theme.background};

  &:hover {
    background-color: ${({ theme, $selected }) =>
      $selected ? theme.accent : theme.main};
  }

  & div {
    display: ${({ $active }) => ($active ? "block" : "none")};
    border: 2px solid
      ${({ theme, $selected }) => ($selected ? theme.accentText : theme.accent)};
  }
`;

const Circle = styled.div`
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  border: 2px solid black;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default Calendar;

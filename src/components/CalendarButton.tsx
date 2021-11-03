import { Link } from "gatsby";
import React from "react";
import { MdCalendarToday } from "react-icons/md";
import styled from "styled-components";

const CalendarButton: React.FC = () => {
  return (
    <CalendarContainer>
      <OtherDaysLink to="/">
        <MdCalendarToday
          style={{
            backgroundColor: "transparent",
            width: "24px",
            height: "24px",
            marginRight: "10px",
          }}
        />
        Days
      </OtherDaysLink>
    </CalendarContainer>
  );
};

const CalendarContainer = styled.section`
  display: flex;
  padding: 20px 0 40px 0;
  width: 100%;
`;

const OtherDaysLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eeeeee;
  color: black;
  text-decoration: none;
  border-radius: 60px;
  padding: 16px 24px;
  font-size: 1rem;
  font-weight: 400;
`;

export default CalendarButton;

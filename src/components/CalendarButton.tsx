import { Link } from "gatsby";
import React from "react";
import { CalendarToday } from "@styled-icons/material/CalendarToday";
import styled from "styled-components";
import Icon from "./Icon";

const CalendarButton: React.FC = () => {
  return (
    <CalendarContainer>
      <OtherDaysLink to="/">
        <Icon icon={CalendarToday} margin colorLight />
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
  background-color: ${({ theme }) => theme.main};
  color: ${({ theme }) => theme.textLight};
  text-decoration: none;
  border-radius: 60px;
  padding: 16px 24px;
  font-size: 1rem;
  font-weight: 400;
`;

export default CalendarButton;

import React from "react";
import { MdAdd, MdChevronLeft } from "react-icons/md";
import styled from "styled-components";

const ActionBar: React.FC = () => {
  return (
    <ActionBarContainer>
      <Button>
        <MdChevronLeft
          style={{
            backgroundColor: "transparent",
            width: "24px",
            height: "24px",
            marginRight: "10px",
          }}
        />
        Home
      </Button>
      <Button>
        <MdAdd
          style={{
            backgroundColor: "transparent",
            width: "24px",
            height: "24px",
            marginRight: "10px",
          }}
        />
        Add task
      </Button>
    </ActionBarContainer>
  );
};

const ActionBarContainer = styled.section`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(238, 238, 238, 0.4);
  backdrop-filter: blur(30px);
  width: 100%;
  bottom: 0;
  right: 0;

  @media (min-width: 768px) {
    width: calc(60% - 40px);
    right: 50%;
    transform: translateX(50%);
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  color: black;
  background-color: transparent;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1.25px;
  font-size: 0.875rem;
  font-weight: 500;
`;

export default ActionBar;

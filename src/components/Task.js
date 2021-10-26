import React, { useState } from "react";
import styled from "styled-components";

const Task = ({ text, onClick, onBlur, done }) => {
  const [editTask, setEditTask] = useState(false);

  const handleOnBlur = (e) => {
    setEditTask(false);
    onBlur(e);
  };

  return (
    <TaskContainer>
      <CheckboxContainer onClick={onClick}>
        <Checkbox done={done} />
      </CheckboxContainer>
      <TextContainer>
        {editTask ? (
          <TextInput
            type="text"
            autoFocus={editTask}
            defaultValue={text}
            onBlur={(e) => handleOnBlur(e)}
          />
        ) : (
          <Text done={done} onClick={() => setEditTask(true)}>
            {text}
          </Text>
        )}
      </TextContainer>
    </TaskContainer>
  );
};

const TaskContainer = styled.li`
  display: flex;
  margin-bottom: 10px;
`;

const CheckboxContainer = styled.button`
  padding: 0 16px 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #eeeeee;
  }
`;

const Checkbox = styled.div`
  width: 16px;
  height: 16px;
  border: 1.5px solid black;
  border-radius: 50%;
  background-color: ${(props) => (props.done ? "black" : "none")};
`;

const TextContainer = styled.div`
  width: 100%;
  padding: 20px 0 20px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const TextInput = styled.input`
  width: 100%;
  font-size: 1.125rem;
  font-weight: 400;
  border: none;
  outline: none;

  &:focus {
    outline: none;
  }
`;

const Text = styled.p`
  font-size: 1.125rem;
  font-weight: 400;
  text-decoration: ${(props) => (props.done ? "line-through" : "none")};
`;

export default Task;

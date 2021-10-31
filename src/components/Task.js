import React, { useCallback } from "react";
import styled from "styled-components";
import { MdDragHandle } from "react-icons/md";

const Task = ({ text, dragHandleProps, onClick, onBlur, done }) => {
  const taskInput = useCallback((node) => {
    if (node !== null) {
      textareaAutoHeight(node);
    }
  }, []);

  const handleOnBlur = (e) => {
    onBlur(e);
  };

  const textareaAutoHeight = (textarea) => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <TaskContainer>
      <CheckboxContainer onClick={onClick}>
        <Checkbox done={done} />
      </CheckboxContainer>
      <TextContainer>
        <TextInput
          id="text-input"
          rows="1"
          ref={taskInput}
          defaultValue={text}
          spellCheck="false"
          done={done}
          onKeyDown={(e) => {
            e.key === "Enter" && e.preventDefault();
          }}
          onFocus={(e) => {
            let value = e.target.value;
            e.target.value = null;
            e.target.value = value;
          }}
          onChange={(e) => textareaAutoHeight(e.target)}
          onBlur={(e) => handleOnBlur(e)}
        />
        <DragHandle {...dragHandleProps}>
          <MdDragHandle />
        </DragHandle>
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
`;

const Checkbox = styled.div`
  width: 16px;
  height: 16px;
  border: 1.5px solid black;
  border-radius: 50%;
  background-color: ${({ done }) => (done ? "black" : "none")};
`;

const TextContainer = styled.div`
  width: 100%;
  padding: 20px 0 20px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  overflow: hidden;
  box-sizing: border-box;
  user-select: none;
  display: flex;
`;

const TextInput = styled.textarea`
  width: 100%;
  font-size: 1rem;
  font-weight: 400;
  border: none;
  outline: none;
  resize: none;
  overflow: hidden;
  user-select: none;
  text-decoration: ${({ done }) => (done ? "line-through" : "none")};

  &:focus {
    outline: none;
    user-select: auto;
  }
`;

const DragHandle = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: grab;
  }
`;

// const Text = styled.p`
//   font-size: 1rem;
//   font-weight: 400;
//   text-decoration: ${(props) => (props.done ? "line-through" : "none")};
//   word-wrap: break-word;
//   background-color: red;
// `;

export default Task;

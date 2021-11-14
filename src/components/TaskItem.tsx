import React, { useState, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import {
  DragHandle,
  PriorityHigh,
  Edit,
} from "@styled-icons/material-outlined";
import Icon from "./Icon";

interface TaskProps {
  text: string;
  dragHandleProps: Object;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onBlur: (arg0: string) => void;
  handleEditTask: (arg0: string) => void;
  activeTaskTextarea: React.MutableRefObject<HTMLTextAreaElement>;
  done: boolean;
  important: boolean;
}

const Task: React.FC<TaskProps> = ({
  text,
  dragHandleProps,
  onClick,
  onBlur,
  handleEditTask,
  activeTaskTextarea,
  done,
  important,
}) => {
  const [showEditButton, setShowEditButton] = useState(false);

  const [taskText, setTaskText] = useState(text);

  // Task item textarea ref to set focus on add task button click (for safari)
  const taskTextarea = useRef(null);

  useEffect(() => {
    setTaskText(text);
  }, [text]);

  const taskInput = useCallback((node: HTMLTextAreaElement) => {
    if (node !== null) {
      taskTextarea.current = node;
      textareaAutoHeight(node);
      if (!node.value) {
        node.focus();
        node.scrollIntoView();
        activeTaskTextarea.current = node;
      }
    }
  }, []);

  const textareaAutoHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <TaskContainer>
      <CheckboxContainer onClick={onClick}>
        <Checkbox done={done} />
      </CheckboxContainer>
      <TextContainer>
        {important && (
          <Important>
            <Icon icon={PriorityHigh} />
          </Important>
        )}
        <TextInput
          id="text-input"
          rows={1}
          ref={taskInput}
          value={taskText}
          spellCheck="false"
          done={done}
          onKeyDown={(e) => {
            e.key === "Enter" && e.preventDefault();
          }}
          onFocus={(e) => {
            let value = e.target.value;
            e.target.value = null;
            e.target.value = value;
            activeTaskTextarea.current = taskTextarea.current;
            setShowEditButton(true);
          }}
          onChange={(e) => {
            textareaAutoHeight(e.target);
            setTaskText(e.target.value);
          }}
          onBlur={() => {
            onBlur(taskText);
            setShowEditButton(false);
          }}
        />
        <EditTaskButton
          show={showEditButton}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            handleEditTask(taskText);
          }}
        >
          <Icon icon={Edit} />
        </EditTaskButton>
        <DragHandleContainer {...dragHandleProps}>
          <Icon icon={DragHandle} colorLight />
        </DragHandleContainer>
      </TextContainer>
    </TaskContainer>
  );
};

const TaskContainer = styled.li`
  display: flex;
  margin-bottom: 10px;
`;

const Important = styled.div`
  & * {
    color: ${({ theme }) => theme.error};
  }
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

const Checkbox = styled.div<{ done: boolean }>`
  width: 16px;
  height: 16px;
  border: 1.5px solid ${({ theme }) => theme.text};
  border-radius: 50%;
  background-color: ${({ done, theme }) => (done ? theme.text : "none")};
  transition: all 0.5s ease;
`;

const TextContainer = styled.div`
  width: 100%;
  padding: 20px 0 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.divider};
  overflow: hidden;
  box-sizing: border-box;
  user-select: none;
  display: flex;
  transition: all 0.5s ease;
`;

const TextInput = styled.textarea<{ done: boolean }>`
  width: 100%;
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.text};
  border: none;
  outline: none;
  resize: none;
  overflow: hidden;
  background-color: transparent;
  text-decoration: ${({ done }) => (done ? "line-through" : "none")};
  transition: all 0.5s ease;

  &:focus {
    outline: none;
    user-select: auto;
  }
`;

const EditTaskButton = styled.button<{ show: boolean }>`
  display: ${({ show }) => (show ? "flex" : "none")};
  background-color: transparent;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  padding-left: 10px;

  @media (min-width: 768px) {
    margin-right: 10px;
  }
`;

const DragHandleContainer = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: grab;
  }
`;

export default Task;

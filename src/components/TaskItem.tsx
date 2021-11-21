import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import {
  DragHandle,
  PriorityHigh,
  Edit,
} from "@styled-icons/material-outlined";
import { formatDate } from "../data/dates";
import { Task } from "../data/todosDB";
import Icon from "./Icon";
import Textarea from "./Textarea";
import { AnimationControls, motion, useAnimation } from "framer-motion";

interface TaskProps {
  task: Task;
  dragHandleProps: Object;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onBlur: (arg0: string) => void;
  onEnterPressed: () => void;
  handleEditTask: (arg0: string) => void;
  activeTaskTextarea: React.MutableRefObject<HTMLTextAreaElement>;
  showDate: boolean;
}

const TaskItem: React.FC<TaskProps> = ({
  task,
  dragHandleProps,
  onClick,
  onBlur,
  onEnterPressed,
  handleEditTask,
  activeTaskTextarea,
  showDate,
}) => {
  const [showEditButton, setShowEditButton] = useState(false);

  const [taskText, setTaskText] = useState(task.text);

  // Task item textarea ref to set focus on add task button click (for safari)
  const taskTextarea = useRef(null);

  useEffect(() => {
    setTaskText(task.text);
  }, [task.text]);

  useEffect(() => {
    if (taskTextarea.current) {
      taskTextarea.current.style.height = "auto";
      taskTextarea.current.style.height = `${taskTextarea.current.scrollHeight}px`;
    }
  }, [showEditButton]);

  return (
    <TaskContainer>
      <CheckboxContainer>
        <CheckboxButton onClick={onClick}>
          <Checkbox done={task.done} />
        </CheckboxButton>
      </CheckboxContainer>
      <TextContainer>
        <TextRow>
          {task.important && (
            <Important>
              <Icon icon={PriorityHigh} />
            </Important>
          )}
          <Textarea
            getRef={(ref) => (taskTextarea.current = ref)}
            done={task.done}
            value={taskText}
            onFocus={() => {
              activeTaskTextarea.current = taskTextarea.current;
              setShowEditButton(true);
            }}
            onChange={(textarea) => {
              setTaskText(textarea.value);
            }}
            onBlur={() => {
              onBlur(taskText);
              setShowEditButton(false);
            }}
            onEnterPressed={() => onEnterPressed()}
          />
          <EditTaskContainer show={showEditButton}>
            <EditTaskButton
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                handleEditTask(taskText);
              }}
            >
              <Icon icon={Edit} />
            </EditTaskButton>
          </EditTaskContainer>
          <DragHandleContainer {...dragHandleProps}>
            <Icon icon={DragHandle} colorLight />
          </DragHandleContainer>
        </TextRow>
        {showDate && <TaskDate>{formatDate(new Date(task.date))}</TaskDate>}
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

const CheckboxContainer = styled.div`
  padding: 8px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const CheckboxButton = styled.button`
  padding: 16px;
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
  flex-direction: column;
  transition: all 0.5s ease;
`;

const TextRow = styled.div`
  display: flex;
`;

const TaskDate = styled.p`
  margin-top: 10px;
  margin-bottom: -10px;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textLight};
`;

const EditTaskContainer = styled.div<{ show: boolean }>`
  display: ${({ show }) => (show ? "flex" : "none")};
  align-items: start;
  justify-content: center;
`;

const EditTaskButton = styled.button`
  background-color: transparent;
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

export default TaskItem;

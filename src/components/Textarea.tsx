import React, { useCallback } from "react";
import styled from "styled-components";

interface TextareaProps {
  getRef?: (arg0: HTMLTextAreaElement) => void;
  done?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (arg0: HTMLTextAreaElement) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onEnterPressed?: () => void;
}

const Textarea: React.FC<TextareaProps> = ({
  getRef,
  done,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  onEnterPressed,
}) => {
  const taskInput = useCallback((node: HTMLTextAreaElement) => {
    if (node !== null) {
      getRef && getRef(node);
      textareaAutoHeight(node);
      if (!node.value) {
        node.focus();
      }
    }
  }, []);

  const textareaAutoHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    textarea.style.maxHeight = "200px";
    textarea.style.overflowY = "auto";
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onEnterPressed && onEnterPressed();
    }
  };

  const handleFocus: React.FocusEventHandler<HTMLTextAreaElement> = (e) => {
    let value = e.target.value;
    e.target.value = null;
    e.target.value = value;
    onFocus && onFocus();
  };

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    textareaAutoHeight(e.target);
    onChange(e.target);
  };

  const handleBlur: React.FocusEventHandler<HTMLTextAreaElement> = (e) => {
    onBlur && onBlur();
  };

  return (
    <>
      <TextInput
        id={`task-text-input-${placeholder}`}
        rows={1}
        ref={taskInput}
        placeholder={placeholder}
        value={value}
        spellCheck="false"
        $done={done}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </>
  );
};

const TextInput = styled.textarea<{ $done: boolean }>`
  width: 100%;
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme, $done }) => ($done ? theme.textLight : theme.text)};
  border: none;
  outline: none;
  resize: none;
  overflow: hidden;
  background-color: transparent;
  transition: all 0.5s ease;

  &:focus {
    outline: none;
    user-select: auto;
  }
`;

export default Textarea;

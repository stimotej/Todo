import React, { useEffect } from "react";
import styled from "styled-components";

const Modal = ({
  children,
  show,
  title,
  actionText,
  handleAction,
  handleClose,
}) => {
  useEffect(() => {
    const modal = document.getElementById("modal");

    window.onclick = (e: MouseEvent) => {
      if (e.target === modal) {
        handleClose();
      }
    };
  }, []);

  return (
    <Backdrop show={show} id="modal">
      <ModalContainer>
        <Title>{title}</Title>
        {children}
        <ActionButton onClick={handleAction}>{actionText}</ActionButton>
      </ModalContainer>
    </Backdrop>
  );
};

const Backdrop = styled.div<{ show: boolean }>`
  display: ${({ show }) => (show ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.backdropColor};
  backdrop-filter: blur(5px);
`;

const ModalContainer = styled.div`
  position: fixed;
  background-color: ${({ theme }) => theme.background};
  width: 100%;
  height: auto;
  bottom: 0;
  left: 0;
  padding: 20px;
`;

const Title = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1.25px;
  font-size: 0.875rem;
  font-weight: 500;
`;

export default Modal;

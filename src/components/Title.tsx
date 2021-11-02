import React from "react";
import styled from 'styled-components'

const Title: React.FC = () => {
  const getCurrentDate = () : string => {
    const d = new Date();
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <TitleContainer>
      <TitleTodo>todo</TitleTodo>
      <TextDate>{getCurrentDate()}</TextDate>
    </TitleContainer>
  );
};

const TitleContainer = styled.article`
  margin: 80px 0 80px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TitleTodo = styled.h1`
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 10px;
`;

const TextDate = styled.h3`
  font-size: 1.125rem;
  font-weight: 300;
`;

export default Title;

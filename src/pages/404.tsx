import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import Layout from "../components/Layout";

const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <Container>
        <Title>Page not found :(</Title>
        <TodoLink to="/">Open todo</TodoLink>
      </Container>
    </Layout>
  );
};

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.5);
  margin-bottom: 60px;
`;

const TodoLink = styled((props) => <Link {...props} />)`
  background-color: black;
  color: white;
  border: none;
  cursor: pointer;
  padding: 16px 24px;
  border-radius: 30px;
  text-transform: uppercase;
  letter-spacing: 1.25px;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    background-color: #212121;
  }
`;

export default NotFoundPage;

import React from 'react';
import styled from 'styled-components';
import Robot from '../assets/robot.gif';

export default function Welcome({ currentUser }) {
  // console.log(currentUser.username);
  return (
    <Container>
      <img src={Robot} alt="Robot" />
      <h1>
        Welcome, <span>{currentUser && currentUser.username}!</span>
      </h1>
      <h3>Please Select a user to start chatting!</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    //color: #4e0eff;
    color: #9a86f3;
  }
`;
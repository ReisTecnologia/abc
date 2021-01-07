import { Component } from 'react'
import styled from 'styled-components'

export const BasicLayout = styled.div`
  /* background-color: hsl(10, 100%, 90%); */
  border-radius: 5px;
  border: 1px solid black;
  height: 96vh;
  width: 96vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const LessonListLayout = styled.div`
  height: 70vh;
  width: 50vw;
  background-color: hsl(190, 100%, 90%);
  border: 1px solid black;
  margin: 1vh;
  border-radius: 5px;
  padding: 2vh;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`

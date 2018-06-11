// @flow

import React from 'react'
import styled from 'styled-components'
import Header from '../organisms/header'
import TaskBoard from '../organisms/task-board'
import Timeline from '../organisms/timeline'

export default () => (
  <Page>
    <Header />
    <Contents>
      <TaskBoard />
    </Contents>
    <Timeline />
  </Page>
)

const Page = styled.div`
  width: 100%;
  height: 100%;
`

const Contents = styled.div`
  position: relative;
  width: 100%;
  height: 85%;
  padding: 24px 36px;
  box-sizing: border-box;
`

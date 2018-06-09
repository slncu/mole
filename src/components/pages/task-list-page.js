// @flow

import React from 'react'
import styled from 'styled-components'
import TaskBoard from '../organisms/task-board'
import Timeline from '../organisms/timeline'

export default () => (
  <Page>
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
  padding: 0 36px;
`

import React, { Component } from 'react'
import styled from 'styled-components'
import Card from '../molecules/Card'
import Header from '../organisms/Header'

export default class TaskListPage extends Component {
  render () {
    return (
      <Page>
        <Header />
        <Contents>
          <Card />
        </Contents>
      </Page>
    )
  }
}

const Page = styled.div`
  width: 100%;
  height: 100%;
`

const Contents = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 36px;
`

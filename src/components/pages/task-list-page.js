import React, { Component } from 'react'
import styled from 'styled-components'
import Card from '../molecules/Card'

export default class TaskListPage extends Component {
  render () {
    return (
      <Contents>
        <Card />
      </Contents>
    )
  }
}

const Contents = styled.div`
  width: 100%;
  height: 100%;
`

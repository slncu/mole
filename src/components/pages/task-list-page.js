import React, { Component } from 'react'
import styled from 'styled-components'

import EditModal from '../molecules/edit-modal'
import Card from '../molecules/Card'

export default class TaskListPage extends Component {
  render () {
    return (
      <Contents>
        {/* <EditModal {...this.props} /> */}
        <Card />
      </Contents>
    )
  }
}

const Contents = styled.div`
  width: 100%;
  height: 100%;
`

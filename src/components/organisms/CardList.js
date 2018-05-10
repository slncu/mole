import React, { Component } from 'react'
import styled from 'styled-components'

import Card from '../molecules/Card'
import AddCard from '../molecules/add-card'

export default class CardList extends Component {
  render () {
    const { lists } = this.props.tasks

    return (
      <ListWrapper>
        <List>
          <Card {...this.props} />
        </List>
      </ListWrapper>
    )
  }
}

const ListWrapper = styled.div`
  display: flex;
  height: 100%;
`

const List = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100%;
`

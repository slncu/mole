// @flow
import React from 'react'
import styled from 'styled-components'
import CardList from './card-list'
import AddList from '../molecules/add-list'

export default () => (
  <Wrapper>
    <CardList />
    <AddList />
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  white-space: nowrap;
`

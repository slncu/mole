// @flow

import React from 'react'
import styled from 'styled-components'
import CardList from '../organisms/Card-list'
import Header from '../organisms/Header'

export default () => (
  <Page>
    <Header />
    <Contents>
      <CardList />
    </Contents>
  </Page>
)

const Page = styled.div`
  width: 100%;
  height: 100%;
`

const Contents = styled.div`
  width: 100%;
  height: 85%;
  padding: 0 36px;
`

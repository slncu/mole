// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import type { Dispatch } from 'redux'
import styled from 'styled-components'
import { AddButton } from '../atoms/button'
import { dispatchAddCard, incrementCardAmount } from '../../redux/modules/tasks'
import Const from '../../const'
const { Color } = Const

type Props = {
  listId: number,
  dispatchAddCard: (listId: number) => void
}

function AddCard(props: Props) {
  function onClick(e) {
    props.dispatchAddCard(props.listId)
  }

  return (
    <Wrapper>
      <AddButton onClick={(e) => { onClick(e) }}>
        カードを追加する
      </AddButton>
    </Wrapper>
  )
}

export default connect(null, {
  dispatchAddCard
})(AddCard)

const Wrapper = styled.div`
  width: 360px;
  padding: 16px 8px;
  background-color: ${Color.GRAY};
  text-align: right;
`

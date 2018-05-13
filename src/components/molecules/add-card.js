// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import type { Dispatch } from 'redux'
import styled from 'styled-components'
import { AddButton } from '../atoms/button'
import { addCard, incrementCardAmount } from '../../redux/modules/tasks'
import Const from '../../const'
const { Color } = Const

type Props = {
  listId: number,
  addCard: (listId: number) => void,
  incrementCardAmount: () => void
}

function AddCard(props: Props) {
  function onClick(e) {
    props.incrementCardAmount()
    props.addCard(props.listId)
  }

  console.log(props)
  return (
    <Wrapper>
      <AddButton onClick={(e) => { onClick(e) }}>
        カードを追加する
      </AddButton>
    </Wrapper>
  )
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    addCard: (listId) => dispatch(addCard(listId)),
    incrementCardAmount: () => dispatch(incrementCardAmount())
  }
}

export default connect(null, mapDispatchToProps)(AddCard)

const Wrapper = styled.div`
  width: 360px;
  padding: 16px 8px;
  background-color: ${Color.GRAY};
  text-align: right;
`

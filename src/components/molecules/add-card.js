// @flow
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { AddButton } from '../atoms/button'
import { dispatchAddCard } from '../../redux/modules/tasks'
import Const from '../../const'
const { Color } = Const

type Props = {
  listId: number,
  dispatchAddCard: (listId: number) => void
}

function AddCard (props: Props) {
  function onClick () {
    props.dispatchAddCard(props.listId)
  }

  return (
    <Wrapper>
      <AddButton onClick={() => { onClick() }}>
        カードを追加する
      </AddButton>
    </Wrapper>
  )
}

export default connect(null, {
  dispatchAddCard
})(AddCard)

const Wrapper = styled.div`
  position: relative;
  width: 360px;
  padding: 16px 8px;
  background: linear-gradient(${Color.WHITE_ALPHA50}, ${Color.GRAY});
  border-radius: 0 0 8px 8px;
`

// @flow
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { AddButton } from '../atoms/button'
import { dispatchAddList } from '../../redux/modules/tasks'
import Const from '../../const'
const { Color } = Const

type Props = {
  dispatchAddList: () => void
}

function AddList (props: Props) {
  function onClick () {
    props.dispatchAddList()
  }
  return (
    <Wrapper>
      <AddButton onClick={() => onClick()}>
        リストを追加する
      </AddButton>
    </Wrapper>
  )
}

export default connect(null, {
  dispatchAddList
})(AddList)

const Wrapper = styled.div`
  display: block;
  width: 360px;
  height: 36px;
  padding: 8px;
  background: ${Color.GRAY};
`

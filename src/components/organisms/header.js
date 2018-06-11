// @flow
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { disPatchIsOpenTimeline } from '../../redux/modules/ui'
import Const from '../../const'
const { Color } = Const

type Props = {
  disPatchIsOpenTimeline: (isOpen:boolean) => void
}

const Header = (props:Props) => (
  <Wrapper>
    <Mole src='/mole.png' alt='mole' />
    <List><img src='/milestone.png' alt='NG' onClick={() => { props.disPatchIsOpenTimeline(true) }} /></List>
  </Wrapper>
)

export default connect(null, {
  disPatchIsOpenTimeline
})(Header)

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  padding: 6px 12px;
  background-color: ${Color.THICK_GREEN};
  box-shadow: 1px 3px 5px ${Color.GRAY_ALPHA20};
`

const Mole = styled.img`
  display: inline-block;
  height: 50%;
  line-height: 48px;
  margin: 0;
`

const List = styled.div`
  height: 50%;
  padding-left: 24px;

  > img {
    height: 100%;
    cursor: pointer;
  }
`

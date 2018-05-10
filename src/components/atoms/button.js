import React from 'react'
import styled from 'styled-components'

import Const from '../../const'
const { Color, Font } = Const

export const EditButton = props => {
  return (
    <Wrapper {...props}>
      <BtnPrimary>
        {props.children}
      </BtnPrimary>
    </Wrapper>
  )
}

export const AddButton = props => {
  return (
    <Wrapper {...props}>
      <BtnAdd>
        {props.children}
      </BtnAdd>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: block;
  text-align: right;
`

const BtnPrimary = styled.button`
  font-size: ${Font.SIZE.SMALL};
  font-weight: ${Font.WEIGHT.NORMAL};
  background-color: ${Color.WHITE};
  padding: .7em 1.6em;
  cursor: pointer;
  letter-spacing: .2em;
  border: 1px solid ${Color.THICK_GREEN};
  border-radius: 4px;
  transition: 0.2s;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, .2);

  &:hover {
    opacity: .8;
  }
`

const BtnAdd = styled.button`
  display: block;
  width: 100%;
  font-size: ${Font.SIZE.SMALL};
  font-weight: ${Font.WEIGHT.THIN};
  background-color: ${Color.THICK_GREEN};
  padding: .7em 1.6em;
  cursor: pointer;
  letter-spacing: .2em;
  color: ${Color.WHITE};
  border: none;
  border-radius: 4px;
  transition: 0.2s;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, .2);

  &:hover {
    opacity: .8;
  }
`

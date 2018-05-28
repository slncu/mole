// @flow
import React from 'react'
import styled from 'styled-components'
import Const from '../../const'
const { Color, Font } = Const

type Props = {
  children: string
}

export const EditButton = (props: Props) => {
  return (
    <Wrapper {...props}>
      <BtnPrimary>
        {props.children}
      </BtnPrimary>
    </Wrapper>
  )
}

export const AddButton = (props: Props) => {
  return (
    <Wrapper {...props}>
      <BtnAdd>
        {props.children}
      </BtnAdd>
    </Wrapper>
  )
}

export const UpdateButton = (props: Props) => {
  return (
    <Wrapper {...props}>
      <BtnUpdate>
        {props.children}
      </BtnUpdate>
    </Wrapper>
  )
}

export const CancelButton = (props: Props) => {
  return (
    <Wrapper {...props}>
      <BtnSecondary>
        {props.children}
      </BtnSecondary>
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
  width: 360px;
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

const BtnUpdate = styled.button`
  font-size: ${Font.SIZE.SMALL};
  font-weight: ${Font.WEIGHT.THIN};
  background-color: ${Color.THICK_GREEN};
  padding: .7em 1.6em;
  cursor: pointer;
  letter-spacing: .2em;
  color: ${Color.WHITE};
  border-radius: 4px;
  transition: 0.2s;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, .2);

  &:hover {
    opacity: .8;
  }
`

const BtnSecondary = styled.button`
  font-size: ${Font.SIZE.SMALL};
  font-weight: ${Font.WEIGHT.NORMAL};
  background-color: ${Color.WHITE};
  padding: .7em 1.6em;
  cursor: pointer;
  letter-spacing: .2em;
  color: ${Color.BLACK};
  border-radius: 4px;
  transition: 0.2s;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, .2);

  &:hover {
    opacity: .8;
  }
`

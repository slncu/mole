// @flow
import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import Const from '../../const'
const { Font } = Const
const today = moment().format('YYYY/MM/DD')

type Props = {
  label?: string,
  value: string,
  isReadOnly: boolean,
  width: string,
  onClick: (e: any) => void
}

export const Input = (props: Props) => (
  <Wrapper>
    <Label>{props.label}</Label>
    <Content
      onClick={props.onClick}
      value={props.value || today}
      readOnly={!!props.isReadOnly}
    />
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width ? props.width : '130'}px
`

const Label = styled.div`
  display: block;
  font-weight: ${Font.WEIGHT.NORMAL};
`

const Content = styled.input`
  min-height: 36px;
  border: 1px solid #DDD;
  border-radius: 4px;
  font-size: ${Font.SIZE.MEDIUM};
  cursor: pointer;
`

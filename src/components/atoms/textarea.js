// @flow
import React from 'react'
import styled from 'styled-components'
import Const from '../../const'
const { Color, Font } = Const

type Props = {
  label?: string,
  name: string,
  defaultValue: string,
  placeholder: string,
  onChange: (e: any) => void
}

export const Textarea = (props:Props) => {
  return (
    <Wrapper>
      <Label>{props.label}</Label>
      <Content
        onChange={props.onChange}
        name={props.name}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.div`
  display: block;
  font-weight: ${Font.WEIGHT.NORMAL};
`

const Content = styled.textarea`
  min-height: 150px;
  width: 100%;
  border: 1px solid #DDD;
  border-radius: 4px;
  resize: none;
  font-size: ${Font.SIZE.MEDIUM_LARGE};

  &::placeholder {
    color: ${Color.GRAY};
    font-size: ${Font.SIZE.SMALL};
    font-style: italic;
  }
`

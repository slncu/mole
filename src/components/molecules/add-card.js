import React, { Component } from 'react';
import styled from 'styled-components';

import { AddButton } from '../atoms/button';

import Const from '../../const';
const { Color } = Const;

export default class AddCard extends Component {
  onClickAddCard() {
    const { listId } = this.props;
    const newObj = [{
      id: '',
      title: '',
      content: ''
    }];
  }

  render() {
    return (
      <Wrapper>
        <AddButton onClick={ () => { this.onClickAddCard()}}>
          カードを追加する
        </AddButton>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  width: 360px;
  padding: 16px 8px;
  background-color: ${Color.GRAY};
  text-align: right;
`;
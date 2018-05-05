import React, { Component } from 'react';
import styled from 'styled-components';

import { AddButton } from '../atoms/button';

import Const from '../../const';
const { Color } = Const;

export default class AddCard extends Component {
  onClickAddCard(e) {
    e.preventDefault();
    const newObj = [{
      id: this.props.tasks.items.length + 1,
      title: '',
      content: ''
    }];

    this.props.addItem();
    this.props.setEditItem(newObj);
    this.props.setEditTask();
  }

  render() {
    return (
      <Wrapper>
        <AddButton onClick={ e => { this.onClickAddCard(e)}}>
          カードを追加する
        </AddButton>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  width: 250px;
  padding: 0 8px 16px;
  background-color: ${Color.GRAY};
  text-align: right;
`;
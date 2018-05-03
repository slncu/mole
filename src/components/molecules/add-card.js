import React, { Component } from 'react';

export default class AddCard extends Component {
  onClickAddCard(e) {
    e.preventDefault();
    console.log(this.props.tasks.items.length)
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
      <div>
        <button onClick={ e => { this.onClickAddCard(e)}}>
          カードを追加する
        </button>
      </div>
    )
  }
}
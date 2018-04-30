import React, { Component } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')

export default class EditModal extends Component {
  constructor() {
    super();

    this.onClose = this.onClose.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.getEditItem = this.getEditItem.bind(this);
  }

  onClose() {
    this.props.clearEditTask();
  }

  onConfirm() {

  }

  getEditItem() {
    const { title, content } = this.props.tasks.editItem[0];
    console.log(this.props.tasks.editItem[0]);
    return(
      <div>
        <div>{title}</div>
        <div>{content}</div>
      </div>
    )
  }

  render() {
    const { isEditable } = this.props.tasks;
    return (
      <div>
        <Modal
          isOpen={isEditable}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
          <button onClick={this.onClose}>close</button>
          { this.props.tasks.editItem[0] && this.getEditItem() }
        </Modal>
      </div>
    );
  }
}
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
  }

  onClose() {
    this.props.clearEditTask();
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
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </Modal>
      </div>
    );
  }
}
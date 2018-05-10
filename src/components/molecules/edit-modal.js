import React, { Component } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');

export default class EditModal extends Component {
  constructor () {
    super();

    this.onClose = this.onClose.bind(this);
    this.getEditItem = this.getEditItem.bind(this);
  }

  onClose () {
  }

  onUpdateItem (obj) {
  }

  getEditItem () {
    const { id, title, content } = this.props.tasks.editItem[0];
    const obj = { id, title, content };

    return (
      <div>
        <input type='hidden' name='id' defaultValue={id} />
        <input onChange={e => (obj.title = e.target.value)} type='text' name='title' defaultValue={title} />
        <input onChange={e => (obj.content = e.target.value)} type='text' name='content' defaultValue={content} />
        <button onClick={this.onClose}>閉じる</button>
        <button onClick={() => { this.onUpdateItem(obj); }}>更新</button>
      </div>
    );
  }

  render () {
    const { isEditable } = this.props.tasks;
    return (
      <div>
        <Modal
          isOpen={isEditable}
          style={customStyles}
          contentLabel='Example Modal'
        >
          { this.props.tasks.editItem[0] && this.getEditItem() }
        </Modal>
      </div>
    );
  }
}

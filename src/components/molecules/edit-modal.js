// @flow

import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { dispatchEditCard } from '../../redux/modules/tasks'

type Item = {
  id: number,
  content: string
}

type Props = {
  editItem: Item,
  isEditable: boolean,
  dispatchEditCard: boolean => void
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

Modal.setAppElement('#root')

class EditModal extends Component<Props> {
  onClose: Function
  getEditItem: Function

  constructor () {
    super()

    this.onClose = this.onClose.bind(this)
    this.getEditItem = this.getEditItem.bind(this)
  }

  onClose () {
    this.props.dispatchEditCard(false)
  }

  onUpdateItem (obj: Item) {
    this.props.dispatchEditCard(false)
  }

  getEditItem () {
    const { id, content } = this.props.editItem
    const obj = { id, content }

    return (
      <WrapperModal>
        <input type='hidden' name='id' defaultValue={id} />
        <input onChange={e => (obj.content = e.target.value)} type='text' name='content' defaultValue={content} />
        <button onClick={this.onClose}>閉じる</button>
        <button onClick={() => { this.onUpdateItem(obj) }}>更新</button>
      </WrapperModal>
    )
  }

  render () {
    const { isEditable } = this.props
    return (
      <div>
        <Modal
          isOpen={isEditable}
          style={customStyles}
          contentLabel='Example Modal'
        >
          { this.props.editItem && this.getEditItem() }
        </Modal>
      </div>
    )
  }
}

export default connect(null, {
  dispatchEditCard
})(EditModal)

const WrapperModal = styled.div`
  width: 350px;
  height: 350px;
`

// @flow

import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import Calendar from './calendar'
import { dispatchEditCard,
         dispatchUpdateEditCard,
         dispatchSetDeadEnd } from '../../redux/modules/tasks'
import { dispatchIsOpenCalendar, 
         isOpenCalendar } from '../../redux/modules/ui'

type Item = {
  id: number,
  content: string,
  startTime: string,
  endTime: string
}

type Props = {
  editItem: Item,
  isEditable: boolean,
  isOpenCalendar: boolean,
  dispatchEditCard: boolean => void,
  dispatchUpdateEditCard: Item => void,
  dispatchIsOpenCalendar: boolean => void,
  dispatchSetDeadEnd: string => void
}

type State = {
  typeOfDate: string
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

class EditModal extends Component<Props, State> {
  onClose: Function
  getEditItem: Function
  state: State

  constructor () {
    super()

    this.onClose = this.onClose.bind(this)
    this.getEditItem = this.getEditItem.bind(this)
    this.state = this.getInitialState()
  }

  getInitialState() {
    return { typeOfDate: ''}
  }

  onClose () {
    this.props.dispatchEditCard(false)
  }

  onUpdateItem (obj: Item) {
    this.props.dispatchEditCard(false)
    this.props.dispatchUpdateEditCard(obj)
  }

  onSetDate(e, type) {
    this.setState({ typeOfDate: type })
    this.props.dispatchIsOpenCalendar(true)
  }

  getEditItem () {
    const { id, content, startTime, endTime } = this.props.editItem
    const obj = { id, content, startTime: this.props.editItem.startTime, endTime: this.props.editItem.endTime }

    return (
      <WrapperModal>
        { this.props.isOpenCalendar && <Calendar typeOfDate={this.state.typeOfDate} dispatchIsOpenCalendar={this.props.dispatchIsOpenCalendar} dispatchSetDeadEnd={this.props.dispatchSetDeadEnd} />}
        <input type='hidden' name='id' defaultValue={id} />
        <input onChange={e => (obj.content = e.target.value)} type='text' name='content' defaultValue={content} />
        <p onClick={ (e) => { this.onSetDate(e, 'start') } }>{startTime || 'start'}</p>
        <p onClick={ (e) => { this.onSetDate(e, 'end') } }>{endTime || 'end'}</p>
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
  dispatchEditCard,
  dispatchUpdateEditCard,
  dispatchIsOpenCalendar,
  dispatchSetDeadEnd
})(EditModal)

const WrapperModal = styled.div`
  width: 500px;
  height: 500px;
`

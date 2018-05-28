// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { UpdateButton, CancelButton } from '../atoms/button'
import { Textarea } from '../atoms/textarea'
import { Input } from '../atoms/input'
import Calendar from './calendar'
import { dispatchEditCard,
  dispatchUpdateEditCard,
  dispatchSetDeadEnd } from '../../redux/modules/tasks'
import { dispatchIsOpenCalendar } from '../../redux/modules/ui'
import Const from '../../const'
const { Font, Color } = Const

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
    transform: 'translate(-50%, -50%)',
    background: `${Color.THICK_WHITE}`,
    overflow: 'visible'
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

  getInitialState () {
    return { typeOfDate: '' }
  }

  onClose () {
    this.props.dispatchEditCard(false)
  }

  onUpdateItem (obj: Item) {
    this.props.dispatchEditCard(false)
    this.props.dispatchUpdateEditCard(obj)
  }

  onSetDate (e, type) {
    this.setState({ typeOfDate: type })
    this.props.dispatchIsOpenCalendar(true)
  }

  getEditItem () {
    const { id, content, startTime, endTime } = this.props.editItem
    const obj = { id, content, startTime: this.props.editItem.startTime, endTime: this.props.editItem.endTime }

    return (
      <WrapperModal>
        { this.props.isOpenCalendar && 
          <Calendar 
            typeOfDate={this.state.typeOfDate} 
            dispatchIsOpenCalendar={this.props.dispatchIsOpenCalendar} 
            dispatchSetDeadEnd={this.props.dispatchSetDeadEnd} 
            editItem={this.props.editItem} />}
        <input type='hidden' name='id' defaultValue={id} />
        <Textarea 
          onChange={ e => obj.content = e.target.value } 
          label='詳細'
          name='content' 
          defaultValue={content}
          placeholder='ここにタスクの内容を追加します' />
        <Terms>
          <Input 
            onClick={(e) => { this.onSetDate(e, 'start') }}
            label='期限'
            value={startTime}
            width='130'
            isReadOnly />
          <span>~</span>
          <Input 
            onClick={(e) => { this.onSetDate(e, 'end') }} 
            value={endTime}
            width='130'
            isReadOnly />
        </Terms>
        <WrapperButtons>
          <CancelButton onClick={this.onClose}>閉じる</CancelButton>
          <UpdateButton onClick={() => { this.onUpdateItem(obj) }}>更新</UpdateButton>
        </WrapperButtons>
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
  height: 320px;
`

const WrapperButtons = styled.div`
  display: flex;
  justify-content: flex-end;

  > div + div {
    margin-left: 16px;
  }
`

const Terms = styled.div`
  display: flex;
  align-items: flex-end;
  margin: 20px 0;

  > span {
    display: block;
    padding: 0 8px;
    min-height: 32px;
  }
`
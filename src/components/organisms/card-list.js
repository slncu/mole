// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import AddCard from '../molecules/add-card'
import EditModal from '../molecules/edit-modal'
import { EditButton } from '../atoms/button'
import Const from '../../const'
import { dispatchSortCard,
  dispatchEditCard,
  dispatchSetEditCard,
  dispatchDeleteCard,
  dispatchDeleteList } from '../../redux/modules/tasks'
import type { Tasks } from '../../redux/modules/tasks'
import type { Ui } from '../../redux/modules/ui'

const { Color, Font } = Const

type Item = {
  id: number,
  content: string,
  startTime: string,
  endTime: string
}

type List = {
  id: number,
  items: Array<Item>
}

type Props = {
  tasks: Tasks,
  ui: Ui,
  dispatchSortCard: (Array<List>) => void,
  dispatchEditCard: (boolean) => void,
  dispatchSetEditCard: (number) => void,
  dispatchDeleteCard: (number, number) => void,
  dispatchDeleteList: (number) => void
}

const getArrayMap = str => {
  return parseInt(str.slice(-1), 10) - 1
}

class CardList extends Component<Props> {
  grid: number;
  getItemStyle: Function;
  onDragEnd: Function;
  onClickEdit: Function;

  constructor (props: Props) {
    super(props)

    this.grid = 8
    this.getItemStyle = this.getItemStyle.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
    this.onClickEdit = this.onClickEdit.bind(this)
  }

  getItemStyle (isDragging: boolean, draggableStyle: Object) {
    return {
      position: 'relative',
      userSelect: 'none',
      padding: `${this.grid * 2}px`,
      margin: `0 0 ${this.grid * 1.6}px`,
      background: `${Color.WHITE}`,
      border: `${isDragging ? '2px solid ' + Color.THICK_GREEN : '1px solid ' + Color.THICK_WHITE}`,
      borderRadius: '4px',
      boxShadow: '1px 3px 5px rgba(0, 0, 0, .2)',
      width: '100%',
      overflow: 'auto',
      textOverflow: 'ellipsis',
      boxSizing: 'border-box',
      ...draggableStyle
    }
  }

  getListStyle () {
    return {
      background: `${Color.GRAY}`,
      padding: this.grid,
      width: 360
    }
  }

  getTaskInfo () {
    const { lists } = this.props.tasks
    return lists.map(list => (list))
  }

  onMoveListToList (ary, result) {
    const cloneAry = Array.from(ary)
    const { destination, source } = result
    const srcMap = getArrayMap(source.droppableId)
    const destMap = getArrayMap(destination.droppableId)
    const [removed] = cloneAry[srcMap].items.splice(source.index, 1)
    cloneAry[destMap].items.splice(destination.index, 0, removed)
    console.log(cloneAry)
    this.props.dispatchSortCard(cloneAry)
  }

  onDragEnd (result) {
    if (!result.destination) return
    const lists = Array.from(this.getTaskInfo())
    this.onMoveListToList(lists, result)
  }

  onClickEdit (e, id: number) {
    this.props.dispatchSetEditCard(id)
    this.props.dispatchEditCard(true)
  }

  render () {
    const { lists, editItem, isEditable } = this.props.tasks
    const { isOpenCalendar } = this.props.ui
    return (
      <Wrapper>
        <EditModal isEditable={isEditable} editItem={editItem} isOpenCalendar={isOpenCalendar} />
        <DragDropContext onDragEnd={this.onDragEnd}>
          { lists.map((list, index) => (
            <ListWrapper key={list.id}>
              <ListLabel>
                <span>{list.name || `リスト${list.id}`}</span>
                <img src='/ng.svg' alt='NG' onClick={(e, listId, itemId) => { this.props.dispatchDeleteList(list.id) }} width='20px' />
              </ListLabel>
              <ContentCard>
                <Droppable droppableId={`droppableCard-${list.id}`}>
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} style={this.getListStyle()}>
                      { list.items.map((item, itemIndex) => (
                        <Draggable key={item.id} draggableId={item.id} index={itemIndex}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                              style={this.getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                            >
                              {item.content || '新しいカード' }
                              <SubContents>
                                <Deadend>
                                  { item.endTime && <img src='/times.svg' alt='時間' />}
                                  { item.endTime && <span>{item.endTime}まで</span>}
                                </Deadend>
                                <ImgWrapper onClick={(e, listId, itemId) => { this.props.dispatchDeleteCard(list.id, item.id) }}><img src='/dustbox.svg' alt='ゴミ箱' width='30px' /></ImgWrapper>
                                <EditButton onClick={(e, id) => { this.onClickEdit(e, item.id) }}>編集する</EditButton>
                              </SubContents>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </ContentCard>
              <AddCard listId={list.id} />
            </ListWrapper>
          ))}
        </DragDropContext>
      </Wrapper>
    )
  }
}

function mapStateToProps (state) {
  return {
    tasks: state.tasks,
    ui: state.ui
  }
}

export default connect(mapStateToProps, {
  dispatchSortCard,
  dispatchEditCard,
  dispatchSetEditCard,
  dispatchDeleteCard,
  dispatchDeleteList
})(CardList)

const ContentCard = styled.div`
  width: 376px;
  max-height: 100%;
  box-sizing: content-box;
  border-radius: 8px;
  overflow: scroll;
`

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items:flex-start;
  align-content:flex-start;
`

const ListLabel = styled.div`
  display: flex;
  padding: 8px;
  align-items: center;
  justify-content: space-between;

  > span {
    display: block;
  }

  > img {
    display: block;
    cursor: pointer;
  }
`

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 376px;
  max-height: 100%;
  box-shadow: 1px 3px 5px ${Color.GRAY_ALPHA20};
  border-radius: 8px;
  background: ${Color.GRAY};
  margin: 0 8px;
`

const SubContents = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 8px;
`

const ImgWrapper = styled.div`
  display: inline-block;
  padding: 0 12px;
  cursor: pointer;

  img {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: .5em;
    vertical-align: bottom;
  }
`

/** TODO Fix to isDeadend props */
const Deadend = styled.div`
  display: block;
  font-size: ${Font.SIZE.SMALL};
  font-weight: ${Font.WEIGHT.NORMAL};
  border-radius: 4px;
  background-color: ${props => props.isDeadend ? Color.RED : ''};
  flex: 2;

  img {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: .5em;
    vertical-align: bottom;
  }
`

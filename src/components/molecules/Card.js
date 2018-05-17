// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import AddCard from './add-card'
import { EditButton } from '../atoms/button'
import Const from '../../const'
import { dispatchSortCard } from '../../redux/modules/tasks'
import type { Tasks } from '../../redux/modules/tasks'
import type { Dispatch } from 'redux'
const { Color, Font } = Const

type Item = {
  id: number,
  content: string
}

type List = {
  id: number,
  items: Array<Item>
}

type Props = {
  tasks: Tasks,
  dispatchSortCard: Array<List> => void
}

const getArrayMap = str => {
  return parseInt(str.slice(-1), 10) - 1
}

class Card extends Component<Props> {
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

  getItemStyle(isDragging: boolean, draggableStyle: Object) {
    return {
      position: 'relative',
      userSelect: 'none',
      padding: `${this.grid * 2}px`,
      margin: `0 0 ${this.grid}px`,
      background: `${Color.WHITE}`,
      border: `${isDragging ? '2px solid ' + Color.THICK_GREEN : '1px solid ' + Color.GRAY}`,
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

  /**
   * タスクカードの情報を取得する
   */
  getTaskInfo () {
    const { lists } = this.props.tasks
    return lists.map(list => (list))
  }

  // source, destination, droppableSource, droppableDestination
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

  /**
   * ドラッグ終了後の制御
   */
  onDragEnd (result) {
    if (!result.destination) return
    const lists = Array.from(this.getTaskInfo())
    this.onMoveListToList(lists,result)
  }

  /**
   * 編集モードのon/off
   */
  onClickEdit (e) {
    e.preventDefault()
    // const { items } = this.props.tasks;
    // const editItem = items.filter(item => (item.id === parseInt(e.currentTarget.id, 10)));
    // const { lists } = this.props.tasks
    // const editItem = lists.map(list => (list.items).filter(item => {
    //   return item.id === parseInt(e.currentTarget.id, 10)
    // }))
  }

  render () {
    const { lists } = this.props.tasks

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        { lists.map((list, index) => (
          <ListWrapper key={list.id} >
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
                            {item.content}
                            <SubContents>
                              <Deadend>
                                <img src='/times.svg' />
                                <span>5/6 13:00まで</span>
                              </Deadend>
                              <EditButton id={item.id} onClick={e => this.onClickEdit(e)}>編集する</EditButton>
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
    )
  }
}

export default connect(((tasks) => (tasks: Tasks)), {
  dispatchSortCard
})(Card)

const ContentCard = styled.div`
  width: 376px;
  min-height: 0;
  box-sizing: content-box;
  overflow: scroll;
`

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 368px;
  float: left;
  height: 100%;
`

const SubContents = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 8px;
`

/** TODO Fix to isDeadend props */
const Deadend = styled.div`
  display: block;
  padding: 8px;
  font-size: ${Font.SIZE.SMALL};
  font-weight: ${Font.WEIGHT.NORMAL};
  border-radius: 4px;
  background-color: ${props => props.isDeadend ? Color.RED : ''};

  img {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: .5em;
    vertical-align: bottom;
  }
`

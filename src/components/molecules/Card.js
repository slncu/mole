import React, { Component } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { EditButton } from '../atoms/button';
import Const from '../../const';
const { Color, Font } = Const; 

export default class Card extends Component {
  constructor (props) {
    super(props);

    this.grid = 8;
    this.getItemStyle = this.getItemStyle.bind(this);
    this.reorder = this.reorder.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
  }

  getItemStyle (isDragging, draggableStyle) {
    return {
      position: 'relative',
      userSelect: 'none',
      padding: `${this.grid * 2}px`,
      margin: `0 0 ${this.grid}px`,
      background: `${ Color.WHITE }`,
      border: `${ isDragging ? '2px solid ' + Color.THICK_GREEN : '1px solid ' + Color.GRAY }`,
      borderRadius: '4px',
      boxShadow: '1px 3px 5px rgba(0, 0, 0, .2)',
      width: '100%',
      overflow: 'auto',
      textOverflow: 'ellipsis',
      boxSizing: 'border-box',
      ...draggableStyle
    };
  }

  getListStyle (isDraggingOver) {
    return {
      background: `${ Color.GRAY }`,
      padding: this.grid,
      width: 360,
    };
  }

  /**
   * タスクカードの順番を制御
   */
  reorder (list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    this.props.sortListItems(result);
  }

  /**
   * ドラッグ終了後の制御
   */
  onDragEnd (result) {
    const { items } = this.props.tasks;

    if (!result.destination) {
      return;
    }

    this.reorder(
      items,
      result.source.index,
      result.destination.index
    );
  }

  /**
   * 編集モードのon/off
   */
  onClickEdit (e) {
    e.preventDefault();
    const { items } = this.props.tasks;
    const editItem = items.filter(item => (item.id === parseInt(e.currentTarget.id, 10)));

    this.props.setEditItem(editItem);
    this.props.setEditTask();
  }

  render () {
    const { items } = this.props.tasks;

    return (
      <Wrapper>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div>
            <Droppable droppableId='droppableCard'>
              {(provided, snapshot) => (
                <div ref={provided.innerRef} style={this.getListStyle(snapshot.isDraggingOver)}>
                  {items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                          style={this.getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                        >
                          {item.title}
                          <SubContents>
                            <Deadend>
                              <img src="/times.svg" />
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
          </div>
        </DragDropContext>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  width: 376px;
  min-height: 0;
  box-sizing: content-box;
  overflow: scroll;
`;

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
  font-size: ${ Font.SIZE.SMALL };
  font-weight: ${ Font.WEIGHT.NORMAL };
  border-radius: 4px;
  background-color: ${ props => props.isDeadend ? Color.RED : ''};

  img {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: .5em;
    vertical-align: bottom;
  }
`

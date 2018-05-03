import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { ButtonEdit } from '../atoms/button';

export default class DraggableCard extends Component {
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
      border: `1px solid ${isDragging ? 'lightgreen' : 'grey'}`,
      ...draggableStyle
    };
  }

  getListStyle (isDraggingOver) {
    return {
      background: `${isDraggingOver ? 'lightblue' : 'lightgrey'}`,
      padding: this.grid,
      width: 250
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
                        {item.content}
                        <ButtonEdit id={item.id} onClick={e => this.onClickEdit(e)}>編集する</ButtonEdit>
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
    );
  }
}

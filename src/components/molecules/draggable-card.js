import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { sortListItems } from '../../redux/modules/tasks'

class DraggableCard extends Component {
  constructor(props) {
    super(props);

    this.grid = 8;
    this.getItemStyle = this.getItemStyle.bind(this);
    this.reorder = this.reorder.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  getItemStyle(isDragging, draggableStyle) {
    return {
      userSelect: 'none',
      padding: `${this.grid * 2 }px`,
      margin: `0 0 ${this.grid}px`,
      border: `1px solid ${isDragging ? 'lightgreen' : 'grey'}`,
      ...draggableStyle
    }
  }

  getListStyle (isDraggingOver) {
    return {
      background: `${isDraggingOver ? 'lightblue' : 'lightgrey'}`,
      padding: this.grid,
      width: 250
    }
  };

  /**
   * タスクカードの順番を制御
   * @param {Array} list 
   * @param {Integer} startIndex 
   * @param {Integer} endIndex 
   */
  reorder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    console.log(result);
    this.props.sortListItems(result);
  }

  /**
   * ドラッグ終了後の制御
   */
  onDragEnd(result) {
    const { items } = this.props.tasks;

    if (!result.destination) {
      return;
    }

    this.reorder(
      items,
      result.source.index,
      result.destination.index
    );

    // const items = this.reorder(
    //   items,
    //   result.source.index,
    //   result.destination.index
    // );

    // this.setState({
    //   items,
    // });
  }

  render() {
    const { items } = this.props.tasks;

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div>
          <Droppable droppableId="droppableCard">
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

function mapStateToProps (state) {
  return {
    tasks: state.tasks
  }
}

function mapDispatchToProps (dispatch) {
  return {
    sortListItems: (array) => dispatch(sortListItems(array))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DraggableCard);

const Wrapper = styled.div`
  padding: 40px;
`;
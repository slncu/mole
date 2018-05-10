import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AddCard from './add-card';
import { EditButton } from '../atoms/button';
import Const from '../../const';
import {
  addItem,
  sortListItems,
  setEditTask,
  setEditedItem,
  clearEditTask,
  setEditItem
} from '../../redux/modules/tasks';
const { Color, Font } = Const;

const getArrayMap = str => {
  return str.slice(-1);
}

class Card extends Component {
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
   * タスクカードの情報を取得する
   */
  getTaskInfo() {
    const { lists } = this.props.tasks;
    return lists.map(list => ( list ));
  }

  /**
   * タスクカードの順番を制御
   */
  reorder (list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
    this.props.sortListItems(result);
  }

  // source, destination, droppableSource, droppableDestination
  onMoveListToList(ary, result) {
    let sortedItem;
    const cloneAry = Array.from(ary);
    const { draggableId, destination, source } = result;
    const srcMap = getArrayMap(source.droppableId);
    const destMap = getArrayMap(destination.droppableId);
    const [removed] = cloneAry[srcMap].items.splice(source.index, 1);
    const hoge = cloneAry[destMap].items.splice(destination.index, 0, removed);
  }

  /**
   * ドラッグ終了後の制御
   */
  onDragEnd (result) {
    if (!result.destination) return;
    const lists = Array.from(this.getTaskInfo());
    const sortedItem = this.onMoveListToList(
      lists,
      result
    );
  }

  /**
   * 編集モードのon/off
   */
  onClickEdit (e) {
    e.preventDefault();
    // const { items } = this.props.tasks;
    // const editItem = items.filter(item => (item.id === parseInt(e.currentTarget.id, 10)));
    const { lists } = this.props.tasks;
    const editItem = lists.map(list => ( list.items ).filter(item => {
      return item.id === parseInt(e.currentTarget.id, 10) 
    }));
  }

  render () {

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        { lists.map((list, listnum) => (
            <ListWrapper key={list.listId} >
              <ContentCard>
                <Droppable droppableId={`droppableCard-${list.listId}`}>
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} style={this.getListStyle(snapshot.isDraggingOver)}>
                      { list.items.map((item, itemnum) => (
                        <Draggable key={item.id} draggableId={item.id} index={itemnum}>
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
              </ContentCard>
              <AddCard listId={list.listId} addItem={this.props.addItem}/>
            </ListWrapper>
        ))}
      </DragDropContext>
    );
  }
}


export default Card;

const ContentCard = styled.div`
  width: 376px;
  min-height: 0;
  box-sizing: content-box;
  overflow: scroll;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 368px;
  float: left;
  height: 100%;
`;

const List = styled.div`
  display: flex;
  height: 100%;
  max-height: 100%;
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

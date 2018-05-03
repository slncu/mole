import React, { Component } from 'react';
import { connect } from 'react-redux';

import EditModal from '../molecules/edit-modal';
import DraggableCard from '../molecules/draggable-card';
import AddCard from '../molecules/add-card';

import {
  addItem,
  sortListItems,
  setEditTask,
  setEditedItem,
  clearEditTask,
  setEditItem
} from '../../redux/modules/tasks';

class TaskListPage extends Component {
  render () {
    // console.log(this);
    return (
      <div>
        <EditModal {...this.props} />
        <DraggableCard {...this.props} />
        <AddCard {...this.props} />
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    tasks: state.tasks
  };
}

function mapDispatchToProps (dispatch) {
  return {
    addItem: () => dispatch(addItem()),
    sortListItems: array => dispatch(sortListItems(array)),
    setEditItem: obj => dispatch(setEditItem(obj)),
    setEditedItem: obj => dispatch(setEditedItem(obj)),
    setEditTask: () => dispatch(setEditTask()),
    clearEditTask: () => dispatch(clearEditTask())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskListPage);

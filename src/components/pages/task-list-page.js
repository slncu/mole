import React, { Component } from 'react';
import { connect } from 'react-redux';

import EditModal from '../molecules/edit-modal';
import DraggableCard from '../molecules/draggable-card';

import { sortListItems, setEditTask, clearEditTask } from '../../redux/modules/tasks';


class TaskListPage extends Component {
  render() {
    // console.log(this);
    return (
      <div>
        <EditModal {...this.props} />
        <DraggableCard {...this.props} />
      </div>
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
    sortListItems: array => dispatch(sortListItems(array)),
    setEditTask: () => dispatch(setEditTask()),
    clearEditTask: () => dispatch(clearEditTask())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskListPage);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import EditModal from '../molecules/edit-modal';
import Card from '../molecules/Card';

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
    return (
      <Contents>
        <EditModal {...this.props} />
        <Card />
      </Contents>
    );
  }
}

const Contents = styled.div`
  width: 100%;
  height: 100%;
`;

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

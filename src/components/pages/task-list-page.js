import React, { Component } from 'react';

import EditModal from '../molecules/edit-modal';
import DraggableCard from '../molecules/draggable-card';

export default class TaskListPage extends Component {
  render() {
    return (
      <div>
        <EditModal/>
        <DraggableCard />
      </div>
    );
  }
}
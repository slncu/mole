import React, { Component } from 'react';

import TaskListPage from './components/pages/task-list-page';


export default class App extends Component {
  render() {
    console.log(this);
    return (
      <TaskListPage />
    )
  }
}

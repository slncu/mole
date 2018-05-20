import { combineReducers } from 'redux'
import tasks from './modules/tasks'
import ui from './modules/ui'

const reducer = combineReducers({
  tasks,
  ui
})

export default reducer

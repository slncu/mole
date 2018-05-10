import { combineReducers } from 'redux'
import tasks from './modules/tasks'

const reducer = combineReducers({
  tasks
})

export default reducer

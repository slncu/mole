// @flow
import type { Dispatch } from 'redux'
import type { State } from '../'
import _ from 'lodash'
import moment from 'moment'

export type Item = {
  id: number,
  content: string,
  startTime: string,
  endTime: string
}

export type List = {
  id: number,
  name: string,
  items: Array<Item>
}

export type Tasks = {
  lists: Array<List>,
  editItem: Item,
  isEditable: boolean,
  cardAmount: number,
  listAmount: number
}

const initialState = {
  lists: [{
    id: 1,
    name: '',
    items: [{
      id: 1,
      content: '',
      startTime: '',
      endTime: ''
    }]
  }],
  editItem: {
    id: 1,
    content: '',
    startTime: '',
    endTime: ''
  },
  isEditable: false,
  cardAmount: 1,
  listAmount: 1
}

const INCREMENT_CARD_AMOUNT = 'tasks/INCREMENT_CARD_AMOUNT'
const DECREMENT_CARD_AMOUNT = 'tasks/DECREMENT_CARD_AMOUNT'
const INCREMENT_LIST_AMOUNT = 'tasks/INCREMENT_LIST_AMOUNT'
const DECREMENT_LIST_AMOUNT = 'tasks/DECREMENT_LIST_AMOUNT'
const ADD_CARD = 'tasks/ADD_CARD'
const SORT_CARD = 'tasks/SORT_CARD'
const IS_EDITABLE = 'tasks/IS_EDITABLE'
const SET_EDIT_CARD = 'tasks/SET_EDIT_CARD'
const UPDATE_EDIT_CARD = 'tasks/UPDATE_EDIT_CARD'
const SET_START_TIME = 'tasks/SET_START_TIME'
const SET_END_TIME = 'tasks/SET_END_TIME'
const ADD_LIST = 'tasks/ADD_LIST'

type IncrementCardAmount = { type: 'tasks/INCREMENT_CARD_AMOUNT' }

type DecrementCardAmount = { type: 'tasks/DECREMENT_CARD_AMOUNT' }

type IncrementListAmount = { type: 'tasks/INCREMENT_LIST_AMOUNT' }

type DecrementListAmount = { type: 'tasks/DECREMENT_LIST_AMOUNT' }

type AddCard = {
  type: 'tasks/ADD_CARD',
  payload: Array<List>
}

type SortCard = {
  type: 'tasks/SORT_CARD',
  payload: Array<List>
}

type IsEditable = {
  type: 'tasks/IS_EDITABLE',
  payload: boolean
}

type SetEditCard = {
  type: 'tasks/SET_EDIT_CARD',
  payload: Item
}

type UpdateEditCard = {
  type: 'tasks/UPDATE_EDIT_CARD',
  payload: Array<List>
}

type SetStartTime = {
  type: 'tasks/SET_START_TIME',
  payload: Item
}

type SetEndTime = {
  type: 'tasks/SET_END_TIME',
  payload: Item
}

type AddList = {
  type: 'tasks/ADD_LIST',
  payload: Array<List>
}

type Actions = IncrementCardAmount |
               DecrementCardAmount |
               IncrementListAmount |
               DecrementListAmount |
               AddCard |
               SetEditCard |
               SortCard |
               IsEditable |
               UpdateEditCard |
               SetStartTime |
               SetEndTime |
               AddList;

/**
 * The reducer
 */

export default (state: Tasks = initialState, action: Actions) => {
  switch (action.type) {
    case INCREMENT_CARD_AMOUNT:
      return { ...state, cardAmount: state.cardAmount + 1 }
    case DECREMENT_CARD_AMOUNT:
      return Object.assign({}, state, { cardAmount: state.listAmount - 1 })
    case INCREMENT_LIST_AMOUNT:
      return { ...state, listAmount: state.cardAmount + 1 }
    case DECREMENT_LIST_AMOUNT:
      return Object.assign({}, state, { listAmount: state.listAmount - 1 })
    case ADD_CARD:
      return Object.assign({}, state, { lists: action.payload })
    case SET_EDIT_CARD:
      return Object.assign({}, state, { editItem: action.payload })
    case SORT_CARD:
      return Object.assign({}, state, { lists: action.payload })
    case UPDATE_EDIT_CARD:
      return Object.assign({}, state, { lists: action.payload })
    case IS_EDITABLE:
      return { ...state, isEditable: action.payload }
    case SET_START_TIME:
      return Object.assign({}, state, { editItem: action.payload })
    case SET_END_TIME:
      return Object.assign({}, state, { editItem: action.payload })
    case ADD_LIST:
      return Object.assign({}, state, { lists: action.payload })
    default:
      return state
  }
}

export const incrementCardAmount = (): IncrementCardAmount => {
  return { type: 'tasks/INCREMENT_CARD_AMOUNT' }
}

export const decrementCardAmount = (): DecrementCardAmount => {
  return { type: 'tasks/DECREMENT_CARD_AMOUNT' }
}

export const incrementListAmount = (): IncrementListAmount => {
  return { type: 'tasks/INCREMENT_LIST_AMOUNT' }
}

export const decrementListAmount = (): DecrementListAmount => {
  return { type: 'tasks/DECREMENT_LIST_AMOUNT' }
}

export const addCard = (list: Array<List>): AddCard => {
  return {
    type: 'tasks/ADD_CARD',
    payload: list
  }
}

export const dispatchAddCard = (listId: number) => (dispatch: Dispatch, getState: () => State) => {
  dispatch(incrementCardAmount())

  const state = getState()
  const newList = _.cloneDeep(state.tasks.lists).map(list => {
    if (listId === list.id) {
      list.items.push({id: state.tasks.cardAmount, content: '', startTime: '', endTime: ''})
    }
    return list
  })
  dispatch(addCard(newList))
}

export const sortCard = (list: Array<List>) => {
  return {
    type: 'tasks/SORT_CARD',
    payload: list
  }
}

export const dispatchSortCard = (list: Array<List>) => (dispatch: Dispatch) => {
  dispatch(sortCard(list))
}

export const isEditable = (isEditable: boolean): IsEditable => {
  return {
    type: IS_EDITABLE,
    payload: isEditable
  }
}

export const setEditCard = (item: Item): SetEditCard => {
  return {
    type: SET_EDIT_CARD,
    payload: item
  }
}

export const dispatchSetEditCard = (id: number) => (dispatch: Dispatch, getState: () => State) => {
  console.log(id)
  const state = getState()
  let editItem = []
  _.cloneDeep(state.tasks.lists).forEach(list => (list.items.map(item => {
    if (item.id === id) {
      editItem.push(item)
    }
  })
  ))

  dispatch(setEditCard(editItem[0]))
}

export const dispatchEditCard = (isOpen: boolean) => (dispatch: Dispatch) => {
  dispatch(isEditable(isOpen))
}

export const updateEditCard = (lists: Array<List>): UpdateEditCard => {
  return {
    type: UPDATE_EDIT_CARD,
    payload: lists
  }
}

export const dispatchUpdateEditCard = (item: Item) => (dispatch: Dispatch, getState:() => State) => {
  const state = getState()
  console.log(item)
  const lists = _.cloneDeep(state.tasks.lists).map(list => {
    return {
      id: list.id,
      items: list.items.map(i => {
        if (i.id === item.id) {
          return item
        }
        return i
      })}
  })
  dispatch(updateEditCard(lists))
}

export const setStartTime = (obj: Item): SetStartTime => {
  return {
    type: 'tasks/SET_START_TIME',
    payload: obj
  }
}

export const setEndTime = (obj: Item): SetEndTime => {
  return {
    type: 'tasks/SET_END_TIME',
    payload: obj
  }
}

export const dispatchSetDeadEnd = (time: string, type: string) => (dispatch: Dispatch, getState: () => State) => {
  const state = getState()
  const obj = _.cloneDeep(state.tasks.editItem)
  if (type === 'start') {
    obj.startTime = moment(time).format('YYYY/MM/DD')
    dispatch(setStartTime(obj))
  } else {
    obj.endTime = moment(time).format('YYYY/MM/DD')
    dispatch(setEndTime(obj))
  }
}

export const addList = (lists:Array<List>) :AddList => {
  return {
    type: 'tasks/ADD_LIST',
    payload: lists
  }
}

export const dispatchAddList = () => (dispatch: Dispatch, getState: () => State) => {
  dispatch(incrementListAmount())
  dispatch(incrementCardAmount())

  const state = getState()
  let lists = _.cloneDeep(state.tasks.lists)

  lists.push({
    id: state.tasks.listAmount,
    name: '',
    items: [{
      id: state.tasks.cardAmount,
      content: '',
      startTime: '',
      endTime: ''
    }]
  })

  dispatch(addList(lists))
}

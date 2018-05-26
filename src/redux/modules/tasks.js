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
  cardId: number,
  listId: number
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
  cardId: 1,
  listId: 1
}

const INCREMENT_CARD_AMOUNT = 'tasks/INCREMENT_CARD_AMOUNT'
const INCREMENT_LIST_AMOUNT = 'tasks/INCREMENT_LIST_AMOUNT'
const ADD_CARD = 'tasks/ADD_CARD'
const SORT_CARD = 'tasks/SORT_CARD'
const IS_EDITABLE = 'tasks/IS_EDITABLE'
const SET_EDIT_CARD = 'tasks/SET_EDIT_CARD'
const UPDATE_EDIT_CARD = 'tasks/UPDATE_EDIT_CARD'
const SET_START_TIME = 'tasks/SET_START_TIME'
const SET_END_TIME = 'tasks/SET_END_TIME'
const ADD_LIST = 'tasks/ADD_LIST'
const DELETE_CARD = 'tasks/DELETE_CARD'
const DELETE_LIST = 'tasks/DELETE_LIST'

type IncrementCardId = { type: 'tasks/INCREMENT_CARD_AMOUNT' }

type IncrementListId = { type: 'tasks/INCREMENT_LIST_AMOUNT' }

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

type DeleteCard = {
  type: 'tasks/DELETE_CARD',
  payload: Array<List>
}

type DeleteList = {
  type: 'tasks/DELETE_LIST',
  payload: Array<List>
}

type Actions = IncrementCardId |
               IncrementListId |
               AddCard |
               SetEditCard |
               SortCard |
               IsEditable |
               UpdateEditCard |
               SetStartTime |
               SetEndTime |
               AddList |
               DeleteCard |
               DeleteList;

/**
 * The reducer
 */

export default (state: Tasks = initialState, action: Actions) => {
  switch (action.type) {
    case INCREMENT_CARD_AMOUNT:
      return { ...state, cardId: state.cardId + 1 }
    case INCREMENT_LIST_AMOUNT:
      return { ...state, listId: state.listId + 1 }
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
    case DELETE_CARD:
      return Object.assign({}, state, { lists: action.payload })
    case DELETE_LIST:
      return Object.assign({}, state, { lists: action.payload })
    default:
      return state
  }
}

export const incrementCardId = (): IncrementCardId => {
  return { type: 'tasks/INCREMENT_CARD_AMOUNT' }
}

export const incrementListId = (): IncrementListId => {
  return { type: 'tasks/INCREMENT_LIST_AMOUNT' }
}

export const addCard = (list: Array<List>): AddCard => {
  return {
    type: 'tasks/ADD_CARD',
    payload: list
  }
}

export const dispatchAddCard = (listId: number) => (dispatch: Dispatch, getState: () => State) => {
  dispatch(incrementCardId())

  const state = getState()
  const newList = _.cloneDeep(state.tasks.lists).map(list => {
    if (listId === list.id) {
      list.items.push({id: state.tasks.cardId, content: '', startTime: '', endTime: ''})
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
  const state = getState()
  let editItem = []
  _.cloneDeep(state.tasks.lists).forEach(list => (list.items.map(item => {
    if (item.id === id) { editItem.push(item) }
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
  dispatch(incrementListId())
  dispatch(incrementCardId())

  const state = getState()
  let lists = _.cloneDeep(state.tasks.lists)

  lists.push({
    id: state.tasks.listId,
    name: '',
    items: [{
      id: state.tasks.cardId,
      content: '',
      startTime: '',
      endTime: ''
    }]
  })

  dispatch(addList(lists))
}

export const deleteCard = (lists:Array<List>) :DeleteCard => {
  return {
    type: 'tasks/DELETE_CARD',
    payload: lists
  }
}

export const dispatchDeleteCard = (listId:number, cardId:number) => (dispatch:Dispatch, getState: () => State) => {
  const state = getState()
  const lists = _.cloneDeep(state.tasks.lists).map(list => {
    return {
      id: list.id,
      name: list.name,
      items: list.items.filter(item => { return item.id !== cardId })
    }
  })
  dispatch(deleteCard(lists))
}

export const deleteList = (lists:Array<List>) :DeleteList => {
  return {
    type: 'tasks/DELETE_LIST',
    payload: lists
  }
}

export const dispatchDeleteList = (listId:number) => (dispatch:Dispatch, getState: () => State) => {
  const state = getState()
  const lists = _.cloneDeep(state.tasks.lists).filter(list => {
    return list.id !== listId
  })
  console.log(lists)
  dispatch(deleteList(lists))
}

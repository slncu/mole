// @flow
import type { Dispatch } from 'redux'
import type { State } from '../'
import _ from 'lodash'

type Item = {
  id: number,
  content: string,
  startTime: string,
  endTime: string
}

type List = {
  id: number,
  items: Array<Item>
}

export type Tasks = {
  lists: Array<List>,
  editItem: Item,
  isEditable: boolean,
  cardAmount: number
}

const initialState = {
  lists: [{
    id: 1,
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
  cardAmount: 1
}

const INCREMENT_CARD_AMOUNT = 'tasks/INCREMENT_CARD_AMOUNT'
const DECREMENT_CARD_AMOUNT = 'tasks/DECREMENT_CARD_AMOUNT'
const ADD_CARD = 'tasks/ADD_CARD'
const SORT_CARD = 'tasks/SORT_CARD'
const IS_EDITABLE = 'tasks/IS_EDITABLE'
const SET_EDIT_CARD = 'tasks/SET_EDIT_CARD'
const UPDATE_EDIT_CARD = 'tasks/UPDATE_EDIT_CARD'

type IncrementCardAmount = { type: 'tasks/INCREMENT_CARD_AMOUNT' }

type DecrementCardAmount = { type: 'tasks/DECREMENT_CARD_AMOUNT' }

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

type Actions = IncrementCardAmount |
               DecrementCardAmount |
               AddCard |
               SetEditCard |
               SortCard |
               IsEditable |
               UpdateEditCard;

/**
 * The reducer
 */

export default (state: Tasks = initialState, action: Actions) => {
  switch (action.type) {
    case INCREMENT_CARD_AMOUNT:
      return { ...state, cardAmount: state.cardAmount + 1 }
    case DECREMENT_CARD_AMOUNT:
      return Object.assign({}, state, { cardAmount: state.cardAmount - 1 })
    case ADD_CARD:
      return Object.assign({}, state, { lists: action.payload})
    case SET_EDIT_CARD:
      return Object.assign({}, state, { editItem: action.payload});
    case SORT_CARD:
      return Object.assign({}, state, { lists: action.payload})
    case UPDATE_EDIT_CARD:
      return Object.assign({}, state, { lists: action.payload})
    case IS_EDITABLE:
      return { ...state, isEditable: action.payload };
    default:
      return state;
  }
}

export const incrementCardAmount = (): IncrementCardAmount => {
  return { type: 'tasks/INCREMENT_CARD_AMOUNT' }
}

export const decrementCardAmount = (): DecrementCardAmount => {
  return { type: 'tasks/DECREMENT_CARD_AMOUNT' }
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
  let lists = []
  const newList = _.cloneDeep(state.tasks.lists).map(list => {
    if (listId === list.id) {
      list.items.push({id: state.tasks.cardAmount, content:'', startTime: '', endTime: ''})
    }
    return list
  })
  dispatch(addCard(newList))
}

export const sortCard = (list: Array<List>) =>{
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
  let editItem = [];
  const clone = _.cloneDeep(state.tasks.lists).forEach(list => (list.items.map(item => {
    if(item.id === id) {
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
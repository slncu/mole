// @flow
import type { Dispatch } from 'redux'
import type { State } from '../'
import _ from 'lodash'

type Item = {
  id: number,
  content: string
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
      content: 'タスク'
    },{
      id: 2,
      content: 'たすく'
    },{
      id: 3,
      content: 'task'
    }]
  },{
    id: 2,
    items: [{
      id: 4,
      content: 'タスク'
    },{
      id: 5,
      content: 'たすく'
    },{
      id: 6,
      content: 'task'
    }]
  }],
  editItem: {
    id: 1,
    content: ''
  },
  isEditable: false,
  cardAmount: 6
}

const INCREMENT_CARD_AMOUNT = 'tasks/INCREMENT_CARD_AMOUNT'
const DECREMENT_CARD_AMOUNT = 'tasks/DECREMENT_CARD_AMOUNT'
const ADD_CARD = 'tasks/ADD_CARD'
const EDIT_CARD = 'tasks/EDIT_CARD'
const SORT_CARD = 'tasks/SORT_CARD'
const IS_EDITABLE = 'tasks/IS_EDITABLE'

type IncrementCardAmount = { type: 'tasks/INCREMENT_CARD_AMOUNT' }

type DecrementCardAmount = { type: 'tasks/DECREMENT_CARD_AMOUNT' }

type AddCard = {
  type: 'tasks/ADD_CARD',
  payload: Array<List>
}

type EditCard = {
  type: 'tasks/EDIT_CARD',
  payload: Item
}

type SortCard = {
  type: 'tasks/SORT_CARD',
  payload: Array<List>
}

type IsEditable = {
  type: 'tasks/IS_EDITABLE',
  payload: boolean
}

type Actions = IncrementCardAmount |
               DecrementCardAmount |
               AddCard |
               EditCard |
               SortCard |
               IsEditable;

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
      return Object.assign({}, state, {lists: action.payload})
    case EDIT_CARD:
      return state;
    case SORT_CARD:
      return Object.assign({}, state, {lists: action.payload})
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

export const isEditable = (isEditable: boolean): IsEditable => {
  return {
    type: IS_EDITABLE,
    payload: isEditable
  }
}

export const dispatchAddCard = (listId: number) => (dispatch: Dispatch, getState: () => State) => {
  dispatch(incrementCardAmount())

  const state = getState()
  let lists = []
  const newList = _.cloneDeep(state.tasks.lists).map(list => {
    if (listId === list.id) {
      list.items.push({id: state.tasks.cardAmount, content:''})
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
  console.log(list)
  dispatch(sortCard(list))
}
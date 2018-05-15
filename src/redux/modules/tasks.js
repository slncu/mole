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
      content: ''
    }]
  }],
  editItem: {
    id: 1,
    content: ''
  },
  isEditable: false,
  cardAmount: 1
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
  payload: List
}

type EditCard = {
  type: 'tasks/EDIT_CARD',
  payload: Item
}

type SortCard = {
  type: 'tasks/SORT_CARD',
  payload: {
    index: number,
    item: Item
  }
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
      return { ...state, lists: action.payload }
    case EDIT_CARD:
      return state;
    case SORT_CARD:
      return state;
    case IS_EDITABLE:
      return state;
    default:
      return state;
  }
}
/**
 * Actions
 */
// export const setCardAmount = (): IncrementCardAmount => {
//   return { type: 'tasks/SET_CARD_AMOUNT' }
// }


export const incrementCardAmount = (): IncrementCardAmount => {
  return { type: 'tasks/INCREMENT_CARD_AMOUNT' }
}

export const decrementCardAmount = (): DecrementCardAmount => {
  return { type: 'tasks/DECREMENT_CARD_AMOUNT' }
}

const addCard = (list: List): AddCard => {
  return {
    type: 'tasks/ADD_CARD',
    payload: list
  }
}

export const dispatchAddCard = (listId: number) => (dispatch: Dispatch, getState: () => State) => {
  dispatch(incrementCardAmount())

  const state = getState()
  const list = state.tasks.lists.filter(list => ( list.id === listId ))
  list[0].items.push({id: state.tasks.cardAmount, content:''})

  dispatch(addCard(list))
}
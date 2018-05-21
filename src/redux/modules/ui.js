// @flow

import type { Dispatch } from 'redux'
import type { State } from '../'
import _ from 'lodash'

export type Ui = {
  isOpenModal: boolean,
  isOpenCalendar: boolean
}

const initialState = {
  isOpenModal: false,
  isOpenCalendar: false
}

const IS_OPEN_MODAL = 'ui/IS_OPEN_MODAL'
const IS_OPEN_CALENDAR = 'ui/IS_OPEN_CALENDAR'

type IsOpenModal = {
  type: 'ui/IS_OPEN_MODAL',
  payload: boolean
}

type IsOpenCalendar = {
  type: 'ui/IS_OPEN_CALENDAR',
  payload: boolean
}

type Actions = IsOpenCalendar;

/**
 * The reducer
 */

export default (state: Ui = initialState, action: Actions) => {
  switch (action.type) {
    case IS_OPEN_CALENDAR:
      return { ...state, isOpenCalendar: action.payload }
    default:
      return state;
  }
}

export const isOpenCalendar = (isOpen:boolean):IsOpenCalendar  => {
  return {
    type: 'ui/IS_OPEN_CALENDAR',
    payload: isOpen
  }
}

export const dispatchIsOpenCalendar = (isOpen:boolean)=> (dispatch:Dispatch) => {
  dispatch(isOpenCalendar(isOpen))
}
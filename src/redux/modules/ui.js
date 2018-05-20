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

/**
 * The reducer
 */

export default (state: Ui = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export const dispatchIsOpenCalendar = () => (dispatch: Dispatch) => {
  
}
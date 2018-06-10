// @flow
import type { Dispatch } from 'redux'
export type Ui = {
  isOpenModal: boolean,
  isOpenCalendar: boolean
}

const initialState = {
  isOpenModal: false,
  isOpenCalendar: false,
  isOpenTimeline: false
}

const IS_OPEN_MODAL = 'ui/IS_OPEN_MODAL'
const IS_OPEN_CALENDAR = 'ui/IS_OPEN_CALENDAR'
const IS_OPEN_TIMELINE = 'ui/IS_OPEN_TIMELINE'

type IsOpenModal = {
  type: 'ui/IS_OPEN_MODAL',
  payload: boolean
}

type IsOpenCalendar = {
  type: 'ui/IS_OPEN_CALENDAR',
  payload: boolean
}

type IsOpenTimeline = {
  type: 'ui/IS_OPEN_TIMELINE',
  payload: boolean
}

type Actions = IsOpenCalendar |
               IsOpenModal |
               IsOpenTimeline;

/**
 * The reducer
 */

export default (state: Ui = initialState, action: Actions) => {
  switch (action.type) {
    case IS_OPEN_CALENDAR:
      return { ...state, isOpenCalendar: action.payload }
    case IS_OPEN_MODAL:
      return state
    case IS_OPEN_TIMELINE:
      return state
    default:
      return state
  }
}

export const isOpenCalendar = (isOpen:boolean):IsOpenCalendar => {
  return {
    type: 'ui/IS_OPEN_CALENDAR',
    payload: isOpen
  }
}

export const isOpenTimeline = (isOpen:boolean):IsOpenTimeline => {
  return {
    type: 'ui/IS_OPEN_TIMELINE',
    payload: isOpen
  }
}

export const dispatchIsOpenCalendar = (isOpen: boolean) => (dispatch: Dispatch) => {
  dispatch(isOpenCalendar(isOpen))
}

export const disPatchIsOpenTimeline = (isOpen: boolean) => (dispatch: Dispatch) => {
  dispatch(isOpenTimeline(isOpen))
}

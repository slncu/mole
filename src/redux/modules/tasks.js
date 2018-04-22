const initialState = {
  items: [{
    id: 1,
    title: 'example card',
    content: 'This is example tasks card'
  },{
    id: 2,
    title: 'これはテストのタスクカード',
    content: 'これはテストのタスクカード',
  },{
    id: 3,
    title: 'これはテストのタスクカード',
    content: '・？？？？？？？'
  }],
  isEditable: false
}

const SORT_LIST_ITEMS = 'SORT_LIST_ITEMS';
const SET_MODE_EDIT = 'SET_MODE_EDIT';
const CLEAR_MODE_EDIT = 'CLEAR_MODE_EDIT';

/**
 * The tasks module reducer
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case SORT_LIST_ITEMS:
      return { ...state, items: action.payload };
    case SET_MODE_EDIT:
      return { ...state, isEditable: true }
    case CLEAR_MODE_EDIT:
      return { ...state, isEditable: false }
    default:
      return state;
  }
}

/**
 * The tasks module action
 */

/**
 * react-beautiful-dnd のソートで受け取った新しい配列をassignし、表示順を変える
 */
export const sortListItems = array => {
  return {
    type: SORT_LIST_ITEMS,
    payload: array
  };
};

/**
 * タスクカード編集モードにする
 */
export const setEditTask = () => { return { type: SET_MODE_EDIT　}};

/**
 * タスクカード編集モードを終了する
 */
export const clearEditTask = () => { return { type: CLEAR_MODE_EDIT } }
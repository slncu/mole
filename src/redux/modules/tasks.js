const initialState = {
  items: [{
    id: 1,
    title: 'example card',
    content: 'This is example tasks card'
  }, {
    id: 2,
    title: 'これはテストのタスクカード',
    content: 'これはテストのタスクカード'
  }, {
    id: 3,
    title: 'これはテストのタスクカード',
    content: '・？？？？？？？'
  }],
  editItem: {},
  isEditable: false
};

const ADD_ITEM = 'ADD_ITEM';
const SORT_LIST_ITEMS = 'SORT_LIST_ITEMS';
const SET_EDIT_ITEM = 'SET_EDIT_ITEM';
const SET_EDITED_ITEM = 'SET_EDITED_ITEM';
const SET_MODE_EDIT = 'SET_MODE_EDIT';
const CLEAR_MODE_EDIT = 'CLEAR_MODE_EDIT';

/**
 * The tasks module reducer
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return { ...state };
    case SORT_LIST_ITEMS:
      return { ...state, items: action.payload };
    case SET_EDIT_ITEM:
      return { ...state, editItem: action.payload };
    case SET_EDITED_ITEM:
      state.items.map((item, i) => {
        if (item.id === action.payload.id) { state.items[i] = action.payload; }
        return item;
      });
      return { ...state };
    case SET_MODE_EDIT:
      return { ...state, isEditable: true };
    case CLEAR_MODE_EDIT:
      return { ...state, isEditable: false };
    default:
      return state;
  }
};

/**
 * The tasks module action
 */
// export const addItem = () => {
// let amountItems =
// return {
//   type: ADD_ITEM,
//   payload:
// }
// }

/**
 * react-beautiful-dnd のソートで受け取った新しい配列をassignし、表示順を変える
 */
export const sortListItems = array => {
  return {
    type: SORT_LIST_ITEMS,
    payload: array
  };
};

export const setEditItem = array => {
  return {
    type: SET_EDIT_ITEM,
    payload: array
  };
};

export const setEditedItem = obj => {
  return {
    type: SET_EDITED_ITEM,
    payload: obj
  };
};

/**
 * タスクカード編集モードにする
 */
export const setEditTask = () => { return { type: SET_MODE_EDIT }; };

/**
 * タスクカード編集モードを終了する
 */
export const clearEditTask = () => { return { type: CLEAR_MODE_EDIT }; };

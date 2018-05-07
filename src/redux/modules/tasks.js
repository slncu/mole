const initialState = {
  lists:[{
    listId: 0,
    items: [{
      id: 0,
      title: 'てすとの'
    },{
      id: 1,
      title: 'かーど'
    }]
  },{
    listId: 1,
    items: [{
      id: 2,
      title: 'テストの'
    },{
      id: 3,
      title: 'カード'
    }]
  }],
  items: [],
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
  let amount = state.items.length;
  const a = Object.assign({}, state)
  console.log(a)
  switch (action.type) {
    case ADD_ITEM:
      amount++;
      const newObj = { id: amount, title:'', content: ''};
      state.items.push(newObj);
      return { ...state };
    case SORT_LIST_ITEMS:
      return { ...state };
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
export const addItem = () => { return { type: ADD_ITEM } };

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

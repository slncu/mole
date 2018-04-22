const initialState = {
  items: [{
    id: 1,
    sortId: 1,
    title: 'example card',
    content: 'This is example tasks card',
    isEditable: false
  },{
    id: 2,
    sortId: 2,
    title: 'これはテストのタスクカード',
    content: 'これはテストのタスクカード',
    isEditable: false
  },{
    id: 3,
    sortId: 3,
    title: 'これはテストのタスクカード',
    content: '・？？？？？？？',
    isEditable: false
  }]
}

const SORT_LIST_ITEMS = 'SORT_LIST_ITEMS';

/**
 * The tasks module reducer
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case SORT_LIST_ITEMS:
      return { items: action.payload };
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
export const sortListItems = (array) => {
  return {
    type: SORT_LIST_ITEMS,
    payload: array
  };
};


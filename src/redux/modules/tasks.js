// @flow

type Items = {
  id: number,
  title: string,
  content: string
}

type Lists = {
  id: number,
  items: Array<Items>
}

export type Tasks = {
  lists: Array<Lists>,
  editItem: Items,
  isEditable: boolean
}

const initialState = {
  lists: [{
    listId: 0,
    items: [{
      id: 0,
      title: 'てすとの'
    }, {
      id: 1,
      title: 'かーど'
    }]
  }, {
    listId: 1,
    items: [{
      id: 2,
      title: 'テストの'
    }, {
      id: 3,
      title: 'カード'
    }]
  }],
  items: [],
  editItem: {},
  isEditable: false
}

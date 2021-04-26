import { v4 as uuid } from 'uuid'

import {
  ITEM_ADDED,
  ITEM_PICKED,
  ITEM_MOVED,
  ITEM_DROPPED,
  DROPPED_ON_EMPTY_COLUMN,
  ITEM_DELETED,
  ITEM_NAME_CHANGED,
} from './types'

export const addItem = (origin, name) => {
  const item = { id: uuid(), name, origin }
  const allItems = JSON.stringify([
    ...JSON.parse(localStorage.getItem('kanbanBoard')),
    item,
  ])
  localStorage.setItem('kanbanBoard', allItems)
  return {
    type: ITEM_ADDED,
    payload: item,
  }
}

export const setDraggingItem = item => ({ type: ITEM_PICKED, payload: item })

export const arrangeItems = (draggedItem, enteredItem) => {
  const allItems = [...JSON.parse(localStorage.getItem('kanbanBoard'))]
    .filter(item => item.id !== draggedItem.id)
    .reduce((acc, curr) => {
      if (curr.id === enteredItem.id)
        return [...acc, { ...draggedItem, origin: enteredItem.origin }, curr]
      return [...acc, curr]
    }, [])
  localStorage.setItem('kanbanBoard', JSON.stringify(allItems))

  return {
    type: ITEM_MOVED,
    payload: { draggedItem, enteredItem },
  }
}

export const clearDraggingItem = () => ({ type: ITEM_DROPPED })

export const droppedOnEmptyColumn = (destination, draggingItem) => {
  const allItems = [
    ...[...JSON.parse(localStorage.getItem('kanbanBoard'))].filter(
      item => item.id !== draggingItem.id
    ),
    { ...draggingItem, origin: destination },
  ]
  localStorage.setItem('kanbanBoard', JSON.stringify(allItems))

  return {
    type: DROPPED_ON_EMPTY_COLUMN,
    payload: { destination, draggingItem },
  }
}

export const deleteItem = id => {
  const allItems = [...JSON.parse(localStorage.getItem('kanbanBoard'))].filter(
    item => item.id !== id
  )

  localStorage.setItem('kanbanBoard', JSON.stringify(allItems))

  return {
    type: ITEM_DELETED,
    payload: id,
  }
}

export const changeItemName = (id, name) => {
  const allItems = [
    ...JSON.parse(localStorage.getItem('kanbanBoard')),
  ].map(item => (item.id === id ? { ...item, name: name } : item))

  localStorage.setItem('kanbanBoard', JSON.stringify(allItems))

  return {
    type: ITEM_NAME_CHANGED,
    payload: { id, name },
  }
}

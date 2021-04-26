import { v4 as uuid } from 'uuid'

import {
  ITEM_ADDED,
  ITEM_PICKED,
  ITEM_MOVED,
  ITEM_DROPPED,
  DROPPED_ON_EMPTY_COLUMN,
  ITEM_DELETED,
  ITEM_NAME_CHANGED,
} from '../actions/types'

const storage = localStorage.getItem('kanbanBoard')

const initialState = storage
  ? { cards: JSON.parse(storage), draggingItem: null }
  : {
      cards: [],
      draggingItem: null,
    }

export default (state = initialState, { type, payload }) => {
  if (type === ITEM_ADDED) {
    return {
      ...state,
      cards: [payload, ...state.cards],
    }
  }

  if (type === ITEM_PICKED) {
    return {
      ...state,
      draggingItem: payload,
    }
  }

  if (type === ITEM_MOVED) {
    return {
      ...state,
      cards: state.cards
        .filter(item => item.id !== payload.draggedItem.id)
        .reduce((acc, curr) => {
          if (curr.id === payload.enteredItem.id)
            return [
              ...acc,
              { ...payload.draggedItem, origin: payload.enteredItem.origin },
              curr,
            ]
          return [...acc, curr]
        }, []),
    }
  }

  if (type === ITEM_DROPPED) {
    return {
      ...state,
      draggingItem: null,
    }
  }

  if (type === DROPPED_ON_EMPTY_COLUMN) {
    return {
      ...state,
      cards: [
        ...state.cards.filter(item => item.id !== state.draggingItem.id),
        { ...state.draggingItem, origin: payload.destination },
      ],
    }
  }

  if (type === ITEM_DELETED) {
    return {
      ...state,
      cards: state.cards.filter(item => item.id !== payload),
    }
  }

  if (type === ITEM_NAME_CHANGED) {
    return {
      ...state,
      cards: state.cards.map(item =>
        item.id === payload.id ? { ...item, name: payload.name } : item
      ),
    }
  }

  return state
}

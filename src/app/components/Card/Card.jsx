import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { TextField, Button } from '@material-ui/core'
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined'

import {
  setDraggingItem,
  clearDraggingItem,
  arrangeItems,
  deleteItem,
  changeItemName,
} from '../../state/actions'

import './style.scss'

const classes = {
  card: 'card',
  cardtodo: 'card-todo',
  cardinProgress: 'card-inProgress',
  carddone: 'card-done',
  draggingCard: 'dragging-card',
  deleteBtn: 'delete-button',
  cardEdit: 'card-edit',
  input: 'input',
  buttonsWrapper: 'buttons-wrapper',
}

const KEY_CODE = {
  ENTER: 13,
  SPACE: 32,
}

const Card = ({
  item,
  columnName,
  setDraggingItem,
  clearDraggingItem,
  draggingItem,
  arrangeItems,
  deleteItem,
  changeItemName,
}) => {
  const [dragging, setDragging] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [name, setName] = useState(null)

  const cardNode = useRef()

  const computedName = name ?? item.name

  const style = dragging
    ? `${classes.card} ${classes['card' + columnName]} ${classes.draggingCard}`
    : `${classes.card} ${classes['card' + columnName]}`

  const styleOnEdit = editMode ? `${style}  ${classes.cardEdit}` : style

  const handleDelete = () => deleteItem(item.id)
  const handleKeyDown = event => {
    if (event.keyCode === KEY_CODE.ENTER || event.keyCode === KEY_CODE.SPACE) {
      handleDelete()
    }
  }

  const cardContent = dragging ? (
    <span>{item.name}</span>
  ) : (
    <>
      <span>{item.name}</span>
      <span
        className={classes.deleteBtn}
        role="button"
        tabIndex="0"
        onClick={handleDelete}
        onKeyDown={handleKeyDown}
      >
        <ClearOutlinedIcon style={{ fontSize: '14px' }} />
      </span>
    </>
  )

  const inEditMode = editMode ? (
    <div>
      <TextField
        className={classes.input}
        label="Add new task"
        onChange={event => setName(event.target.value)}
        value={computedName}
        fullWidth
      />
      <div className={classes.buttonsWrapper} style={{}}>
        <Button
          style={{ width: '49%' }}
          variant="outlined"
          color="primary"
          onClick={() => setEditMode(false)}
        >
          Cancel
        </Button>
        <Button
          style={{ width: '49%' }}
          variant="contained"
          color="primary"
          onClick={() => {
            changeItemName(item.id, computedName)
            setEditMode(false)
          }}
          disabled={!computedName}
        >
          Edit
        </Button>
      </div>
    </div>
  ) : (
    cardContent
  )

  const handleDragStart = () => {
    cardNode.current.addEventListener('dragend', handleDragEnd)
    setDragging(true)
    setDraggingItem(item)
  }

  const handleDragEnd = () => {
    if (cardNode.current) {
      cardNode.current.removeEventListener('dragend', handleDragEnd)
      setDragging(false)
    }
    clearDraggingItem()
  }

  const handleDragEnter = () => {
    if (item.id !== draggingItem.id) {
      arrangeItems(draggingItem, item)
    }
  }

  const handleDoubleClick = () => setEditMode(true)

  return (
    <div
      ref={cardNode}
      className={styleOnEdit}
      draggable={!editMode}
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}
      onDoubleClick={handleDoubleClick}
    >
      {inEditMode}
    </div>
  )
}

const select = state => ({
  draggingItem: state.cards.draggingItem,
})

Card.propTypes = {
  item: PropTypes.object,
  columnName: PropTypes.string,
  clearDraggingItem: PropTypes.func,
  setDraggingItem: PropTypes.func,
  draggingItem: PropTypes.object,
  arrangeItems: PropTypes.func,
  deleteItem: PropTypes.func,
  changeItemName: PropTypes.func,
}

export default connect(select, {
  setDraggingItem,
  clearDraggingItem,
  arrangeItems,
  deleteItem,
  changeItemName,
})(Card)

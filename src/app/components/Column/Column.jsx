import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { TextField } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

import { droppedOnEmptyColumn, addItem } from '../../state/actions'

import Card from 'components/Card'
import CustomModal from 'components/CustomModal'

import './style.scss'

const classes = {
  wrapper: 'column-wrapper',
  headerWrapper: 'header-wrapper',
  headerWrappertodo: 'header-wrapper-todo',
  headerWrapperinProgress: 'header-wrapper-inProgress',
  headerWrapperdone: 'header-wrapper-done',
  headerInnerWrapper: 'header-inner-wrapper',
  name: 'name',
  add: 'add',
  cardListWrapper: 'card-list-wrapper',
  cardListWrappertodo: 'card-list-wrapper-todo',
  cardListWrapperinProgress: 'card-list-wrapper-inProgress',
  cardListWrapperdone: 'card-list-wrapper-done',
}

const COLUMN_NAMES = {
  todo: 'To Do',
  inProgress: 'In Progress',
  done: 'Done',
}

const KEY_CODE = {
  ENTER: 13,
  SPACE: 32,
}

const Column = ({
  data,
  columnName,
  droppedOnEmptyColumn,
  addItem,
  draggingItem,
}) => {
  const [name, setName] = useState('')
  const modalRef = useRef()

  const handleChange = event => setName(event.target.value)

  const handleDragEnter = data.length
    ? null
    : () => droppedOnEmptyColumn(columnName, draggingItem)

  const handleAddItem = () => modalRef.current.open()

  const onOk = () => {
    addItem(columnName, name)
    setName('')
    modalRef.current.close()
  }

  const onCancel = () => {
    setName('')
    modalRef.current.close()
  }

  const handleKeyDown = event => {
    if (event.keyCode === KEY_CODE.ENTER || event.keyCode === KEY_CODE.SPACE) {
      handleAddItem()
    }
  }

  const cardList = data.map(item => (
    <Card key={item.id} item={item} columnName={columnName} />
  ))

  return (
    <>
      <div className={classes.wrapper} onDragEnter={handleDragEnter}>
        <div
          className={`${classes.headerWrapper} ${
            classes[`${'headerWrapper' + columnName}`]
          }`}
        >
          <div className={classes.headerInnerWrapper}>
            <span className={classes.name}>{COLUMN_NAMES[columnName]}</span>
            <span
              className={classes.add}
              role="button"
              tabIndex="0"
              onClick={handleAddItem}
              onKeyDown={handleKeyDown}
            >
              <AddIcon />
            </span>
          </div>
          <span>({data.length})</span>
        </div>
        <div
          className={`${classes.cardListWrapper} ${
            classes[`${'cardListWrapper' + columnName}`]
          }`}
        >
          {cardList}
        </div>
      </div>
      <CustomModal
        ref={modalRef}
        title="Add ticket"
        onOk={onOk}
        onCancel={onCancel}
      >
        <TextField
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          label="Add new ticket"
          onChange={handleChange}
          value={name}
          margin="normal"
          fullWidth
        />
      </CustomModal>
    </>
  )
}

const select = state => ({ draggingItem: state.cards.draggingItem })

Column.propTypes = {
  data: PropTypes.array,
  columnName: PropTypes.string,
  droppedOnEmptyColumn: PropTypes.func,
  addItem: PropTypes.func,
  draggingItem: PropTypes.object,
}

export default connect(select, { droppedOnEmptyColumn, addItem })(Column)

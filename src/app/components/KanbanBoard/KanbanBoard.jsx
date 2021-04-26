import React from 'react'
import PropTypes from 'prop-types'

import Column from 'components/Column'

import './style.scss'

const classes = {
  wrapper: 'kanban-board-wrapper',
}

const KanbanBoard = ({ cards }) => {
  const sortedColumns = cards.reduce(
    (acc, curr) => ({ ...acc, [curr.origin]: [...acc[curr.origin], curr] }),
    { todo: [], inProgress: [], done: [] }
  )

  const columnList = Object.keys(sortedColumns).map(key => (
    <Column key={key} columnName={key} data={sortedColumns[key]} />
  ))

  return <div className={classes.wrapper}>{columnList}</div>
}

KanbanBoard.propTypes = {
  cards: PropTypes.array,
}

export default KanbanBoard

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import SearchBar from 'components/SearchBar'
import KanbanBoard from 'components/KanbanBoard'

import './style.scss'

const classes = {
  wrapper: 'dashboard-wrapper',
}

const Dashboard = ({ cards }) => {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCards = cards.filter(card => card.name.includes(searchQuery))

  return (
    <div className={classes.wrapper}>
      <SearchBar value={searchQuery} setValue={setSearchQuery} />
      <KanbanBoard cards={filteredCards} />
    </div>
  )
}

const select = state => ({ cards: state.cards.cards })

Dashboard.propTypes = {
  cards: PropTypes.array,
}

export default connect(select)(Dashboard)

import React from 'react'
import PropTypes from 'prop-types'

import { TextField } from '@material-ui/core'

import './style.scss'

const classes = {
  wrapper: 'search-bar-wrapper',
  input: 'input',
}

const SearchBar = ({ value, setValue }) => {
  const handleChange = event => setValue(event.target.value)

  return (
    <div className={classes.wrapper}>
      <TextField
        className={classes.input}
        label="Search for tickets"
        onChange={handleChange}
        value={value}
        fullWidth
      />
    </div>
  )
}

SearchBar.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
}

export default SearchBar

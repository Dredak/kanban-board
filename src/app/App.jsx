import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Dashboard from './pages/Dashboard'

import './appStyles.scss'

const App = () => {
  !localStorage.getItem('kanbanBoard') &&
    localStorage.setItem('kanbanBoard', JSON.stringify([]))

  return (
    <div className="app-wrapper">
      <main className="main">
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Redirect to="/" />
        </Switch>
      </main>
    </div>
  )
}

export default App

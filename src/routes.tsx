import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {Chat} from './components/Chat'
import {Login} from './components/Login'


export const useRoutes = (isAuth:boolean) => {
  if (isAuth) {
    return (
      <Switch>
        <Route exact path='/chat'>
          <Chat/>
        </Route>
        <Redirect to='/chat'/>
      </Switch>
    )
  }
  return (
    <Switch>
      <Route exact path='/'>
        <Login/>
      </Route>
      <Redirect to='/'/>
    </Switch>
  )
}
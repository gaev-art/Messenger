import React from 'react'
import style from './App.module.scss'
import {useRoutes} from '../routes'

export const App = () => {

  const routes = useRoutes(false)

  return (
    <div className={style.app}>
      {routes}
    </div>
  )
}

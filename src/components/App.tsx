import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppStateType} from '../redux/store'
import {useRoutes} from '../routes'
import {isInitializeApp} from '../redux/authReducer'
import {SnackBar} from './Snackbar'


export const App = () => {

  const dispatch = useDispatch()

  const token = useSelector((state: AppStateType) => state.auth.token)
  const error = useSelector((state: AppStateType) => state.auth.error)
  const message = useSelector((state: AppStateType) => state.auth.message)

  const routes = useRoutes(!!token)

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('my-token') as string)

    if (data && data.token) {
      dispatch(isInitializeApp(data))
    }
  }, [dispatch])


  return (
    <div style={{textAlign: 'center', background: 'rgb(232, 240, 254)'}}>
      {routes}
      <SnackBar severity='error' message={error}/>
      <SnackBar severity='success' message={message}/>
    </div>
  )
}

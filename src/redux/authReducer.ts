import {ThunkDispatch} from 'redux-thunk'
import {AppStateType, InferActionTypes} from './store'
import {api, authApi, LoginType, MeType, RegistrationType} from '../api/api'


const SET_DATA = 'AUTH/SET_DATA'
const SET_TOKEN = 'AUTH/SET_TOKEN'
const SET_ERROR = 'AUTH/SET_ERROR'
const SET_MESSAGE = 'AUTH/SET_MESSAGE'


const initialState = {
  token: '',
  userId: '',
  error: null,
  message: null
}

export const authReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case SET_DATA: {
      return {...state, token: action.data.token, userId: action.data.userId,}
    }
    case SET_TOKEN: {
      return {...state, token: action.token}
    }
    case SET_ERROR: {
      return {...state, error: action.error}
    }
    case SET_MESSAGE: {
      return {...state, message: action.message}
    }
    default:
      return state
  }
}


export const action = {
  setData: (data: { token: string, userId: string }) => ({
    type: SET_DATA,
    data
  } as const),
  setToken: (token: string,) => ({
    type: SET_TOKEN,
    token
  } as const),
  setError: (error: string | null) => ({
    type: SET_ERROR,
    error
  } as const),
  setMessage: (message: string | null) => ({
    type: SET_MESSAGE,
    message
  } as const),

}


//Thunk
export const login = (param: LoginType) => async (dispatch: ThunkDispatchType) => {
  try {
    const res = await authApi.login(param)
    const data = JSON.parse(localStorage.getItem('my-token') as string)
    if (data) await api.sendName(data.userId)
    if (res.token) localStorage.setItem('my-token', JSON.stringify(res))
    dispatch(action.setData(res))
  } catch (error) {
    dispatch(action.setError(error.response.data.message))
  }
}
export const isInitializeApp = (param: MeType) => async (dispatch: ThunkDispatchType) => {
  try {
    const res = await authApi.me(param)
    if (res.data.token) localStorage.setItem('my-token', JSON.stringify(res.data))
    await api.sendName(res.data.userId)
    const data = res.data
    dispatch(action.setData(data))
  } catch (error) {
    dispatch(action.setError(error.response.data.message))
  }
}
export const registration = (param: RegistrationType) => async (dispatch: ThunkDispatchType) => {
  try {
    const res = await authApi.register(param)
    dispatch(action.setMessage(res.message))
  } catch (error) {
    dispatch(action.setError(error.response.data.message))
  }
}

//Types
type ActionTypes = InferActionTypes<typeof action>
type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, ActionTypes>
export type InitialStateType = {
  token: string
  userId: string
  error: string | null,
  message: string | null
}





import {applyMiddleware, combineReducers, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {chatReducer} from './chatReducer'
import thunk from 'redux-thunk'
import {authReducer} from './authReducer'


let rootReducer = combineReducers({
  chat: chatReducer,
  auth: authReducer,
})

export let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

//@ts-ignore
window.store = store

export type AppStateType = ReturnType<typeof rootReducer>
export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import style from './Chat.module.scss'
import TextField from '@material-ui/core/TextField/TextField'
import {NavLink} from 'react-router-dom'
import {CircularProgress} from '@material-ui/core'
import {Btn} from '../common/buttom/Button'
import {Message} from './message/Message'


export type MessageType = {
  message: string,
  id: number
  addedAt: string
  user: UserType
}

export type UserType = {
  id: string,
  name: string
}


export const Chat = () => {

  const messages = [
    {
      message: 'string',
      id: 1,
      addedAt: 'string',
      user: {
        id: 'string',
        name: 'string'
      }
    },
    {
      message: 'string',
      id: 2,
      addedAt: 'string',
      user: {
        id: 'string',
        name: 'string'
      }
    },
  ] as MessageType[]
  const typingUsers = [] as UserType[]


  const [message, setMessage] = useState('')


  const sendMessageFunc = () => {
    alert(message)
    setMessage('')
  }

  const messageElements = messages.map((m: MessageType) => {
    return <Message key={m.id} time={m.id} name={m.user.name} message={m.message}/>
  })

  const typingUsersElement = typingUsers.map((m: UserType) => {
    return <div key={m.id}>
      <b>{m.name}:</b> ...
    </div>
  })

  const typeMessageFunc = (target: KeyboardEvent<HTMLDivElement>) => {
    if (target.key === 'Enter') {
      sendMessageFunc()
    }
  }

  const onChangeTyping = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMessage(e.currentTarget.value)

  }

  const changeName = () => {
    alert('logout')
  }

  if (!messages) {
    return <div
      style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
      <CircularProgress/>
    </div>
  }

  // if (name === 'unknown') {
  //   return <Redirect to={`/`}/>
  // }

  return (
    <div className={style.main}>
      <NavLink to={'/'}>
        <Btn name={'Change name'} onClickHandler={changeName}/>
      </NavLink>
      <div className={style.chatWindow}>
        {messageElements}
        {typingUsersElement}
      </div>
      <div className={style.messageField}>
        <TextField
          label='Enter your message...'
          value={message}
          onKeyPress={typeMessageFunc}
          onChange={onChangeTyping}/>
      </div>
      <Btn name={'Send message'} onClickHandler={sendMessageFunc}/>
    </div>
  )
}


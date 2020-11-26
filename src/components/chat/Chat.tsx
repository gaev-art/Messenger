import {useDispatch, useSelector} from 'react-redux'
import {AppStateType} from '../../redux/store'
import React, {ChangeEvent, KeyboardEvent, useEffect, useRef, useState} from 'react'
import {createConnection, destroyConnection, sendMessage, typeMessage} from '../../redux/chatReducer'
import style from './Chat.module.scss'
import TextField from '@material-ui/core/TextField/TextField'
import {Message} from './message/Message'
import {Btn} from '../common/buttom/Button'
import {CircularProgress} from '@material-ui/core'
import {action, isInitializeApp} from '../../redux/authReducer'


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

  const messages = useSelector((state: AppStateType) => state.chat.messages)
  const typingUsers = useSelector((state: AppStateType) => state.chat.typingUsers)
  const dispatch = useDispatch()


  const [message, setMessage] = useState('')
  const [isAutoScrollActive, setIsAutoScrollActive] = useState(true)
  const [lastScrollTop, setLastScrollTop] = useState(0)

  useEffect(() => {
    if (isAutoScrollActive) {
      messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
    }
  }, [messages, typingUsers, isAutoScrollActive])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('my-token') as string)

    if (data && data.token) {
      dispatch(isInitializeApp(data))
    }
    dispatch(createConnection())
    return () => {
      dispatch(destroyConnection())
    }
  }, [])

  const messagesAnchorRef = useRef<HTMLDivElement>(null)

  const scrollMessages = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    let element = e.currentTarget
    const maxScrollPosition = element.scrollHeight - element.clientHeight
    if (element.scrollTop > lastScrollTop && Math.abs(maxScrollPosition - element.scrollTop) < 2) {
      setIsAutoScrollActive(true)
    } else {
      setIsAutoScrollActive(false)
    }
    setLastScrollTop(element.scrollTop)
  }

  const sendMessageFunc = () => {
    dispatch(sendMessage(message))
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
    dispatch(typeMessage())
  }

  const changeName = () => {
    dispatch(destroyConnection())
    dispatch(action.setToken(''))
    localStorage.removeItem('my-token')
  }

  if (!messages) {
    return <div
      style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
      <CircularProgress/>
    </div>
  }

  return (
    <div className={style.main}>
      <Btn name={'Logout'} onClickHandler={changeName}/>
      <div className={style.chatWindow} onScroll={scrollMessages}>
        {messageElements}
        {typingUsersElement}
        <div ref={messagesAnchorRef}/>
      </div>
      <div className={style.messageField}>
        <TextField label='Enter your message...'
                   variant="outlined"
                   value={message}
                   onKeyPress={typeMessageFunc}
                   onChange={onChangeTyping}
        />
      </div>
      <Btn name={'Send message'} onClickHandler={sendMessageFunc}/>
    </div>
  )
}


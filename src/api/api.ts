import io from 'socket.io-client'
import {MessageType, UserType} from '../components/chat/Chat'
import {instance} from './instance'

const url = process.env.REACT_APP_BASE_URL as string

export const api = {
  socket: null as null | SocketIOClient.Socket,

  createConnection() {
    this.socket = io(url)
  },

  subscribe(
    initMessagesHandler: (messages: Array<MessageType>, fn: () => void) => void,
    newMessageSentHandler: (message: MessageType) => void,
    userTypingHandler: (user: UserType) => void
  ) {
    this.socket?.on('init-messages-published', initMessagesHandler)
    this.socket?.on('new-message-sent', newMessageSentHandler)
    this.socket?.on('user-typing', userTypingHandler)
  },

  destroyConnection() {
    this.socket?.disconnect()
    this.socket = null
  },

  sendName(name: string) {
    this.socket?.emit('client-name-sent', name, (error: string | null) => {
      console.log(error)
      if (error) alert(error)
    })
  },

  sendMessage(message: string) {
    this.socket?.emit('client-message-sent', message, (error: string | null) => {
      if (error) alert(error)
    })
  },

  typeMessage() {
    this.socket?.emit('client-typed')
  }
}


export const authApi = {
  login(data: LoginType) {
    return instance.post<ResponseLoginType>(`/auth/login`, data)
      .then(res => res.data)
  },
  me(data: MeType) {
    return instance.post<ResponseLoginType>(`/auth/me`, data)
  },
  register(data: RegistrationType) {
    return instance.post<ResponseRegistrationType>(`/auth/register`, data)
      .then(res => res.data)
  }
}

export type LoginType = {
  name: string
  password: string
}
export type MeType = {
  token: string
  userId: string
}
export type RegistrationType = {
  name: string
  email: string
  password: string
}
export type ResponseLoginType = {
  token: string
  userId: string
}
export type ResponseRegistrationType = {
  message: string
}

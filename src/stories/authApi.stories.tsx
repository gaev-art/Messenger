import React, {useState} from 'react'
import {Button, CircularProgress, Paper, TextField} from '@material-ui/core'
import {instance} from '../api/instance'


// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Auth API'
}

export const Login = () => {
  const [state, setState] = useState<any>(null)
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onClickHandler = async (name: string, password: string) => {
    try {
      setIsLoading(true)
      const response = await instance.post(`/auth/login`, {name, password})
      setState(response.data)
      setIsLoading(false)
    } catch (error) {
      alert(JSON.stringify(error.response.data.message))
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div
      style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
      <CircularProgress/>
    </div>
  }

  return <div>
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <TextField label={'name'}
                 style={{margin: '10px'}}
                 value={name}
                 onChange={event => setName(event.currentTarget.value)}
      />
      <TextField label={'password'}
                 type={'password'}
                 style={{margin: '10px'}}
                 value={password}
                 onChange={event => setPassword(event.currentTarget.value)}
      />
      <Button onClick={() => onClickHandler(name, password)}>submit</Button>
    </div>
    <Paper elevation={3} style={{margin: '30px', padding: '10px'}}>
      {JSON.stringify(state)}
    </Paper>
  </div>
}

export const Registration = () => {
  const [state, setState] = useState<any>(null)
  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onClickHandler = async (email: string, name: string, password: string) => {
    try {
      setIsLoading(true)
      const response = await instance.post(`/auth/register`, {email, name, password})
      setState(response.data)
      setIsLoading(false)
    } catch (error) {
      alert(JSON.stringify(error.response.data.message))
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div
      style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
      <CircularProgress/>
    </div>
  }

  return <div>
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <TextField label={'email'}
                 style={{margin: '10px'}}
                 value={email}
                 onChange={event => setEmail(event.currentTarget.value)}
      />
      <TextField label={'name'}
                 style={{margin: '10px'}}
                 value={name}
                 onChange={event => setName(event.currentTarget.value)}
      />
      <TextField label={'password'}
                 type={'password'}
                 style={{margin: '10px'}}
                 value={password}
                 onChange={event => setPassword(event.currentTarget.value)}
      />
      <Button onClick={() => onClickHandler(email, name, password)}>submit</Button>
    </div>
    <Paper elevation={3} style={{margin: '30px', padding: '10px'}}>
      {JSON.stringify(state)}
    </Paper>
  </div>
}

export const Me = () => {
  const [state, setState] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)


  const onClickHandler = async () => {
    try {
      const data = await JSON.parse(localStorage.getItem('my-token') as string)
      setIsLoading(true)
      const response = await instance.post(`/auth/me`, data)
      setState(response.data)
      setIsLoading(false)
    } catch (error) {
      alert(JSON.stringify(error.response.data.message))
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div
      style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
      <CircularProgress/>
    </div>
  }

  return <div>
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Button onClick={onClickHandler}>submit</Button>
    </div>
    <Paper elevation={3} style={{margin: '30px', padding: '10px'}}>
      {JSON.stringify(state)}
    </Paper>
  </div>
}
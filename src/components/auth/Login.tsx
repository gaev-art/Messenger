import React from 'react'
import {FormControl, FormGroup, Grid, TextField, Typography} from '@material-ui/core'
import {useFormik} from 'formik'
import {useDispatch} from 'react-redux'
import {login, registration} from '../../redux/authReducer'
import {Btn} from '../common/buttom/Button'


export const Login = () => {

  const dispatch = useDispatch()

  const formik = useFormik({
    validate: (values: { email: string, password: string, name: string }) => {
      if (!values.name) {
        return {
          name: 'Name is required'
        }
      }
      if (!values.password) {
        return {
          password: 'Password is required'
        }
      }
    },
    initialValues: {
      email: '',
      password: '',
      name: '',
      isSecondButton: false
    },
    onSubmit: values => {
      if (!values.isSecondButton) {
        dispatch(login({name: values.name, password: values.password}))
      } else {
        dispatch(registration({email: values.email, name: values.name, password: values.password}))
      }
    },
  })

  const handleSubmit = (value: boolean) => {
    formik.setFieldValue('isSecondButton', value)
    formik.handleSubmit()
  }

  return <Grid container style={{
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgb(232, 240, 254)'
  }}>
    <form onSubmit={formik.handleSubmit}>
      <Typography style={{margin: '15px'}} variant="h3">Welcome to chat</Typography>
      <FormControl>
        <FormGroup>
          <TextField label="Email" margin="normal" variant="outlined"
                     {...formik.getFieldProps('email')}/>
          {formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
          <TextField label="Name" margin="normal" variant="outlined"
                     {...formik.getFieldProps('name')}/>
          {formik.errors.name ? <div style={{color: 'red'}}>{formik.errors.name}</div> : null}
          <TextField label="Password" margin="normal" variant="outlined" type='password'
                     {...formik.getFieldProps('password')}/>
          {formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
          <Grid container justify='center' alignItems='center'>
            <Btn name='Login' onClickHandler={() => handleSubmit(false)}/>
            <Btn name='Register' onClickHandler={() => handleSubmit(true)}/>
          </Grid>
        </FormGroup>
      </FormControl>
    </form>
  </Grid>
}


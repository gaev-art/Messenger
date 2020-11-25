import React from 'react'
import {Button, FormControl, FormGroup, Grid, TextField, Typography} from '@material-ui/core'
import {useFormik} from 'formik'

export const Login = () => {

  const formik = useFormik({
    validate: (values: { email: string, password: string, name: string }) => {
      if (!values.email) {
        return {
          email: 'Email is required'
        }
      }
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
        alert('login')
      } else {
        alert('registration')
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
    justifyContent: 'center'
  }}>
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h6">Authentication / Registration</Typography>
      <FormControl>
        <FormGroup>
          <TextField
            label="Email"
            margin="normal"
            {...formik.getFieldProps('email')}
          />
          {formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
          <TextField
            label="Name"
            margin="normal"
            {...formik.getFieldProps('name')}
          />
          {formik.errors.name ? <div style={{color: 'red'}}>{formik.errors.name}</div> : null}
          <TextField
            type="password"
            label="Password"
            margin="normal"
            {...formik.getFieldProps('password')}
          />
          {formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
          <Grid container justify='center' alignItems='center'>
            <Button style={{margin: '10px'}} onClick={() => handleSubmit(false)}>
              Login
            </Button>
            <Button style={{margin: '10px'}} onClick={() => handleSubmit(true)}>
              Register
            </Button>
          </Grid>
        </FormGroup>
      </FormControl>
    </form>
  </Grid>
}


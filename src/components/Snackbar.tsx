import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert'
import {useDispatch} from 'react-redux'
import {action} from '../redux/authReducer'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

type Props = {
  message: string | null
  severity: 'success' | 'info' | 'warning' | 'error' | undefined
}

export const SnackBar = (props: Props) => {

  const dispatch = useDispatch()

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(action.setError(null))
    dispatch(action.setMessage(null))
  }

  const isOpen = props.message !== null

  return (
    <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={props.severity}>
        {props.message}
      </Alert>
    </Snackbar>
  )
}
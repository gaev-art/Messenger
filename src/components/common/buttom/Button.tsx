import Button from '@material-ui/core/Button/Button'
import React from 'react'


type Props = {
  name: string
  disabled?: boolean,
  onClickHandler: () => void
}

export const Btn = (props: Props) => <Button
  style={{margin: '10px'}}
  size='medium'
  variant='outlined'
  color='default'
  disabled={props.disabled}
  onClick={props.onClickHandler}>
  {props.name}
</Button>


import { useSelector } from 'react-redux'
import { notificationSelector } from '../reducers/notificationReducer'

import { Alert } from '@mui/material'

const Notification = () => {
  const notification = useSelector(notificationSelector)

  if (!notification.message) {
    return null
  }

  return (
    <Alert severity={notification.severity}>
      {notification.message}
    </Alert>
  )
}

export default Notification
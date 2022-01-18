import PropTypes from 'prop-types'

const Notification = ({ message }) => {
  if (message.text === null) {
    return null
  }

  return (
    <div className={message.className}>
      {message.text}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.object.isRequired
}

export default Notification
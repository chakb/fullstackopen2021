import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (props.notificationMessage) {
    return (
      <div style={style}>
        {props.notificationMessage}
      </div>
    )
  }
  return null
}

const mapStateToProps = (state) => { return {notificationMessage: state.notification.message }}


export default connect(mapStateToProps)(Notification)
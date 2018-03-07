import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }

    if (!this.props.notification) {
      return <div></div>
    }

    return (
      <div style={style}>
        {this.props.notification}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { notification: state.notification }
}

const ConnectedNotification = connect(
  mapStateToProps
)(Notification)

export default ConnectedNotification

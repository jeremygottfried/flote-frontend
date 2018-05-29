import {ActionCable} from 'react-actioncable-provider'

export const RecieveEdit = (note) => {
  const index = note.index
  this.setState({
  notes:  ...this.state.notes.slice(0, index),
     note,
     ...this.state.notes.slice(index + 1)
  })
}
export const SendEdit = () => {
  const note = this.refs.editedMessage.value
  const room = 'note_1'
  const index = this.props.key
  // Call perform or send
  this.refs.editChannel.send({note, room, index})
}

export const SendRealTime = () => {
  const note = this.refs.realTimeTyping.value
  const room = 'note_1'
  const index = this.props.key
  // Call perform or send
  this.refs.realTimeTypingChannel.send({note, room, index})
}

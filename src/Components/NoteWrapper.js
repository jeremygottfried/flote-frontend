import React, {Component} from 'react'
import {ActionCable} from 'react-actioncable-provider'
import Note from './Note';
export default class NoteWrapper extends Component {
  state = {
    body: this.props.note.body
  }
  handleChange = (event) => {
    this.sendMessage(event.target.value)
    this.setState({
      body: event.target.value
    }
  )

  }

  sendMessage = (note) => {
      const body = note
      const room = 'edit_1'
      const id = this.props.note.id

      const index = this.props.id

      // Call perform or send
      this.refs.realTimeTypingChannel.send({body, room, id, index})
  }

  SendEdit = () => {
    const note = this.state.body
    const room = 'note_1'
    const id = this.props.note.id
    // Call perform or send
    this.refs.editChannel.send({note, room, id})
  }
  render() {
    return(
      <div id={this.props.note.id}>
      <ActionCable ref='realTimeTypingChannel' channel={{channel: 'RealTimeTypingChannel', room: this.props.note.id, username: 'jeremy'}} onReceived={this.props.onEdit} />
      <ActionCable ref='editChannel' channel={{channel: 'EditChannel', room: this.props.note.id, username: 'jeremy'}} />
      <Note key={this.props.note.id} handleChange={this.handleChange} note={this.state.body}/>
      </div>
    )
  }
}

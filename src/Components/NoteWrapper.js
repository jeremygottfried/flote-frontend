import React, {Component} from 'react'
import {ActionCable} from 'react-actioncable-provider'
import Note from './Note';
import { Card, Modal, Image, Button, Header } from 'semantic-ui-react'
export default class NoteWrapper extends Component {
  state = {
    body: this.props.note.body
  }
  handleChange = (event) =>
  {
    this.sendMessage(event.target.value)
    this.setState({
      body: event.target.value
    }
  )

  }
  shouldComponentUpdate(nextProps, nextState) {
    // console.log(nextProps.note)

    if (nextProps.note.body !== this.props.note.body) {
      this.setState(
        {
          body: nextProps.note.body
        }
      )
      return true
    } else if (nextState.body !== this.state.body){
    return true
  }
    return false
  }
  sendMessage = (note) => {
    console.log('sending')
      const body = note
      const room = 'edit_1'
      const id = this.props.note.id

      const index = this.props.id

      // Call perform or send
      this.refs.realTimeTypingChannel.send({body, room, id, index})
  }

  SendEdit = (event) => {
    console.log(event)
    const note = this.state.body
    const room = 'note_1'
    const id = this.props.note.id
    // Call perform or send
    this.refs.editChannel.send({note, room, id})
  }
  render() {
    return(

      <Modal onClose={this.SendEdit} className="modal" size="fullscreen" trigger={
        <Card>
          <ActionCable ref='realTimeTypingChannel' channel={{channel: 'RealTimeTypingChannel', room: this.props.note.id, username: `${localStorage.getItem('username')}`}} onReceived={this.props.onEdit} />
          <ActionCable ref='editChannel' channel={{channel: 'EditChannel', room: this.props.note.id, username: `${localStorage.getItem('username')}`}} />
          <Card.Content>{this.state.body}</Card.Content>
        </Card>
      }>
          <Modal.Header>Edit Post</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <textarea className="textarea" value={this.state.body} onChange={this.handleChange}/>
            </Modal.Description>
          </Modal.Content>
        </Modal>
    )
  }
}

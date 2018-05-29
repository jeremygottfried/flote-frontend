import React, {Component} from 'react'
import NoteWrapper from '../Components/NoteWrapper'
import { Card, Modal, Button, Image, Header } from 'semantic-ui-react'
import {ActionCable} from 'react-actioncable-provider'

export default class NotesContainer extends Component {

  state = {
    notes: []
  }

  onEdit = (note) => {

    console.log('hit')
    // if (note.user !== localStorage.getItem('username'))

    this.setState(
      {
        notes:  [...this.state.notes.slice(0, note.index),
           note,
           ...this.state.notes.slice(note.index + 1)]
      }, console.log(this.state.notes[note.index])
    )
  }

  sendMessage = () => {
      const note = this.refs.newMessage.value
      const room = 'note_1'
      // Call perform or send
      this.refs.noteChannel.send({note, room})
  }


  onReceived = (note) => {

      this.setState({
          notes: [note,
              ...this.state.notes
          ]
      })
      console.log(note)
  }

  componentDidMount = () => {

    let user_id = localStorage.getItem('user_id')
    let token = localStorage.getItem('token')
    fetch(`http://localhost:4000/user/${user_id}/notes`, {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }}
    )
    .then(res => res.json())
    .then(noteArr => {
      console.log(noteArr[0].notes)
      this.setState({notes: noteArr[0].notes})})
  }

  renderNotes = () => {
    return this.state.notes.map((note, index) => {
      return <NoteWrapper onEdit={this.onEdit} id={index} key={note.id} note={note}></NoteWrapper>
    })
  }

  render(){
    return (
      <div>
        <ActionCable ref='noteChannel' channel={{channel: 'NoteChannel', room: '1', username: 'jeremy'}} onReceived={this.onReceived} />
        <input ref='newMessage' type='text' />
        <button onClick={this.sendMessage}>Create New Note</button>

        <Card.Group centered >
          {this.renderNotes()}
        </Card.Group>
      </div>
  )
  }

}

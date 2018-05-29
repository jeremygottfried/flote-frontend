import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import Note from '../Components/Note'
import { Card } from 'semantic-ui-react'
import {ActionCable} from 'react-actioncable-provider'

export default class NotesContainer extends Component {

  state = {
    notes: []
  }

  sendMessage = () => {
      const note = this.refs.newMessage.value
      const room = 'note_1'
      // Call perform or send
      this.refs.noteChannel.send({note, room})
  }


  onReceived = (note) => {

      this.setState({
          notes: [
              ...this.state.notes,
              note
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

      this.setState({notes: noteArr[0].notes})})
  }

  renderNotes = () => {
    return this.state.notes.map((note) => {
      return <Note key={note.id} note={note}></Note>
    })
  }

  render(){
    return (
      <div>
      <ActionCable ref='noteChannel' channel={{channel: 'NoteChannel', room: '1', username: 'jeremy'}} onReceived={this.onReceived} />
      <input ref='newMessage' type='text' />
      <button onClick={this.sendMessage}>Create New Note</button>
    <Card.Group centered >{this.renderNotes()}</Card.Group>
    </div>
  )
  }

}

import React, {Component} from 'react'
import NoteWrapper from '../Components/NoteWrapper'
import NewNoteCard from '../Components/NewNoteCard'
import { Card } from 'semantic-ui-react'
import {ActionCable} from 'react-actioncable-provider'

export default class NotesContainer extends Component {

  state = {
    notes: []
  }

  onDelete = (index) =>{
    this.setState({
      notes: [...this.state.notes.slice(0,index), ...this.state.notes.slice(index+1)]
    })
  }

  onEdit = (note) => {
    // if (note.user !== localStorage.getItem('username'))
    this.setState({
        notes:  [...this.state.notes.slice(0, note.index),
           note,
           ...this.state.notes.slice(note.index + 1)]
      }
    )
  }

  sendMessage = (body) => {
      const note = body
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

    return this.state.notes.filter(note => note.body.toLowerCase().includes(this.props.query.toLowerCase())).map((note, index) => {
      console.log(note)
      return <NoteWrapper onEdit={this.onEdit} id={index} key={note.id} note={note} onDelete={this.onDelete}></NoteWrapper>
    })
  }

  render(){
    return (
      <div>
        <ActionCable ref='noteChannel' channel={{channel: 'NoteChannel', room: `${localStorage.getItem('user_id')}`, username: `${localStorage.getItem('username')}`}} onReceived={this.onReceived} />
        <Card.Group centered className='notegroup'>
          <NewNoteCard createCard={this.sendMessage}/>
          {this.renderNotes()}
        </Card.Group>
      </div>
  )
  }

}

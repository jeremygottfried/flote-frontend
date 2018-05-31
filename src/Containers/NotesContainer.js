import React, {Component} from 'react'
import NoteWrapper from '../Components/NoteWrapper'
import NewNoteCard from '../Components/NewNoteCard'
import { Card } from 'semantic-ui-react'
import {ActionCable} from 'react-actioncable-provider'

export default class NotesContainer extends Component {

  state = {
    notes: []
  }

  onDelete = (index, id) =>{
    if (
      this.state.notes
      && this.state.notes[index]
      && this.state.notes[index].id === id
    ) {
      this.setState({
        notes: [...this.state.notes.slice(0,index),
          ...this.state.notes.slice(index+1)]
      })
      const act = 'delete'
      this.refs.noteChannel.send({id, index, act})
    }
  }

  onEdit = (note) => {
    // console.log('rt', note);
    // What is this? ↴↴↴↴↴↴↴↴↴
    // if (note.user !== localStorage.getItem('username'))
    this.setState({
        notes: [...this.state.notes.slice(0, note.index),
           note,
          ...this.state.notes.slice(note.index + 1)]
      }
    )
  }

  sendMessage = (body) => {
      const note = body
      const room = 'note_1'
      const act = 'create'
      // Call perform or send
      this.refs.noteChannel.send({note, room, act})
  }


  onReceived = (message) => {
    if (message.act !== "delete") {
      this.setState({
          notes: [message,
              ...this.state.notes
          ]
      })
      // console.log("notestatemessage", message)
    } else {
      this.onDelete(message.index, message.id)
      // console.log("deletemessage", message)
    }

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
      // console.log(noteArr)
      this.setState({notes: noteArr[0].notes})})
  }

  renderNotes = () => {
    const filteredNotes = this.state.notes.map((note, index) => {
      return <NoteWrapper onEdit={this.onEdit} id={index} key={note.id} note={note} onDelete={this.onDelete}></NoteWrapper>
    }).filter(element => element.props.note.body.toLowerCase().includes(this.props.query.toLowerCase()));
    // console.log('filteredNotes', filteredNotes);
    return filteredNotes;
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

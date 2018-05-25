import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import Note from '../Components/Note'

export default class NotesContainer extends Component {

  state = {
    notes: []
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
    .then(noteArr => {this.setState({notes: noteArr})})
  }

  renderNotes = () => {
    return this.state.notes.map((note) => {
      return <Note key={note.id} note={note}></Note>
    })
  }

  logout = () => {
    localStorage.clear()
    this.props.history.push("/")
  }

  render(){
    return (<div>
      {this.renderNotes()}
      <button onClick={this.logout}>Log Out</button>
      </div>
    )
  }

}

import React, {Component} from 'react'
import { Card, Modal, Image, Button, Header } from 'semantic-ui-react'

export default class Note extends Component {
  state = {
    body: this.props.note.body
  }
  handleChange = (event) => {
    this.setState({
      body: event.target.value
    })
  }
  render(){
    return(
      <Modal className="modal" size="fullscreen" trigger={
        <Card>
          <Card.Content>{this.props.note.body}</Card.Content>
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

import React, {Component} from 'react'
import {ActionCable} from 'react-actioncable-provider'
import { Card, Modal, Form } from 'semantic-ui-react'
export default class NoteWrapper extends Component {

  state = {
    body: this.props.note.body,
    open: false
  }

  handleChange = (event) => {
      this.sendMessage(event.target.value)
      this.setState({
        body: event.target.value
      }
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
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
      const body = note
      const room = `edit_${this.props.note.id}`
      const id = this.props.note.id

      const index = this.props.id

      // Call perform or send
      this.refs.realTimeTypingChannel.send({ body, room, id, index})
  }

  SendEdit = (event) => {
    const note = this.state.body
    const room = `save_${this.props.note.id}`
    const id = this.props.note.id
    const user = localStorage.getItem('username')
    // Call perform or send
    this.refs.editChannel.send({note, room, id, user})
  }

  deleteNote = (event) => {
    event.preventDefault()
    event.stopPropagation()
    this.props.onDelete(this.props.id, this.props.note.id)
  }

  open = () => this.setState({ open: true })

  close = () => {
    this.setState({ open: false })
    this.SendEdit()
  }

  render() {
    const { open } = this.state
    return(
        <Modal
          // open={open}
          // onOpen={this.open}
          // onClose={this.close}
          className="modal"
          size="fullscreen"
          trigger={
            <Card className="wrap">
              <ActionCable
                ref='realTimeTypingChannel'
                channel={{
                    channel: 'RealTimeTypingChannel',
                    room: this.props.note.id,
                    username: `${localStorage.getItem('username')}`
                  }}
                onReceived={this.props.onEdit}
              />
              <ActionCable
                ref='editChannel'
                channel={{
                    channel: 'EditChannel',
                    room: this.props.note.id,
                    username: `${localStorage.getItem('username')}`
                }}
              />
              <Card.Content>
                <i
                  className="left floated window close icon"
                  onClick={this.deleteNote}
                />
                <br/>

                {this.state.body}
              </Card.Content>
            </Card>
          }
        >
          <Modal.Header>Edit Post</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form>
                <Form.Field
                  control='textarea'
                  rows='3'
                  value={this.state.body}
                  onChange={this.handleChange}/>
              </Form>
            </Modal.Description>
          </Modal.Content>
          {/* <Modal.Actions>
            <Button
              icon='check'
              content='Done'
              onClick={this.close} />
          </Modal.Actions> */}
        </Modal>

    )
  }
}

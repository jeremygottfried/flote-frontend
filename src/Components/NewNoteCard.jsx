import React, { Component } from 'react'
import { Modal, Card, Form } from 'semantic-ui-react'

export default class NewNoteCard extends Component {
  state = {
    body: '',
  }
  handleChange = (event) => {
    this.setState({
      body: event.target.value
    })
  }
  create = () => {
    this.props.createCard(this.state.body)
    this.clear()
  }
  clear = () => {
    this.setState({
      body: ''
    })
  }
  enterHandler = (event) => {
    console.log(event.key)
    if (event.key === "Enter"){
      this.state.body.trim() ? this.create : this.clear
    }
  }
  render(){
    return(
      <Modal onKeyDown={this.enterHandler} onClose={this.state.body.trim() ? this.create : this.clear} className="modal" size="fullscreen" trigger={
        <Card className="wrap">
          <Card.Content><i className="large add icon"></i><Card.Description textAlign='center'>Add A New Note</Card.Description></Card.Content>
        </Card>
      }>
        <Modal.Header>Create New Post</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Field control='textarea' rows='3' value={this.state.body} onChange={this.handleChange}/>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

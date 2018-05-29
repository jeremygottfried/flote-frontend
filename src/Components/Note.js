import React, {Component} from 'react'
import { Card, Modal, Image, Button, Header } from 'semantic-ui-react'

export default class Note extends Component {

  render(){
    
    return(<div>

      <Modal onActionClick={this.props.SendEdit} className="modal" size="fullscreen" trigger={
        <Card>
          <Card.Content>{this.props.note}</Card.Content>
        </Card>
      }>
          <Modal.Header>Edit Post</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <textarea className="textarea" value={this.props.note} onChange={this.props.handleChange}/>
            </Modal.Description>
          </Modal.Content>
        </Modal>
        </div>
    )
  }
}

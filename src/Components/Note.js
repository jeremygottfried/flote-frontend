import React, {Component} from 'react'
import { Card } from 'semantic-ui-react'

export default class Note extends Component {
  render(){
    return(
      <Card>
        <Card.Content>{this.props.note.body}</Card.Content>
      </Card>
    )
  }
}

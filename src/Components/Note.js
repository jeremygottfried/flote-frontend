import React, {Component} from 'react'

export default class Note extends Component {
  render(){
    return(
      <div>
        <h4>{this.props.note.body}</h4>
      </div>
    )
  }
}

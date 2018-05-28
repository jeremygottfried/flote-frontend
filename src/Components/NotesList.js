import React, { Component, PropTypes } from 'react'
import {ActionCable} from 'react-actioncable-provider'

export default class ChatRoom extends Component {
    state = {
      messages: []
    };

    onReceived (message) {
        // this.setState({
        //     messages: [
        //         ...this.state.messages,
        //         message
        //     ]
        // })
        console.log(message)
    }

    sendMessage = () => {
        const message = this.refs.newMessage.value
        const room = 'note_1'
        // Call perform or send
        this.refs.noteChannel.send({message, room})
    }

    render () {
        return (
            <div>
                <ActionCable ref='noteChannel' channel={{channel: 'NoteChannel', room: '1', username: 'jeremy'}} onReceived={this.onReceived} />
                <ul>
                    {this.state.messages.map((message) =>
                        <li key={message.id}>{message.body}</li>
                    )}
                </ul>
                <input ref='newMessage' type='text' />
                <button onClick={this.sendMessage}>Send</button>
            </div>
        )
    }
}

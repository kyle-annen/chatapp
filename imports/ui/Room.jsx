import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Chats } from '../api/chats.js';
import { Rooms } from '../api/rooms.js';

import Chat from './Chat.jsx';

class ChatRoom extends React.Component {


	render() {
		const roomName = this.props.roomName[0] ? 
			this.props.roomName[0].room : "";
		return(
			<div>
				<h3>{roomName}</h3>
				<div className="jumbotron" id="chat-jumbo">
					{this.props.chats.map((chat) => (
							<Chat key={chat._id} chat={chat} />
						))
					}
				</div>
			</div>
		)
	}
}

export default Room = createContainer(({activeRoom}) => {


	return {
		chats: Chats.find( { room: activeRoom } ).fetch(),
		roomName: Rooms.find({ _id: activeRoom}).fetch(),
	};
}, ChatRoom);

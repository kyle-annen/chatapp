import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Chats } from '../api/chats.js';
import { Rooms } from '../api/rooms.js';
import FontAwesome from 'react-fontawesome';

import Chat from './Chat.jsx';

class ChatRoom extends React.Component {
	constructor(props) {
		super(props);
		this.groupConsecutiveChatsByAuthor = this.groupConsecutiveChatsByAuthor.bind(this);
	}

	groupConsecutiveChatsByAuthor() {
		const chats = this.props.chats;
		let newChats = [];
		let tempChat = "";
		
		// for (i = 0; i < chats.length; i++) {
		// 	if (i == 0) {
		// 		tempChat = chats[i];
		// 		tempChat.text = [tempChat.text];
		// 		if (i == chats.length - 1) {
		// 			newChats.push(tempChat);
		// 		}
		// 	} else if (chats[i-1].author === chats[i].author) {
		// 		tempChat.text.push(chats[i].text);
		// 		if ( i == chats.length - 1 ) {
		// 			newChats.push(tempChat);
		// 			tempChat = chats[i];
		// 			tempChat.text = [tempChat.text]; 
		// 		}
		// 	} else if (chats[i-1].author != chats[i].author || i == chats.length) {
		// 		newChats.push(tempChat);
		// 		tempChat = chats[i];
		// 		tempChat.text = [tempChat.text];
		// 	}
		// }

		return newChats;
	}

	render() {
		const roomName = this.props.roomName[0] ? 
			<span><FontAwesome name="hashtag"/>{this.props.roomName[0].room}</span> : 
			"Please select a room.";
		const chats = this.groupConsecutiveChatsByAuthor();
		return(
			<div className="container">
				<h3>{roomName}</h3>
				<div className="jumbotron" id="chat-jumbo">
					{chats.map((chat) => (
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

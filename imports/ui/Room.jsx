import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Chats } from '../api/chats.js';

import Chat from './Chat.jsx';

class Room extends React.Component {


	render() {
		return(
			<div className="jumbotron" id="chat-jumbo">

				{this.props.chats.map((chat) => (
						<Chat key={chat._id} chat={chat} />
					))
				}

			</div>
		)
	}
}

export default RoomContainer = createContainer(({activeRoom}) => {


	return {
		chats: Chats.find( { room: activeRoom } ).fetch(),
	};
}, Room);


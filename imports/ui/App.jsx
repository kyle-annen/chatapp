import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Chats } from '../api/chats.js';

import Chat from './Chat.jsx';

export default class App extends Component {
	render() {
		return (
			<div className="container">
				<div className="jumbotron">
					<h5>{"Let's Chat"}</h5>

					{
						this.props.chats.map((chat) => (
							<Chat key={chat._id} chat={chat} />
						))
					}
					

				</div>
			</div>
		);
	}
};

App.propTypes = {
	chats: PropTypes.array.isRequired,
};

export default createContainer(() => {
	return {
		chats: Chats.find({}).fetch(),
	};
}, App);
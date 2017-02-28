import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';

import { Chats } from '../api/chats.js';

import Chat from './Chat.jsx';
import NavigationBar from './NavigationBar.jsx';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false,
		}

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		if (event.keyCode == 13) {
			event.preventDefault();
			const authorID = Meteor.user()._id;
				//get the text from the chat box
			const chatText = ReactDOM.findDOMNode(
				this.refs.chatInput
			).value;
			console.log(chatText);
			//instert the chat into the MON
			Chats.insert({
				text: chatText,
				author: authorID,
				createdAt: new Date(),
			});

			//clear chat box
			ReactDOM.findDOMNode(this.refs.chatInput).value = '';
			return false
		}
		
	}


	render() {
		return (
			<div className="container-fluid">
			<NavigationBar />
				
				<div className="jumbotron" id="chat-jumbo">
					<h5>{"Let's Chat"}</h5>

					{this.props.chats.map((chat) => (
						<Chat key={chat._id} chat={chat} />
					))}

				</div>
				<form>
					<div className="form-group">
						<label for="chat-input">
							Chat
						</label>
						<input 
							className="form-control"
							id="chat-input"
							ref="chatInput"
							rows="3"
							onKeyDown={this.handleSubmit}>
						</input>
					</div>
				</form>
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
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Button } from 'reactstrap';

import { createContainer } from 'meteor/react-meteor-data';

import { Chats } from '../api/chats.js';
import { Rooms } from '../api/rooms.js';

import Room from './Room.jsx';
import NavigationBar from './NavigationBar.jsx';
import AddRoomModal from './AddRoomModal.jsx';
import AppRoomButtons from './AppRoomButtons.jsx';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false,
			roomModal: false,
			activeRoom: ""
		}
		this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleRoomModal = this.toggleRoomModal.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.selectRoom = this.selectRoom.bind(this);
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
				room: this.state.activeRoom,
				createdAt: new Date(),
			});

			//clear chat box
			ReactDOM.findDOMNode(this.refs.chatInput).value = '';
			return false
		}
	}

	toggleRoomModal() {
    this.setState({
      roomModal: !this.state.roomModal
    });
  }

  createRoom() {
		//get the current user
		const userID = Meteor.user()._id;
		const roomName = document.getElementById('room-input').value;
		//add the room
		Rooms.insert({
			room: roomName,
			author: userID,
			users: [userID]
		});

		this.setState({
			roomModal: false
		});

		//clear the room name input box
		document.getElementById('room-input').value = '';
	}

	selectRoom(roomID) {
		this.setState({
			activeRoom: roomID,
		});
	}


	render() {
		return (
			<div className="container-fluid">
				<NavigationBar 
					toggleRoomModal={this.toggleRoomModal} />
				<AddRoomModal 
					roomModal={this.state.roomModal} 
					toggleRoomModal={this.toggleRoomModal} 
					createRoom={this.createRoom}/>

				<AppRoomButtons 
					selectRoom={this.selectRoom}
					rooms={this.props.rooms}/>

				<Room activeRoom={this.state.activeRoom} />	

				
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
	rooms: PropTypes.array.isRequired,
};

export default createContainer(() => {
	let userID; 

	if (Meteor.user() == null || Meteor.user() == "undefined") {
		userID = "";
	} else {
		userID = Meteor.user()._id;
	}

	return {
		rooms: Rooms.find( { users: userID }, {sort: {room: 1}}).fetch(),
	};
}, App);
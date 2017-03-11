import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Button } from 'reactstrap';

import { createContainer } from 'meteor/react-meteor-data';

import { Chats } from '../api/chats.js';
import { Rooms } from '../api/rooms.js';

import Room from './Room.jsx';
import NavigationBar from './NavigationBar.jsx';
import AppRoomModal from './AppRoomModal.jsx';
import AppRoomButtons from './AppRoomButtons.jsx';
import AppSubModal from './AppSubModal.jsx';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false,
			roomModal: false,
			subModal: false,
			activeRoom: ""
		}
		this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleRoomModal = this.toggleRoomModal.bind(this);
    this.toggleSubModal = this.toggleSubModal.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.subToRoom = this.subToRoom.bind(this);
    this.selectRoom = this.selectRoom.bind(this);
	}

	handleSubmit(event) {
		const chatText = ReactDOM.findDOMNode(
				this.refs.chatInput
			).value;
		if (event.keyCode == 13 && chatText != "") {
			event.preventDefault();
			const authorID = Meteor.user()._id;
				//get the text from the chat box
			
			//instert the chat into the MON
			Chats.insert({
				text: chatText,
				author: authorID,
				room: this.state.activeRoom,
				createdAt: new Date(),
			});

			//clear chat box
			ReactDOM.findDOMNode(this.refs.chatInput).value = '';
			return false;
		}
	}

	toggleRoomModal() {
    this.setState({
      roomModal: !this.state.roomModal
    });
  }

  toggleSubModal(){
  	this.setState({
  		subModal: !this.state.subModal,
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

	subToRoom(roomID) {
		const rooms = this.props.rooms;
		let users = [];
		for (let i=0; i < rooms.length; i++) {
			if (rooms[i]._id == roomID) {
				users = rooms[i].users;
			}
		}
		users.push(Meteor.user()._id);
		Rooms.update(roomID, {
			$set: { users: users },
		});
		this.toggleSubModal();
	}
	selectRoom(roomID) {
		this.setState({
			activeRoom: roomID,
		});
	}


	render() {
		return (
			<div className="container-fluid">
				<NavigationBar />
				<AppRoomModal 
					roomModal={this.state.roomModal} 
					toggleRoomModal={this.toggleRoomModal} 
					createRoom={this.createRoom} />

				<AppSubModal 
					subModal={this.state.subModal}
					toggleSubModal={this.toggleSubModal} 
					allrooms={this.props.allrooms} 
					subToRoom={this.subToRoom}/>

				<AppRoomButtons 
					selectRoom={this.selectRoom}
					rooms={this.props.rooms}
					toggleRoomModal={this.toggleRoomModal} 
					toggleSubModal={this.toggleSubModal}/>

				<Room activeRoom={this.state.activeRoom} />	

				<div className="container">
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
			</div>
		);
	}
};

App.propTypes = {
	rooms: PropTypes.array.isRequired,
	allrooms: PropTypes.array.isRequired,
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
		allrooms: Rooms.find({}).fetch(),

	};
}, App);
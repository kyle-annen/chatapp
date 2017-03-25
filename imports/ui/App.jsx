import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Button } from 'reactstrap';
import parseText from 'npm-text-parser';

import { createContainer } from 'meteor/react-meteor-data';

import { Chats } from '../api/chats.js';
import { Rooms } from '../api/rooms.js';

import Room from './Room.jsx';
import NavigationBar from './NavigationBar.jsx';
import AppRoomModal from './AppRoomModal.jsx';
import AppRoomButtons from './AppRoomButtons.jsx';
import AppSubModal from './AppSubModal.jsx';
import AppEmojiPicker from './AppEmojiPicker.jsx';

class App extends Component {
	constructor(props) {
		super(props);
		//set the initial state
		this.state = {
			loggedIn: false,
			roomModal: false,
			subModal: false,
			activeRoom: ""
		}
		//bind all functions
		this.handleSubmit = this.handleSubmit.bind(this);
		this.toggleRoomModal = this.toggleRoomModal.bind(this);
		this.toggleSubModal = this.toggleSubModal.bind(this);	
		this.createRoom = this.createRoom.bind(this);
		this.subToRoom = this.subToRoom.bind(this);
		this.selectRoom = this.selectRoom.bind(this);
		this.updateRoomAlertCount = this.updateRoomAlertCount.bind(this);
		this.handleEmoji = this.handleEmoji.bind(this);
	}

	handleEmoji(icon) {
		const chatText = ReactDOM.findDOMNode(this.refs.chatInput).value;
		const chatTextWithEmoji = chatText + icon;
		ReactDOM.findDOMNode(this.refs.chatInput).value = chatTextWithEmoji;
	}

	handleSubmit(event) {
		//get the value of the chat input
		const chatText = parseText.parse(ReactDOM.findDOMNode(this.refs.chatInput).value);
		//if enter is pressed, start chat submission
		if (event.keyCode == 13 && chatText != "") {
			//prevent page reload
			event.preventDefault();
			//get the author using meteor user method
			const authorID = Meteor.user()._id;
			//insert the chat into the collection
			Chats.insert({
				text: chatText,
				author: authorID,
				room: this.state.activeRoom,
				createdAt: new Date(),
			});
			//<-----------begin update alerts loop-------------->
			//set the alias for allrooms prop
			const rooms = this.props.allrooms;
			//initialize variables to store values for users and alerts
			let alerts = {};
			let users = [];
			//loop through rooms to get appropriate alerts and users before update
			for (let i = 0; i < rooms.length; i++) {
				if(rooms[i]._id == this.state.activeRoom) {
					alerts = rooms[i].alerts;
					users = rooms[i].users;
				}
			}
			//loop through users to check if already in alerts (based on subscription)
			//if user not in alerts, add to alerts
			for (var i = users.length - 1; i >= 0; i--) {
				if ( !(users[i] in alerts) ) {
					alerts[users[i]] = 0;
				}
			}
			//loop through alerts and increment unseen count
			for ( var key in alerts ) {
				if (alerts.hasOwnProperty(key)) {
					alerts[key] = alerts[key] + 1;		
				}
			}
			//update the alerts in Rooms collection
			Rooms.update(this.state.activeRoom, {
				$set: { alerts: alerts },
			});

			//clear chat box
			ReactDOM.findDOMNode(this.refs.chatInput).value = '';
			//prevent page reload
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
			users: [userID],
			alerts: {}
		});

		this.setState({
			roomModal: false
		});

		//clear the room name input box
		document.getElementById('room-input').value = '';
	}

	subToRoom(roomID) {
		const rooms = this.props.allrooms;
		let users = [];

		rooms.forEach(function(room) {
			if(room._id == roomID) {
				users = room.users;
			}
		})

		users.push(Meteor.user()._id);
		let newUsers = [];

		users.forEach(function(name) {
			if (!newUsers.includes(name)) {
				newUsers.push(name);
			}
		})

		Rooms.update(roomID, {
			$set: { users: newUsers },
			});
			this.toggleSubModal();
		}

	selectRoom(roomID) {
		this.setState({
			activeRoom: roomID,
		});
		console.log("New Room Selected: " + roomID);
	}

	updateRoomAlertCount() {
		if (this.state.activeRoom != "") {
			const rooms = this.props.rooms;
			let alerts = {};
			let updateRoom;
			//loop through rooms to get appropriate alerts and users before update
			for (let i = 0; i < rooms.length; i++) {
				if(rooms[i]._id == this.state.activeRoom) {
					alerts = rooms[i].alerts;
					updateRoom = rooms[i]._id;
				}
			}

			if (updateRoom === this.state.activeRoom) {
				for (var key in alerts) {
					if (key == Meteor.user()._id ) {
						alerts[key] = 0;
					}
				}

				Rooms.update(this.state.activeRoom, {
					$set: { alerts: alerts },
				});
			}				
		}
	 }



	render() {
		const inputFieldDisabled = this.state.activeRoom == "" ? true : false;

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
					toggleSubModal={this.toggleSubModal}
					activeRoom={this.state.activeRoom}/>
				<Room 
					activeRoom={this.state.activeRoom} 
					updateRoomAlertCount={this.updateRoomAlertCount}  />


				
				<div className="container">
					<form>
						<div className="form-group">
							<AppEmojiPicker
								className="float-sm-right" 
								handleEmoji={this.handleEmoji}/>
						
							<input 
								className="form-control"
								id="chat-input"
								ref="chatInput"
								rows="3"
								onKeyDown={this.handleSubmit}
								disabled={inputFieldDisabled}>
								
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
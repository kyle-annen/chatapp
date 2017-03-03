import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { Meteor } from 'meteor/meteor';

export default class Chat extends Component {
	
	constructor(props) {
		super(props);
		const audio = new Audio('https://www.freesound.org/people/HerbertBoland/sounds/33369/download/33369__herbertboland__mouthpop.wav');
		this.state = {
			popSound: audio,
			playSound: true,
		}
		this.getTimeStamp = this.getTimeStamp.bind(this);
	}

	componentDidUpdate() {
		const chatbox = document.getElementById("chat-jumbo");
		chatbox.scrollTop = chatbox.scrollTopMax;
		//check to see if sound can play
		if (this.state.playSound) {
			//set the sound to not play again until timeout reached
			this.setState({ playSound: false })
			//play the pop sound
			this.state.popSound.play();
			//rate limit the pop sound to one per second
			setTimeout(function() {
				this.setState({ playSound: true })
			}, 1000);
		}
	}

	getTimeStamp() {
		const createDate = new Date(this.props.chat.createdAt);
		const checkDate = new Date(this.props.chat.createdAt);
		let timeStamp;
		if (checkDate.setHours(0,0,0,0) == new Date().setHours(0,0,0,0)) {
			const hours = createDate.getHours();
			const min = createDate.getMinutes();
			const formatMin = (min < 10 ? '0':'') + min;
			timeStamp = hours + ':' + formatMin;
		} else {
			const day = createDate.getDate();
			const month = createDate.getMonth();
			const year = createDate.getFullYear();
			timeStamp = month + "/" + day + "/" + year;
		}
		return timeStamp;
	}

	render() {

		
		const author = this.props.chat.author;
		const user = Meteor.users.findOne({_id: author});
		const userImage = user.services.google.picture;
		const userName = "  " + user.services.google.given_name;
		const timeStamp = this.getTimeStamp;
		

		return (
			<div>
				<ReactCSSTransitionGroup
		      transitionName="chat-animation"
		      transitionAppear={true}
		      transitionAppearTimeout={500}
		      transitionEnter={false}
		      transitionLeave={false}>
					<div className="row">
						<div className="col-sm-2">
							<span className="author-name">
								<img
									src={userImage}
									className="chat-image" />
								{userName}
							</span>
						</div>
					</div>
					<div className="row chat-bubble-row">
						<div className="col-sm-10">
							<p className="chat-bubble">
								{this.props.chat.text}
							</p>
						</div>
						<div className="col-sm-2">
							<p className="author-date float-sm-right">
								{timeStamp}
							</p>
						</div>
					</div>
				</ReactCSSTransitionGroup >
			</div>
		);
	}
}


Chat.propTypes = {
	chat: PropTypes.object.isRequired,
};
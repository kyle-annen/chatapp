import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { Meteor } from 'meteor/meteor';

export default class Chat extends Component {
	
	constructor(props) {
		super(props);
		this.getTimeStamp = this.getTimeStamp.bind(this);
		this.scrollChatBottom = this.scrollChatBottom.bind(this);
	}

	componentDidUpdate() {
		this.scrollChatBottom();
		//check to see if sound can play
	}

	componentDidMount() {
		this.scrollChatBottom();
	}

	scrollChatBottom() {
		const chatbox = document.getElementById("chat-jumbo");
		chatbox.scrollTop = chatbox.scrollTopMax;
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
		const timeStamp = this.getTimeStamp();

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
						<div className="col-sm-8">
							<span className="chat-bubble">
								{this.props.chat.text.map((line, idx) => (
									<p 
										className="collated-chat" 
										key={idx}
										dangerouslySetInnerHTML={{__html: line}}>
											
									</p>
									))}
							</span>
						</div>
						<div className="col-sm-2">
							<div className="float-right author-name">
								{timeStamp}
							</div>
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
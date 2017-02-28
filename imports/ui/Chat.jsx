import React, { Component, PropTypes } from 'react';

import { Meteor } from 'meteor/meteor';

export default class Chat extends Component {

	componentDidUpdate() {
		const chatbox = document.getElementById("chat-jumbo");
		chatbox.scrollTop = chatbox.scrollTopMax;
	}

	render() {

		const createDate= new Date(this.props.chat.createdAt);
		const hours = createDate.getHours();
		const min = createDate.getMinutes();
		const formatMin = (min < 10 ? '0':'') + min;
		const timeStamp = hours + ':' + formatMin;
		const author = this.props.chat.author;
		const user = Meteor.users.findOne({_id: author});
		const userImage = user.services.google.picture;
		const userName = "  " + user.services.google.given_name;
		
		

		return (
			<div className="row">
				<div className="col-sm-10">
					<p className="chat-bubble">{this.props.chat.text}</p>
				</div>
				<div className="col-sm-2">
					<span className="author-name float-sm-left">
						<img
							src={userImage}
							className="chat-image" />
						{userName}
					</span>
					<span className="author-date float-sm-right">
						{timeStamp}
					</span>

				</div>
			</div>

		);
	}
}


Chat.propTypes = {
	chat: PropTypes.object.isRequired,
};
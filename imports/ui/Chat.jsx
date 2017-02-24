import React, { Component, PropTypes } from 'react';

export default class Chat extends Component {

	

	render() {

		const createDate= new Date(this.props.chat.createdAt);
		const hours = createDate.getHours();
		const min = createDate.getMinutes();
		const formatMin = (min < 10 ? '0':'') + min;
		const timeStamp = hours + ':' + formatMin;

		return (
			<div className="row">
				<div className="col-sm-10">
					<p className="chat-bubble">{this.props.chat.text}</p>
				</div>
				<div className="col-sm-2">
					<span className="author-name float-sm-left">
						{this.props.chat.author}
					</span>
					<span className="author-date float-sm-right">
						{ timeStamp }
					</span>
				</div>
			</div>

		);
	}
}


Chat.propTypes = {
	chat: PropTypes.object.isRequired,
};
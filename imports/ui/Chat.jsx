import React, { Component, PropTypes } from 'react';

export default class Chat extends Component {
	render() {
		return (
			<p>
				{this.props.chat.text}
				<span className="chat-name">
					{this.props.chat.author}
				</span>
			</p>
		);
	}
}


Chat.propTypes = {
	chat: PropTypes.object.isRequired,
};
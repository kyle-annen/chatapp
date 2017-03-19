import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class AppRoomButtonsAlerts extends React.Component {
	render() {

		const alerts = this.props.room.alerts;
		let alertCount = 0;
		let alertBubble;
		for (var key in alerts) {
			if (key == Meteor.user()._id) {
				alertCount = alerts[key];
			}
		}

		if (alertCount > 0) {
			alertBubble = <span className='alert-bubble'>{alertCount}</span>;
		} else {
			alertBubble = "";
		}

		return(<span>{alertBubble}</span>);
	}
}
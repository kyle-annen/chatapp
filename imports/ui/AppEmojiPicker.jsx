import React from 'react';
import { Button } from 'reactstrap';
import emoji from 'react-easy-emoji';



export default class AppEmojiPicker extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	emojiPickerHidden: true,
	  };

	  this.openEmojiPicker = this.openEmojiPicker.bind(this);
	}

	openEmojiPicker(event) {
		event.preventDefault();
		this.setState({
			emojiPickerHidden: !this.state.emojiPickerHidden,
		})
		return false;
	}


	render() {
		return(
		<div className="emoji-container">
			<div 
				className="emoji-picker"
				hidden={this.state.emojiPickerHidden}>
				test text
			</div>
			<Button
				color="secondary"
				onClick={(event) => {this.openEmojiPicker(event)}} >
				{emoji('😀')}
			</Button>
		</div>
		)
		
	}
}
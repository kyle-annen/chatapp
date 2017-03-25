import React from 'react';
import { Button } from 'reactstrap';
import emoji from 'react-easy-emoji';
import emoticon from 'emoticon';



export default class AppEmojiPicker extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	emojiPickerHidden: true,
	  };

	  this.openEmojiPicker = this.openEmojiPicker.bind(this);
	  this.getEmojis = this.getEmojis.bind(this);
	}

	openEmojiPicker(event) {
		event.preventDefault();
		this.setState({
			emojiPickerHidden: !this.state.emojiPickerHidden,
		})
		return false;
	}

	getEmojis() {
		let emojiList = [];
		const emojisSource = emoticon;

		for (let i = 0; i < emojisSource.length; i++) {
			emojiList.push(emojisSource[i].emoji);
		}
		return emojiList;
	}

	selectEmoji(icon) {
		console.log(icon);
		this.setState({
			emojiPickerHidden: true,
		})
	}


	render() {
		const emojiArray = this.getEmojis();
		
		return(
		<div className="emoji-container">
			<div 
				className="emoji-picker"
				hidden={this.state.emojiPickerHidden}>
				{
					emojiArray.map((icon) => (
						<div 
							className="emoji-button"
							onClick={() => {this.selectEmoji(icon)}}>
							{emoji(icon)}
						</div>
					)) 
				}
			</div>
			<Button
				color="secondary"
				onClick={(event) => {this.openEmojiPicker(event);}} >
				{emoji('😀')}
			</Button>
		</div>
		)
		
	}
}
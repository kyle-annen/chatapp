import React, { Component } from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import FontAwesome from 'react-fontawesome';

export default class AppRoomButtons extends React.Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			dropDownOpen: false,
		};
	}

	toggle(){
		this.setState({
			dropDownOpen: !this.state.dropDownOpen,
		})
	}
	render() {

		return(
			<div className="constainer">
				<ButtonDropdown isOpen={this.state.dropDownOpen} toggle={() => this.toggle()}>
					<DropdownToggle caret>
						<FontAwesome name="users" /> Rooms
					</DropdownToggle>
					<DropdownMenu>
							{this.props.rooms.map((room)=> (
								<DropdownItem 
									key={room._id} 
									onClick={(event) => {
										this.props.selectRoom(room._id); this.toggle();
									}}>
									<FontAwesome name="hashtag" /> {room.room}
								</DropdownItem>
							))}
					</DropdownMenu>
				</ButtonDropdown>
			 <Button
        color="secondary"
        onClick={this.props.toggleRoomModal}
        className="float-right">
          Create Room
        </Button>
			</div>
		)
	}
}



	
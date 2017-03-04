import React, { Component } from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

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
			<div>
			<ButtonDropdown isOpen={this.state.dropDownOpen} toggle={() => this.toggle()}>
					<DropdownToggle caret>
					Rooms
					</DropdownToggle>
					<DropdownMenu>
							{this.props.rooms.map((room)=> (
								<DropdownItem 
									key={room._id} 
									onClick={(event) => {
										this.props.selectRoom(room._id); this.toggle();
									}}>
									{room.room}
								</DropdownItem>
							))}
					</DropdownMenu>
				</ButtonDropdown>
			</div>
		)
	}
}



	
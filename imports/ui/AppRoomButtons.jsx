import React, { Component } from 'react';
import { Button, Collapse } from 'reactstrap';

export default class AppRoomButtons extends React.Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			collapse: false,
		};
	}

	toggle(){
		this.setState({
			collapse: !this.state.collapse,
		})
	}
	render() {
		return(
			<div>
				<Button 
					color="primary"
					onClick={this.toggle}
					style={{marginBottom: '1em'}}>
					Select Room
				</Button>
				<div className="container">
					<Collapse isOpen={this.state.collapse}>
						{this.props.rooms.map((room, i)=> (
							<Button 
								key={room._id} 
								onClick={(event) => {
									this.props.selectRoom(room._id); this.toggle();
								}}>
								{room.room}
							</Button>
						))}
					</Collapse>
				</div>
			</div>
		)
	}
}



	
import React from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import AppRoomButtonsAlerts from './AppRoomButtonsAlerts.jsx';


export default class AppRoomButtons extends React.Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.getTotalAlerts = this.getTotalAlerts.bind(this);
		this.state = {
			dropDownOpen: false,
			leaveRoomHidden: true
		};
	}

	toggle(){
		this.setState({
			dropDownOpen: !this.state.dropDownOpen,
		})
	}

	//calculates the total number of alerts for a user
	getTotalAlerts(){
		let sum = 0;
		let alertJSX;

		this.props.rooms.forEach(function(room){
			for (var key in room.alerts ) {
				if (key == Meteor.user()._id) {
					sum += room.alerts[key];
					console.log("loop");
					console.log(sum);
				}
			}
		});

		if (sum > 0) {
			alertJSX = <span className='rooms-alert-bubble'>{sum}</span>;
		} else {
			alertJSX = "";
		}
		return alertJSX;
	}

	componentWillUpdate() {
		if(this.props.activeRoom == "" && !this.state.leaveRoomHidden) {
			this.setState({ leaveRoomHidden: true })
		} else if (this.props.activeRoom != "" && this.state.leaveRoomHidden) {
			this.setState({ leaveRoomHidden: false })
		}
	}



	render() {
		const totalAlerts = this.getTotalAlerts(); 

		return(
			<div className="constainer">
				<ButtonDropdown isOpen={this.state.dropDownOpen} toggle={() => this.toggle()}>
					<DropdownToggle caret>
						{totalAlerts}
						<FontAwesome name="users" /> 
						Rooms 
						
					</DropdownToggle>
					<DropdownMenu>
							{this.props.rooms.map((room)=> (
								<DropdownItem 
									key={room._id} 
									onClick={(event) => {
										this.props.selectRoom(room._id); this.toggle();
									}}>
									<FontAwesome name="hashtag" /> {room.room} 
									<AppRoomButtonsAlerts room={room} />
								</DropdownItem>
							))}
							<DropdownItem>
								<Button 
									color="danger"
									onClick={(event) => {this.props.selectRoom("")}} 
									className="float-sm-right"
									hidden={this.state.leaveRoomHidden}>
									Leave Room
								</Button>

							</DropdownItem>
					</DropdownMenu>
				</ButtonDropdown>
			  <Button
	        color="secondary"
	        onClick={this.props.toggleRoomModal}>
	          Create Room
	      </Button>
	      <Button
	      	color="secondary"
	      	onClick={this.props.toggleSubModal}>
	      	Find a Room
	      </Button>
			</div>
		)
	}
}



	

import { 
  Button, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  InputGroup,
  InputGroupAddon,
  Input
} from 'reactstrap';
import React from 'react';

export default class AddRoomModal extends React.Component {


  render() {
    return (
      <div>
        <Modal 
          isOpen={this.props.roomModal} 
          toggle={this.props.toggleRoomModal} 
          className={this.props.className}>
          <ModalHeader 
            toggle={this.props.toggleRoomModal}>
              New Subject
          </ModalHeader>
          <ModalBody>
            <InputGroup>
              <Input 
                placeholder="Room name" 
                id="room-input"/>
            </InputGroup>            
          </ModalBody>
          <ModalFooter>
            <Button 
              color="primary" 
              onClick={this.props.createRoom}>
                Create Room
            </Button>{' '}
            <Button 
              color="secondary" 
              onClick={this.props.toggleRoomModal}>
                Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
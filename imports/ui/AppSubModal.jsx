import { 
  Button,
  Card,
  CardBlock,
  CardTitle,
  Modal, 
  ModalHeader, 
  ModalBody,  
  ModalFooter,
  InputGroup,
  InputGroupAddon,
  Input
} from 'reactstrap';
import React from 'react';

export default class AppSubModal extends React.Component {


  render() {
    return (
      <div>
        <Modal 
          isOpen={this.props.subModal} 
          toggle={this.props.toggleSubModal} 
          className={this.props.className}>
          <ModalHeader 
            toggle={this.props.toggleSubModal}>
              Find a room!
          </ModalHeader>
          <ModalBody>
          
            {this.props.allrooms.map((room) => (
              <Card key={room._id}>
                <CardBlock>
                  <CardTitle>{room.room}</CardTitle>
                  <Button
                    color="primary"
                    onClick={(event)=> {
                      this.props.subToRoom(room._id)
                    }}>
                    Subscribe
                  </Button>
                </CardBlock>
              </Card>
            ))}

          </ModalBody>
          <ModalFooter>
            <Button 
              color="secondary" 
              onClick={this.props.toggleSubModal}>
                Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
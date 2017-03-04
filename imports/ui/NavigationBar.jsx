import React from 'react';
import { 
  Button, 
  Collapse, 
  Navbar, 
  NavbarToggler, 
  NavbarBrand, 
  Nav, 
  NavItem, 
  NavLink 
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';


export default class NavigationBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  
  render() {
    return (
      <div>
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand href="/">
            Double
            <FontAwesome name="keyboard-o" size="2x" />
            Bored
            
          </NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
              	<AccountsUIWrapper 
              		className="account-indicator"
              	/>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}


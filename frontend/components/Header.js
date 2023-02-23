import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, NavbarText ,UncontrolledDropdown, DropdownToggle, DropdownMenu,DropdownItem,Button } from "reactstrap";

import React, { useState } from 'react';

export default function Header () {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

    return(
<div>
      <Navbar expand="sm">
      <NavbarBrand href="/painel">
        <h3>Valg System</h3>
    </NavbarBrand>
        <NavbarToggler onClick={toggle}/>
        <Collapse isOpen={isOpen} navbar >
          <Nav className="me-auto" navbar>
          <NavItem>
              <NavLink href="/inserir-conta">Inserir Conta</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/historico">Histórico</NavLink>
            </NavItem>
          </Nav>
          
        </Collapse>
      </Navbar>
    </div>

        
    )
}
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, NavbarText ,UncontrolledDropdown, DropdownToggle, DropdownMenu,DropdownItem,Button } from "reactstrap";

import React, { useState } from 'react';

export default function Header () {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

    return(
<div>
      <Navbar expand="sm">
      <NavbarBrand href="/">
        <h1>Valg System</h1>
    </NavbarBrand>
        <NavbarToggler onClick={toggle}/>
        <Collapse isOpen={isOpen} navbar >
          <Nav className="me-auto" navbar>
          <NavItem>
              <NavLink href="/">Inserir Conta</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/about">Pesquisar Conta</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/contato">Histórico</NavLink>
            </NavItem>
          </Nav>
          
        </Collapse>
      </Navbar>
    </div>

        
    )
}
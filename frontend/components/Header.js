import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink,UncontrolledDropdown, DropdownToggle, DropdownMenu,DropdownItem,NavbarText } from "reactstrap";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons';

import Image from "next/image";
import Logo from "../public/logo-com-fundo.png";

import React, { useState } from 'react';

export default function Header () {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

    return(
  <div className="hrSty">
        <Navbar expand="sm" className="mt-2 ">
        <NavbarBrand href="/painel">
        <Image src={Logo} width={140} height={52} />
      </NavbarBrand>
          <NavbarToggler onClick={toggle}/>
          <Collapse isOpen={isOpen} navbar >
            <Nav className="me-auto p-2" navbar>
            <NavItem className="navIntem">
                  <NavLink href="/painel">Home</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink href="/historico">Histórico</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                Inventário
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem href="/inventario/grade">Grades</DropdownItem>
                    <DropdownItem href="/inventario/porta-portoes">Portas/Portões</DropdownItem>
                    <DropdownItem  href="/inventario/outros">Outros</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>

          <UncontrolledDropdown
              className="me-2"
              direction="start"
            >
              <DropdownToggle
                caret
                color="primary"
              >
                            <FontAwesomeIcon
            icon={faUser}/>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>
                  Admin
                </DropdownItem>
                <DropdownItem disabled>
                  Usuário
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Sair
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
        </Navbar>
        <hr/>
      </div>

  

    )
}
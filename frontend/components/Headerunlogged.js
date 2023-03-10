import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink,UncontrolledDropdown, DropdownToggle, DropdownMenu,DropdownItem,NavbarText, Button } from "reactstrap";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';

export default function HeaderUnlogged () {

    return(
  <div className="hunlDiv">
    <span></span>
    <h5 className="h3">Valg System</h5>
    <Link href="/login">
      <FontAwesomeIcon icon={faUserCircle} className="arrowToBack"/>
    </Link>



</div>
    )
}
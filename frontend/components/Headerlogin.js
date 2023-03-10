import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink,UncontrolledDropdown, DropdownToggle, DropdownMenu,DropdownItem,NavbarText } from "reactstrap";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft, faArrowLeft, faUser } from '@fortawesome/free-solid-svg-icons';

export default function HeaderUnlogged () {

    return(
  <div className="hunlDiv">
    <Link href="/">
        <FontAwesomeIcon icon={faArrowLeft} className="arrowToBack"/>
    </Link>
    <h5 className="h3">Valg System</h5>
    <span></span>
</div>
    )
}
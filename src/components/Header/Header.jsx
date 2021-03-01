import React from 'react'

//  COMPONENTS
import SideNav from './SideNav/SideNav';
//Styles
import "./header.css"


const Header = props => {

    return ( 
        <header className="header">
            <SideNav {...props} />
        </header>
     );
}
 
export default Header;
import React from 'react'
import { FaFileAlt, FaHome, FaPlay, FaPlayCircle, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import  './sideNav.css'

const SideNavItems = ({icon, text, link}) => {
    const ShowIcon = (icons) => {
        let icon = null;
        switch (icons) {
            case 'home':
                icon = <FaHome />
                break;
            case 'file':
                icon = <FaFileAlt />
                break;
            case 'play':
                icon = <FaPlay />
                break;
            case 'sign-in':
                icon = <FaSignInAlt />
                break;
            case 'sign-out':
                icon = <FaSignOutAlt />
                break;
            default:
               icon = null;
        }

        return icon ;
    }
    
    return ( 
        <div>
            <div className="option">
                   
                <Link to={link} >
                {ShowIcon(icon)}   {text}
                </Link>
            </div>
        </div>
     );
}
 
export default SideNavItems;
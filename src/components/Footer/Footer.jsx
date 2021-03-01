import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../images/nba_logo.png'
import {CURRENT_YEAR} from '../../config'

//Styles
import style from "./footer.module.css"


const Footer = () => {
    return ( 
        <div className={style.footer}>
            <Link to="/" className={style.logo} >
                <img src={Logo} alt="NBA logo"/>
            </Link>
            <div className={style.right}>
                @NBA {CURRENT_YEAR} All rights reserved.
            </div>
        </div>
     );
}
 
export default Footer;
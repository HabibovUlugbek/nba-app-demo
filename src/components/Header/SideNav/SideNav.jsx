import React, {useState} from 'react';
import SideNav, { MenuIcon } from 'react-simple-sidenav';
import { Link , withRouter } from 'react-router-dom'
import Logo from '../../images/nba_logo.png'
import SideNavItems from './SideNavItems';
import {firebase} from '../../../firebase'



const SideNavigation = props => {

    const [showNav, setShowNav] = useState(false)
    const items =[
        {
            icon:`home`,
            text:"Home",
            link:"/",
            login:''
        },
        {
            icon:"file",
            text:"News",
            link:"/news",
            login:''
        },
        {
            icon:"play",
            text:"Videos",
            link:"/videos",
            login:''
        },
        {
            icon:"sign-in",
            text:"Dashboard",
            link:"/dashboard",
            login:false
        },
        {
            icon:"sign-in",
            text:"Sign in",
            link:"/sign-in",
            login:true
        },
        {
            icon:"sign-out",
            text:"Sign out",
            link:"/sign-out",
            login:false
        }
    ]

    const restricted = (item, i) => {
        let template = null;
       if (props.user === null && item.login ) {
           template = <SideNavItems {...item} key={i} onClick={() => {
               firebase.auth().signOut()
               .then(() => {
                   props.history.push("/sign-in")
               })
           }}/>
       }

       if (props.user !== null && !item.login) {
           if (item.link === '/sign-out') {
               template= <SideNavItems {...item} key={i}/>
           }
           else {
               template = <SideNavItems {...item} key={i}/>
           }
           
       }

        return template;
    }

    const showItems = (item , i) => {
        return item.login !== '' ? 
            restricted(item,i)
         : 
           (<SideNavItems {...item} key={i}/>)
    }

    return ( 
        <div>
            <div className="headerOpt">
                <div className="logo">
                    <MenuIcon  onClick={() => setShowNav(true)} />{' '}
                    <Link  to="/"  >
                        <img alt="nba logo" src={Logo} />
                    </Link>
                </div>
                
            </div>
            
            <SideNav
                showNav={showNav}
                onHideNav={() => setShowNav(false)}
                
                navStyle={{
                    background:'#242424',
                    maxWidth:"220px"
                }}
            >
                {items.map((item, i) => 
                  showItems(item, i)  )}
            </SideNav>
                
        </div>
     );
}
 
export default withRouter(SideNavigation);
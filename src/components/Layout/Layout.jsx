import React from 'react'
//  COMPONENTS
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
// Styles
import './layout.css'


const Layout = (props) => {


    return ( 
        <div>
            <Header user={props.user} />
            {props.children}
            <Footer />
        </div>
     );
}
 
export default Layout;
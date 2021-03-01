import React from 'react'
import { Link } from 'react-router-dom'
import styles from './buttons.module.css'

const Buttons = ({type, loadMore , cta , linkTo}) => {

    let template = null ;

    switch (type) {
        case ("loadmore"):
            template =(
                <div className={styles.blue_btn} onClick={loadMore}>
                    {cta}
                </div>
            )
            break;
        case ("linkTo") : 
                template = (
                    <div >
                        <Link className={styles.blue_btn} to={linkTo}>{cta}</Link>
                    </div>
                )
                break;
        default:
          template= null;
    }

    return template;
}
 
export default Buttons;
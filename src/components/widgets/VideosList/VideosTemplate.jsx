import React from 'react';
import styles from "./videosList.module.css";
import { Link } from 'react-router-dom'
import CardInfo from '../CardInfo/CardInfo';



const VideosTemplate = ({data, teams}) => {

    return (
        data.map((item,i) => (
            <Link to={`/videos/${item.id}`} key={i}>
                <div className={styles.videoListItem_wrapper}>
                    <div className={styles.left} 
                    style={{
                        background:`url(/images/videos/${item.image})`
                    }}>
                        <div></div>
                    </div>
                    <div className={styles.right}>
                        <CardInfo teams={teams} date={item.date} team={item.id} />
                        <h2>{item.title}</h2>
                    </div>
                </div>
            </Link>
    ))
    )
}
 
export default VideosTemplate;
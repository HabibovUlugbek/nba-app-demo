import React from 'react'
import styles from "../videosList.module.css";
import VideosTemplate from '../VideosTemplate';

const VideosRelated = ({data, teams}) => {
    return ( 
        <div className={styles.relatdeWrapper}>
            <VideosTemplate data={data} teams={teams} />
        </div>
     );
}
 
export default VideosRelated;

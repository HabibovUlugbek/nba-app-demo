import React from 'react'
import styles from "./cardInfo.module.css";
import {FaClock} from 'react-icons/fa';

const CardInfo = ({date, team , teams}) => {

    const teamName = (teams, team) => {
        let data = teams.find((item) => {
            return item.id === team
        });
        if (data) {
            return data.name
        }
    }

    return ( 
        <div className={styles.cardNfo}>
            <span className={styles.teamName}>
                {teamName(teams, team)}
            </span>
            <span className={styles.date}>
               <FaClock/> {date}
            </span>
        </div>
     );
}
 
export default CardInfo;
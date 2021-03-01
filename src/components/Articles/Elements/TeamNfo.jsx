import React from 'react'
import styles from "../articles.module.css";

const TeamNfo = ({team}) => {
    return ( 
        <div className={styles.articleTeamHeader} >
            <div className={styles.left}
            style={{
                background:`url("../images/teams/${team.logo}")`
            }} 
            ></div>
            <div className={styles.right}>
                <div>
                    <span >{team.city} {team.name}</span>
                </div>
                <div>
                    <strong>
                        W{team.stats[0].wins}-L{team.stats[0].defeats}
                    </strong>
                </div>
            </div>
        </div>
     );
}
 
export default TeamNfo;
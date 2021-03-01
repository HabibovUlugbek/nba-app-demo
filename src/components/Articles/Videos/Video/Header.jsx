import React from 'react'
import TeamNfo from '../../Elements/TeamNfo'
import styles from "../../articles.module.css"


const Header = ({teamData}) => {
    

    const teamNfo = (team) => {
        return team ? (
            <TeamNfo team={team} />
        ) : null;
    }

    return ( 
        <div>
            {teamNfo(teamData)}
        </div>
     );
}
 
export default Header;
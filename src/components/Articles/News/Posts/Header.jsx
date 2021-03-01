import React from 'react'
import TeamNfo from "../../Elements/TeamNfo";
import PostData from '../../Elements/PostData'

const Header = ({teamData , date, author}) => {

    const teamNfo = (team) => {
        return team ? (
            <TeamNfo team={team} /> 
        ) : null;
    }

    const postData = (date, author) => (
        <PostData date={date} author={author} />
    )

    return ( 
        <div>
            {teamNfo(teamData)}
            {postData(date, author)}
        </div>
     );
}
 
export default Header;
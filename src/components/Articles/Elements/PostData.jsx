import React from 'react'
import styles from "../articles.module.css";

const PostData = ({date, author}) => {
    return ( 
        <div className={styles.articlePostData}>
            <div>
                Date: <span>{date}</span>
            </div>
            <div>
                Author: <span>{author}</span>
            </div>
        </div>
     );
}
 
export default PostData;
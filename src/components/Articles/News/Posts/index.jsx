import React, { useState , useEffect} from 'react'
import { firebaseDB, firebaseTeams , firebaseLooper } from "../../../../firebase";

import styles from "../../articles.module.css"
import Header from './Header';

const NewsArticles = ({match}) => {

    const [articles, setArticles] = useState([]);
    const [team, setTeam] = useState([]);

    
    useEffect(() => {
        firebaseDB.ref(`articles/${match.params.id}`).once('value')
        .then((snapshot) => {
            let article = snapshot.val();

            firebaseTeams.orderByChild('id').equalTo(article.team).once('value')
            .then((snapshot) => {
                const team = firebaseLooper(snapshot);
                setTeam(team);
                setArticles(article)
            })
        })
        // axios.get(`http://localhost:3000/articles?id=${match.params.id}`)
        //      .then(res => {
        //          let articles = res.data[0]

        //          axios.get(`http://localhost:3000/teams?id=${articles.team}`)
        //          .then(res => {
        //              setTeam(res.data); setArticles(articles)
        //          })
        //      })
    }, [match.params.id])


    return ( 
        <div className={styles.articleWrapper}>
           <Header  teamData={team[0]} 
                    date={articles.date}
                    author={articles.author} />
           <div className={styles.articleBody} >
                <h1>{articles.title}</h1>
                <div className={styles.articleImage}
                style={{
                    background:`url(../images/articles/${articles.image})`
                }} ></div>
                <div className={styles.articleText}>
                    {articles.body}
                </div>
           </div>
        </div>
     );
}
 
export default NewsArticles;
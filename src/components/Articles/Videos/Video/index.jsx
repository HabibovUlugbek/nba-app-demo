import React, { useState , useEffect } from 'react'
import styles from "../../articles.module.css";
import axios from "axios";
import Header from "./Header";
import VideosRelated from '../../../widgets/VideosList/VideoRelated/VideosRelated';
import { firebaseTeams , firebaseDB , firebaseLooper , firebaseVideos} from "../../../../firebase";

const VideoArticle = ({match}) => {

    const [article, setArticle] = useState([]);
    const [team, setTeam] = useState([]);
    const [teams, setTeams] = useState([]);
    const [related, setRelated] = useState([])

    useEffect(() => {

        firebaseDB.ref(`videos/${match.params.id}`).once('value')
        .then((snapshot) => {
            let article = snapshot.val();

            firebaseTeams.orderByChild('id').equalTo(article.team).once('value')
            .then((snapshot) => {
                const team = firebaseLooper(snapshot);
                setTeam(team);
                setArticle(article)
                getRelated(article)
            })
        })
        // axios.get(`http://localhost:3000/videos?id=${match.params.id}`)
        //      .then(res => {
        //          let articles = res.data[0]

        //          axios.get(`http://localhost:3000/teams?id=${articles.team}`)
        //          .then(res => {
        //              setTeam(res.data); setArticle(articles);
        //              getRelated(res.data)
        //          })
        //      })
    }, [match.params.id])

    const getRelated = (article) => {

        firebaseTeams.once('value')
        .then((snapshot) => {
            const teams = firebaseLooper(snapshot)
            firebaseVideos.orderByChild("team").equalTo(article.team).limitToFirst(3).once('value')
            .then((snapshot) => {
                const related = firebaseLooper(snapshot)

                setTeams(teams);
                setRelated(related)
            })

        })
        // axios.get(`http://localhost:3000/teams`)
        // .then(res => {
        //     let teams = res.data;
        //     axios.get(`http://localhost:3000/videos?k=${team[0].city}&_limit=3`)
        //          .then(res => { console.log(res.data)
        //              setTeams(teams);
        //              setRelated(res.data)
        //          } )
        // })
    }

    return (
        <div>
           <Header  teamData={team[0]}/>
           <div className={styles.videoWrapper} >
                <h1>{article.title}</h1>
                <iframe 
                title="videoplayer"
                width="100%"
                height="300px"
                src={`https://www.youtube.com/embed/${article.url}`}></iframe>
           </div>
           <VideosRelated data={related}
           teams={teams} />
        </div>
      );
} 

export default VideoArticle;
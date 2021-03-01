import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Button from '../Buttons/Button'
import styles from "./videosList.module.css";
import VideosTemplate from './VideosTemplate';
import { firebaseTeams, firebaseVideos , firebaseLooper} from "../../../firebase";

const VideoList = ({start, amount, title,  loadmore, type}) => {


    const [teams, setTeams] = useState([]);
    const [videos, setVideos] = useState([]);
    const [startList, setStartList] = useState(start);
    const [end, setEnd] = useState(start + amount)


    useEffect(() => {
        request(startList, end)
    }, [startList, end])

    const request = (start,end) => {
        if (teams.length < 1) {
            firebaseTeams.once('value').
            then((snapshot) => {
                const teams = firebaseLooper(snapshot);
                setTeams(teams)
            })
            // axios.get(`http://localhost:3000/teams`)
            //      .then(res => setTeams(res.data))
        }

        firebaseVideos.orderByChild("id").startAt(start).endAt(end).once("value")
        .then ((snapshot) => {
           const video =  firebaseLooper(snapshot);
            setVideos([...videos, ...video])
            setStartList(start)
            setEnd(end)
        }).catch(e => console.log(e))
        // axios.get(`http://localhost:3000/videos?_start=${start}&_end=${end}`)
        //      .then(res => setVideos([...videos, ...res.data]),
        //      setStartList(start),
        //      setEnd(end))
    }

    const renderVideos = () => {
        let template = null;

        switch (type) {
            case ("card"):
                template = <VideosTemplate data={videos} teams={teams} />
                break;
        
            default:
                template=null ;
        }
        return template;
    }

    const loadMore = () => {
        let start= end +1 ;
        let ended = end + amount;
        request(start,ended);
    }

    const renderButton = () => {
        return loadmore ? <Button type="loadmore" loadMore={() => loadMore()} cta="Load More Videos" />
         : 
         <Button type="linkTo" cta="More videos" linkTo="/videos" /> ;
    }

    const renderTitle = () =>{
        return title ? <h3><strong>NBA</strong> Videos</h3> : null;
    }

    return ( 
        
        <div className={styles.videoList_wrapper} >
            {renderTitle()}
            {renderVideos()}
            {renderButton()}
        </div>
     );
}
 
export default VideoList;
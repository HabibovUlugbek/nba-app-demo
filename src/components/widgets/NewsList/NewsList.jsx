import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import styles from "./newsList.module.css"
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Button from '../Buttons/Button'
import CardInfo from '../CardInfo/CardInfo';
import { firebaseTeams, firebaseArticles, firebaseLooper } from "../../../firebase";

const NewsList = ({type, start, amount}) => {

    const [teams, setTeams] = useState([]);
    const [items, setItems] = useState([]);
    const [startList, setStartList] = useState(start)
    const [end, setEnd] = useState(start + amount)

    
    useEffect(() => {
        request(startList, end)
    }, [startList, end])


    const request = (start, end ) => {
        if (teams.length < 1) {
            firebaseTeams.once('value').
            then((snapshot) => {
                const teams = firebaseLooper(snapshot);
                setTeams(teams)
            })
            // axios.get(`http://localhost:3000/teams`)
            //      .then(res => setTeams(res.data))
        }

        firebaseArticles.orderByChild("id").startAt(start).endAt(end).once("value")
        .then ((snapshot) => {
           const articles =  firebaseLooper(snapshot);
            setItems([...items, ...articles])
            setStartList(start)
            setEnd(end)
        }).catch(e => console.log(e))
        // axios.get(`http://localhost:3000/articles?_start=${start}&_end=${end}`)
        //     .then(res => setItems([...items, ...res.data]),
        //     setStartList(start),
        //     setEnd(end))
    }

    const loadMore = () => {
        let loadstart = end + 1;
        let loadend = end + amount;
        request(loadstart, loadend)
    }

    const renderNews = type => {
        let template= null;
        
        switch (type) {
            case ("card"):
                template = items.map((item, i) => (

                    <CSSTransition 
                        classNames={{
                            enter:styles.newsList_wrapper,
                            enterActive:styles.newsList_wrapper_enter
                        }}
                        timeout={500}
                        key={i}
                        >
                        <div>
                            <div className={styles.newslist_item}>
                                <Link to={`/articles/${item.id}`}>
                                    <CardInfo teams={teams} team={item.id} date={item.date} />
                                    <h2>{item.title}</h2>
                                </Link>
                            </div>
                        </div>
                    </CSSTransition>

                ))
                break;
            case("cardMain"):
                template = items.map((item, i) => (
                    <CSSTransition 
                        classNames={{
                            enter:styles.newsList_wrapper,
                            enterActive:styles.newsList_wrapper_enter
                        }}
                        timeout={500}
                        key={i}
                        >
                            <Link to={`/articles/${item.id}`}>
                                <div className={styles.flex_wrapper} >
                                    <div className={styles.left} 
                                    style={{background: `url("../images/articles/${item.image}")`}}>
                                        <div></div>
                                    </div>
                                    <div className={styles.right}>
                                        <CardInfo teams={teams} team={item.id} date={item.date} />
                                        <h2>{item.title}</h2>
                                    </div>
                                </div>
                            </Link>
                        </CSSTransition>
                ))
                break;
            default:
                template= null;
        }
        return template;
    }

    return ( 
        <div>
            <TransitionGroup
                component="div"
                className="list">
                {renderNews(type)}
            </TransitionGroup>
            <Button 
                type="loadmore"
                loadMore={() => loadMore()}
                cta="Load More News" />
        </div>
     );
}
 
export default NewsList;
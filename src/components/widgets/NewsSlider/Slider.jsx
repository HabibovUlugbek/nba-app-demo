import React, {useState , useEffect} from 'react'
import SliderTemplates from './SliderTemplates'
import {firebaseArticles , firebaseLooper } from '../../../firebase'


const NewsSlider = ({type, start, amount, settings}) => {

    const [news, setNews] = useState([])

    useEffect(() => {

        firebaseArticles.limitToFirst(3).once('value')
        .then((snapshot) => {
            const news= firebaseLooper(snapshot); 
            setNews(news)
        })
        // axios.get(`http://localhost:3000/articles?_start=${start}&_end=${amount}`)
        //      .then(res => setNews([...res.data]))
    }, [start, amount])

    return ( 
        <div>
            <SliderTemplates data={news} type={type}  setting={settings}/>
        </div>
     );
}
 
export default NewsSlider;
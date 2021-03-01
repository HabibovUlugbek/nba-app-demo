import React from 'react'
import NewsList from '../widgets/NewsList/NewsList'
import NewsSlider from '../widgets/NewsSlider/Slider'
import VideosList from "../widgets/VideosList/VideosList";


const Home = () => {
    return ( 
    <div>
       <NewsSlider
       type="featured"
       start={0}
       amount={3}
       settings={{
           dots:false
       }} />

       <NewsList
        type="card"
        loadmore={true}
        start={3}
        amount={3} />

        <VideosList 
        type="card"
        title={true}
        loadmore={true}
        start={0}
        amount={3} />
    </div> );
}
 
export default Home;
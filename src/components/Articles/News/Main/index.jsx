import React from 'react'
import NewsList from '../../../widgets/NewsList/NewsList';
import NewsSlider from '../../../widgets/NewsSlider/Slider';


const NewsMain = () => {
    return ( 
        <div>
            <NewsSlider type="featured" settings={{dots:false}} start={0} amount={3} />
            <NewsList type="cardMain" start={3} amount={4} />
        </div>
     );
}
 
export default NewsMain;
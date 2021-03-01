import React from 'react'
import VideosList from '../../../widgets/VideosList/VideosList'


const VideosMain = () => {
    return ( 
        <div>
            <VideosList start={0} amount={6} type="card" loadmore={true} title={false} />
        </div>
     );
}
 
export default VideosMain;
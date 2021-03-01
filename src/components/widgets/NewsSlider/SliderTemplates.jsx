import React from 'react'
import { Link } from 'react-router-dom';
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./slider.module.css";


const SliderTemplate = ({data , type, setting}) => {
    
    let template = null;
    const settings = {
        dots:true,
        infinite:true,
        arrows:false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        ...setting
    }

    switch (type) {
        case ('featured'):
            template = data.map(function(item,i) {
                return (
                    <div key={i}>
                        <div className={styles.featured_item}>
                            <div className={styles.featured_image}
                                style={{
                                    backgroundImage:`url(../images/articles/${item.image})`
                                }}></div>
                                <Link to={`/articles/${item.id}`} >
                                    <div className={styles.featured_caption}>
                                        {item.title}
                                    </div>
                                </Link>
                        </div>
                    </div>
                )
            })
            break;
    
        default:
          template=null ; 
    }
    return ( 
        <Slick {...settings}>
            {template}
        </Slick>
     );
}
 
export default SliderTemplate;
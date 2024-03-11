import React from 'react';
import { Carousel } from 'antd';

function ImageSlider(props){

    return (

        <Carousel autoplay>
          {/* {console.log(props.images)} */}
            {props.images[0].map((image, index) => (
                    <div key={index}>
                        <img style={{ width: '100%', maxHeight: '150px' }}
                          
                            src={`http://localhost:6200/${image}`} alt="productImage" />
                    </div>
                ))}
        </Carousel>

    )

}
export default ImageSlider;

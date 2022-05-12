import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

import './slidestyle.css'


function Slide(){
    return(
      <div className="APP">
        {/* for (let i = 0; i < -1; i++) { */}
          <AliceCarousel  autoPlay autoPlayInterval="2000" className="con">
          <img src="ele.jpeg" className="sliderimg"/>
          <img src="car.jpg" className="sliderimg"/>
          <img src="clo.jpg" className="sliderimg"/>
          <img src="ele.jpeg" className="sliderimg"/>
          <img src="ele.jpg" className="sliderimg"/>
        </AliceCarousel>
          
        {/* } */}
      
      </div>
    )
}
export default Slide;
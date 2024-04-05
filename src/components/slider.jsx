import React, {useState, useEffect, useRef} from 'react'
import {motion} from 'framer-motion'
import ProgressBar from './progressBar';
import { PiDotsThreeVertical } from 'react-icons/pi';
//import Images from '../assets/Images'


function Slider(props) {

    const [width,setWidth] = useState(0);
    //const carousel = useRef();
    var refWidth;
    function widthCalculate() {
        if(props.carousel.current.scrollWidth < 400){
            return refWidth = props.carousel.current.scrollWidth * 5.2
        }else{
            return props.carousel.current.scrollWidth
        }
    }

    useEffect(() => {
    
        console.log(props.carousel.current.scrollWidth, props.carousel.current.offsetWidth)
        setWidth(widthCalculate() - props.carousel.current.offsetWidth)
    }, [])

  return (
   <>
    <motion.div ref={props.carousel} className='carousel' whileTap={{cursor :"grabbing"}}>
        <motion.div drag="x" dragConstraints={{right: 0, left: -width}} className='inner-carousel'>
            {props.mySensLength.map((sens, i) => {
                return(
                        <motion.div className='Item' key={i}>
                            <PiDotsThreeVertical className='dotsSlider'/>
                                <div className="divItem">
                            {/*<img src={image} alt=""/>*/} 
                                    <h1 className="h1SliderItem">{sens}</h1>
                                    <ProgressBar className="ProgressBar2" percentage={props.DataSens[i]} circleWidth="140" MaxVal={4096} />
                                </div>
                        </motion.div>
                )
            })}
        </motion.div>
    </motion.div>
   </>
  )
}

export default Slider
import React from 'react'
import '../App.css';
import { motion } from 'framer-motion';
export default function Popup(props) {
    const[timeup,settimeup]=React.useState(props.time);

  React.useEffect(() => {
    const timer = setInterval(() => {
      settimeup((prevtimeup) => prevtimeup - 1);
    }, 1000);
  
    if (timeup === 0) {
        props.setShow(false);
        props.setPopupMessage("");
        props.setpopupShow(false);
      clearInterval(timer);
    }
  
    return () => clearInterval(timer);
  }, [timeup]);
  return (
    <motion.div className='popup'
    initial={{y:100,opacity:0}}
    animate={{y:0,opacity:1}}
    exit={{
      y:100,
      opacity:0,
      transition:{
         duration:0.5
      }
    }}
    >
       {/* <p>Disappearing in {props.time}</p>  */}
       {props.time===10?<p>Disappearing in {timeup} sec</p>:<p>{props.popupMessage}</p>} 
       {/* <p>{props.popupMessage}</p> */}
    </motion.div>
  )
}

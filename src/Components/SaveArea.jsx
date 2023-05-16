import React,{useState} from 'react'
import '../App.css';
import {messageEncryption,keyEncryption} from '../Functions/Encrypt'
import { walletContext } from '../App';
import Popup from './Popup';
import { AnimatePresence } from 'framer-motion';

export default function SaveArea() {
  const { value1, value2, value3 } = React.useContext(walletContext);
  const [account, setAccount] =value1;
  const[contract,setContract]=value3
  const [key,setKey]=React.useState("")
  const [show, setShow] = useState(false);

  const [message, setMessage] = useState('');
  const [time, settime] = useState(5)
  const[popupMessage,setPopupMessage]=useState("");
  const [popupShow, setpopupShow] = useState(false);

  const SaveFun=async()=>{
    if(key===""){
      setPopupMessage("Bruh Enter Key 🙄✍")
      settime(5);
      setpopupShow(true);
      return;
    }
    if(message===""){
      setPopupMessage("Bruh Enter Secret 🙄✍")
      settime(5);
      setpopupShow(true);
      return;

    }


    try{

    const ekey=keyEncryption(key);
    const{emessage}=await messageEncryption(message,account.address)
    console.log("key",ekey)
    console.log("Message",emessage);
    console.log(contract);
    const tx=await contract.storePasswords(ekey,emessage).then((res)=>{
      setShow(true);
      setKey("");
      setMessage("");

      setPopupMessage("Password Saved Successfully ✅🛫")
      settime(9);
      setpopupShow(true);
    });
  }catch(e){
    console.log(e);
    setPopupMessage("😵 Please Refresh the Page 🥴")
        settime(5);
        setpopupShow(true);
        return;
  }

    
  
   
  }
  
  

  
  return (
    < >
       
        <div className='inputArea'>
            <div className='keyArea' id="keyId"><input className='keyField' value={key} onChange={(e)=>{setKey(e.target.value)}} placeholder='Enter Key' type="text"></input></div>
            <div><textarea id="secretsId" placeholder='Enter the Secrets' value={message} onChange={(e)=>{setMessage(e.target.value)}} className='secrets' rows="5" cols="50"></textarea></div>
        </div>
        <div className='saveArea'>
            <button onClick={SaveFun} className='saveBtn'>Save</button>
        </div>
        <AnimatePresence>

       {popupShow?<Popup time={time} setpopupShow={setpopupShow} popupMessage={popupMessage} setShow={setShow} setPopupMessage={setPopupMessage}></Popup>:null}
        </AnimatePresence>

    </>
  )
}

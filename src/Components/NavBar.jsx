import React from 'react'
import '../App.css';
import { walletContext } from '../App';

export default function NavBar(props) {
  const {value4, value5 } = React.useContext(walletContext);
  const[chainId,setChainId]=value4;
  const[contactAddress,setContractAddress]=value5;
  const[selectedNetwork,setSelectedNetwork]=React.useState(1);

  const ChangeNetwork=(network)=>{
    if(network==="Sepolia"){
      setSelectedNetwork(1);
      setChainId(11155111);
      // setContractAddress(0x8794D7BB1F18C324382Db3139E3b260130d3c3ed)

    }else{
      setSelectedNetwork(2);
      // setContractAddress(0x8794D7BB1F18C324382Db3139E3b260130d3c3ed)
      setChainId(137)


    }
  }


  return (
    <>
    <div className='logo'><label>BOSS</label><label>Bank Of SecretS</label></div>
    <div className='level-1'>
       <div className={selectedNetwork===1?"network selectedNetwork":"network"} onClick={()=>ChangeNetwork("Sepolia")}><label>Sepolia</label><label>Test Network</label></div>
       <div className={selectedNetwork===2?"network selectedNetwork":"network"} onClick={()=>ChangeNetwork("Polygon")}><label>Polygon</label><label>Main Network</label></div>
      </div>
    </>
  )
}

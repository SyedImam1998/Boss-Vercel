import React from 'react'
import './App.css';
import MainArea from './Components/MainArea';
import NavBar from './Components/NavBar';
import { ethers,Contract } from "ethers";
import Boss_Abi from '../../Back-end/artifacts/contracts/Boss.sol/Boss.json';
import Web3 from 'web3';
import Popup from './Components/Popup';
export const walletContext=React.createContext();
import Coffee from './assets/coffee.png';


const contractAddress="0x5FbDB2315678afecb367f032d93F642f64180aa3";
// const contractAbi=Boss_Abi.abi;
const contractAbi=[
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "passwordSaved",
    "type": "event"
  },
  {
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "key",
        "type": "string"
      }
    ],
    "name": "getPassword",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "gg",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "giveName",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "passwordLocker",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      }
    ],
    "name": "setName",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "key",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "password",
        "type": "string"
      }
    ],
    "name": "storePasswords",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
];


export default function App() {
  const [provider, setProvider] =React.useState();
  const [account, setAccount] =React. useState();
  const[chainId,setChainId]=React.useState(11155111);
  // const[chainId,setChainId]=React.useState(5);
  const[contractAddress,setContractAddress]=React.useState("0x8794D7BB1F18C324382Db3139E3b260130d3c3ed")
  const [contract, setContract] = React.useState();




  const changeNetwork = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
          params: [{ chainId: Web3.utils.toHex(chainId) }],
        });
        }
      catch (error) {
        console.error(error);
      }
    }
  }
  

 const connectWallet=async()=>{
  try{
      const accounts=await window.ethereum.request({
        method:"eth_requestAccounts",
        
      });
    const provider = new ethers.BrowserProvider(window.ethereum);
    setProvider(provider);
    const  signer = await provider.getSigner();
    setAccount(signer);
    const contractInstance = new ethers.Contract(contractAddress,contractAbi, signer);
    setContract(contractInstance);
    

    }catch(error){
      console.log(error)
      alert("something went wrong #1");
    }

    
   

  }
  

  const handleNetworkChange = () => {
    window.location.reload();
  };


  React.useEffect(()=>{
    if(window.ethereum){
      console.log("Metamask Detected!!!!");


      window.ethereum.on("accountsChanged", handleNetworkChange);
      window.ethereum.on("chainChanged", handleNetworkChange);


      changeNetwork().then(()=>{
        connectWallet();

      });
      
    
      

    }else{
      alert("Please install Metamask!!!")
    }
    return () => {
      window.ethereum.removeListener("accountsChanged", handleNetworkChange);
      window.ethereum.removeListener("chainChanged", handleNetworkChange);
    };

  },[chainId,contractAddress])
  return (
    <div className='parent'>
      <walletContext.Provider value={{value1:[account,setAccount],value2:[provider,setProvider],value3:[contract,setContract],value4:[chainId,setChainId],value5:[contractAddress,setContractAddress]}}>

      <NavBar changeNetworkFunction={changeNetwork}></NavBar>
      <MainArea></MainArea>
      
      </walletContext.Provider>
      <div className='coffee'>
      <a href="https://www.buymeacoffee.com/syedimam" target="_blank">
        <img width={30} src={Coffee}>
          </img>
          </a>
          </div>
    </div>
  )
}
      
       
       




import { ethers,hexlify } from "ethers";
import {
 encrypt
} from '@metamask/eth-sig-util';


export const Decrypt=async(ekey,contract,account)=>{

   
 
    const value=await contract.passwordLocker(ekey);
    const dMessage=await window.ethereum.request({method: 'eth_decrypt',params: [value,account], });
    console.log(dMessage);

    
    
    }
    
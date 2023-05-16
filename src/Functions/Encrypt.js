// const { utils } = require("ethers");
import { ethers,hexlify,keccak256,toUtf8Bytes } from "ethers";
import {
 encrypt
} from '@metamask/eth-sig-util';

export const messageEncryption=async(message,account)=>{  
    let encryptionPublicKey;

    await window.ethereum.request({
      method:'eth_getEncryptionPublicKey',
      params:[account],
    }).then((result)=>{
      encryptionPublicKey=result;
      console.log("pubENKEY",encryptionPublicKey)
    }).catch((error) => {
      if (error.code === 4001) {
        // EIP-1193 userRejectedRequest error
        console.log("We can't encrypt anything without the key.");
      } else {
        console.error(error);
      }
    });
    
    
    
    var emessage = stringifiableToHex(encrypt({
      publicKey: encryptionPublicKey,
      data: message,
      version: 'x25519-xsalsa20-poly1305',
    }));


    console.log("textMsg",emessage);
    return {
      emessage
    };
   
      
   
     
    }
    
    const stringifiableToHex=(value)=>{
      
   
      // return web3.utils.toHex(Buffer.from(JSON.stringify(value)),'utf8');
     return hexlify(Buffer.from(JSON.stringify(value), "utf8"));
    }


export const keyEncryption=(key)=>{
  return keccak256(toUtf8Bytes(key));


} 
import React, { useState } from "react";
import { keyEncryption } from "../Functions/Encrypt";
import { walletContext } from "../App";
import Boss_Abi from "../../../Back-end/artifacts/contracts/Boss.sol/Boss.json";
import { ethers, Contract } from "ethers";
import Popup from "./Popup";
import { AnimatePresence, motion } from "framer-motion";

// import {Decrypt} from '../Functions/Decrypt';

export default function ViewArea() {
  const { value1, value2, value3 } = React.useContext(walletContext);
  const [account, setAccount] = value1;
  const [contract, setContract] = value3;
  const [nkey, setKey] = useState("");
  const [show, setShow] = React.useState(false);
  const [message, setmessage] = useState("");
  const [time, settime] = useState(5);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupShow, setpopupShow] = useState(false);

  const DecryptMessage = async () => {
    try {
      if (nkey === "") {
        setPopupMessage("Bruh give Input 🙄✍");
        settime(5);
        setpopupShow(true);
        return;
      }
      console.log(nkey);
      const ekey = keyEncryption(nkey);
      console.log(ekey);

      const value = await contract.getPassword(ekey);
      const dMessage = await window.ethereum.request({
        method: "eth_decrypt",
        params: [value, account.address],
      });
      console.log(dMessage);
      // document.getElementById("viewtextArea").value=dMessage;
      setmessage(dMessage);
      setShow(true);
      // setPopupMessage("Disappearing in ")
      settime(10);
      setpopupShow(true);
    } catch (error) {
      console.log(error.message);
      if (error.message === "This message cannot be decrypted") {
        setPopupMessage("😑No Passwords Found !!!😑");
        settime(5);
        setpopupShow(true);
        return;
      } else {
        setPopupMessage("😵Please Refresh the Page 🥴");
        settime(5);
        setpopupShow(true);
        return;
      }
    }
  };
  return (
    <>
      <motion.div
        className="inputArea"
        layout
        style={{ overflow: "hidden" }}
        animate={{ height: "auto" }}
        transition={{
          layout: { duration: 0.3 },
        }}
      >
        <div className="keyArea">
          <input
            onChange={(e) => {
              setKey(e.target.value);
            }}
            className="keyField"
            placeholder="Enter Key"
            type="text"
          ></input>
        </div>
        <AnimatePresence>
          {show && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
            >
              <textarea
                id="viewtextArea"
                value={message}
                disabled
                className="secrets"
                rows="5"
                cols="50"
              ></textarea>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <div className="saveArea">
        <button className="saveBtn" onClick={DecryptMessage}>
          View
        </button>
      </div>
      <AnimatePresence>
        {popupShow && (
          <Popup
            time={time}
            setShow={setShow}
            setPopupMessage={setPopupMessage}
            popupMessage={popupMessage}
            setpopupShow={setpopupShow}
          ></Popup>
        )}
      </AnimatePresence>
      {/* <Popup></Popup> */}
    </>
  );
}

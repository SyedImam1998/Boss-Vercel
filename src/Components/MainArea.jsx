import React from "react";
import "../App.css";
import SaveArea from "./SaveArea";
import ViewArea from "./ViewArea";
import { motion } from "framer-motion";

export default function MainArea() {
  const tabs = [{ name: "Save" }, { name: "View" }];
  const [selectedItem, setselectedItem] = React.useState(tabs[0]);

  
  return (
    <motion.div
      layout
      style={{ overflow: "hidden"}}
      animate={{height:"auto"}}
      transition={{
        layout: { duration: 0.3 },
      }}
      className="mainArea"
    >
      <div className="subNav">
        {tabs.map((item) => {
          return (
            <li
              className={`${item.name === selectedItem.name?"opacityFull":"opacityHalf"}`}
              onClick={() => {
                setselectedItem(item);
               
              }}
            >
              {item.name}
              {item.name === selectedItem.name ? (
                <div className="underline" layoutId="underline" />
              ) : null}
            </li>
          );
        })}
      </div>
      {
      
      selectedItem.name==="Save" 
      ? 
      <SaveArea></SaveArea> 
      : 
      <ViewArea></ViewArea>
      
      }
    </motion.div>
  );
}

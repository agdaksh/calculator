import React from "react";

export default function Button(props) {
    return (
      <button className={props.className} onClick={()=>{
        props.onBTNClick(props.value);
      }}>
        {props.value}
      </button>
    );
  };
  
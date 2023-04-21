import React from "react";


function Screen(props) {
    return (
      <div className="screen" mode="single" max={70}>
        {props.value}
      </div>
    );
  };
  
  export default Screen;
 
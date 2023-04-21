import Wrapper from "./Wrapper";
import Screen from "./Screen";
import ButtonBox from "./ButtonBox";
import Button from "./Button";
import React, {useState} from "react";


const btnValues = [
  ["C", "BKP", "+-", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

 export default function App() {
   const [prevCalc,setCalc]= useState({
    sign:"",
    num:"",
    res:""
   })
//function to input any integer number between 0-9
   function numberHandler(value){
    
      setCalc({
        ...prevCalc,
        num : prevCalc.num==="0"&&value==="0"? "0" 
        : prevCalc.num%1 === "0"? Number(prevCalc.num + value)
        : prevCalc.num+value,
        
      })
//function to be performed when you click the equal button 
     
   }
   function equalHandler(event){
       function calculate(num1,num2,sign){return(
         sign==="+"?num1+num2
         :sign === "/"?num1/num2
         :sign=== "-"?num1-num2
         : num1*num2)
       }
       setCalc({
        ...prevCalc,
        res: prevCalc.sign==="/"&&prevCalc.num==="0"?"cannot divide by 0": calculate(Number(prevCalc.res),Number(prevCalc.num),prevCalc.sign),
        num:"",
        sign:""
       })
   }

 //function to handle the mathematical signs  
   function signHandler(value){
    
        setCalc({
          ...prevCalc,
          sign : value,
          res: !prevCalc.res && prevCalc.num ? prevCalc.num : prevCalc.res,
          num : ""
        })
   }

 //function to backspace your current number on the calculator screen  
   function bkpHandler(value){
        setCalc({
          ...prevCalc,
          num: prevCalc.num? prevCalc.num.slice(0,prevCalc.num.length -1) : prevCalc.num
        })
   }
 //function to clear the calculator screen  
   function clearHandler(event){
       setCalc({
        sign:"",
        num:"",
        res:""
       })
   }
  //function to negate the displayed number on the calculator screen 
   function negationHandler(value){
       setCalc({
        ...prevCalc,
        num : prevCalc.num ? -1 * Number(prevCalc.num) : "",
        res: prevCalc.res&&prevCalc.num ? prevCalc.res : -1 * Number(prevCalc.res)
       })
   }
   //function to add a decimal point and also keep a check to not add more than one decimal point in the number
   function decimalHandler(value){
      setCalc({
        ...prevCalc,
        num: Number(prevCalc.num)%1===0?prevCalc.num+value:prevCalc.num
      })
   }

  //main body
  return (
    //wrapper is react component that is the whole calculator body
    //screen is a react component where the number you enter and the solution to your problem is displayed
    //button is a react component that displays all the button in the constant BTNvalues above using a map function
    //buttonbox is a react component that hold all the buttons in it under the screen component
    <Wrapper>
      <Screen value={prevCalc.num ?prevCalc.num:prevCalc.res} />
      <ButtonBox>
        {
          btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                className={btn === "=" ? "equals" : ""}
                value={btn}
                onBTNClick={btn === "="? equalHandler
                : btn === "X"||btn==="/"||btn==="-"||btn==="+" ? signHandler
                : btn==="BKP"?bkpHandler
                :btn==="C"?clearHandler
                :btn==="+-"?negationHandler
                :btn==="."?decimalHandler
                :numberHandler
                }
              />
            );
          })
        }
      </ButtonBox>
    </Wrapper>
  );
};



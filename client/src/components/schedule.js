import { useEffect,useState,useRef,useReducer  } from "react";
import styled from "styled-components";

 function Schedule() {
    let ScheduleBody = styled.div`
    border: 1px solid black;
    // padding: 20px 20px 20px 20px;
     display: flex;
     justify-content: center;
     align-items: center;
     padding-bottom: 10px;
     background-color: white;
     border-radius: 10px; 
    margin:20px 20px;
    padding:10px;
    justify-content: space-between;
    height: 80px;
     `
   return(
       <div style={{ justifyContent: 'center'}}>
       <ScheduleBody>
           <div style={{display:'flex', paddingLeft:'15px'}}>
               <h2>무언가할일1111133334444</h2>
           </div>
           <div style={{display:'flex',flexDirection:'column'}}>
               <div style={{display:'flex',paddingTop:'5px'}}>
                    <div style={{paddingRight:'5px' ,color:'grey'}}>2021-11-05~</div>
                    <div style={{paddingRight:'5px' ,color:'grey'}}>2021-12-06</div>
               </div>
               <div style={{display:'flex',paddingTop:'60px'}}>
                    <div style={{paddingRight:'5px' ,color:'grey'}}>수정</div>
                    <div style={{paddingRight:'5px' ,color:'grey'}}>삭제</div>
               </div>
           </div>
       </ScheduleBody>
       </div>
   )
  }
export default Schedule
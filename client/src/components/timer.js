
import { useEffect,useState,useRef,useReducer  } from "react";
import styled from "styled-components";

 function Timer() {

    let TimerContainer = styled.div`
    // padding: 20px 20px 20px 20px;
     display: flex;
     justify-content: space-between;
     padding-left:20px;
     width: 80%;
     `
     let Body = styled.div`
     border: 1px solid black;
     // padding: 20px 20px 20px 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-bottom: 10px;
      background-color: white;
      border-radius: 10px;
      `
    const [timer, setTimer] = useState(40);
    const calibrationTime = useRef();
  
    const startTimer = () => {
      const difference = (Date.now() + 1000) - calibrationTime.current; // 발생한 오차를 계산합니다.
      calibrationTime.current += 1000; // 1초 이후의 값이 기준이 되도록 변경합니다.
       console.log('ticking')
       
      setTimer((time) => time -1);
      setTimeout(startTimer, 1000 - difference); // 오차만큼 지연 시간을 보정해줍니다.
      
    };
    
    const timer2 = () =>{
        console.log(Date.now())
        calibrationTime.current = Date.now(); // 기준이 되는 시간을 설정합니다.
        startTimer();
    }
    return(
        <div style={{paddingLeft:'20px', paddingRight:'20px'}}>
    <Body>
        <TimerContainer>
        <div style={{display:'flex'}}>
            <h2>{timer}</h2>
            <h2 style={{paddingLeft:'20px'}}>dsdsdsds</h2>
            
        </div>
        <div>
            <div style={{display:'flex'}}>
                <div>수정</div>
                <div>삭제</div>
            </div>
            <button onClick={timer2}>시작</button>
        </div>
        </TimerContainer>
         <input style={{width:'88%',height:'140px'}}>
         </input>
    </Body>
    </div>
    )
  }
export default Timer
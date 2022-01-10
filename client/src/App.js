import './App.css';
import Header from './components/header'
import Calender from './components/calender'
import SelectYearMonth from './components/selectYearMonth'
import TimerContainer from './components/timerContainer'
import ScheduleContainer from './components/scheduleContainer'
import CheckListContainer from './components/checkListContainer'
import Weather from './pages/weather'
import React, {useState, useEffect} from 'react';
import store from './redux/store/store';
import { Provider } from 'react-redux';


function App() {
  const [schedule, setSchedule] = useState('black');
  const [checkList, setCheckList] = useState('grey');
  const [timer, setTimer] = useState('grey');
  const [category, setCategory] = useState(0);
  const clickList=(e)=>{
    console.log(e.target.innerHTML)
    if(e.target.innerHTML==='스케줄'){
     console.log('hi!!')
     setSchedule('black')
     setCheckList('grey')
     setTimer('grey')
     setCategory(0)
    }
    else if (e.target.innerHTML === '체크리스트'){
      setSchedule('grey')
     setCheckList('black')
     setTimer('grey')
     setCategory(1)
    }
    else if (e.target.innerHTML === '타이머'){
      setSchedule('grey')
     setCheckList('grey')
     setTimer('black')
     setCategory(2)
    }
  }
  const getLocation=()=> {
    if (navigator.geolocation) { // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(function(position) {
        alert(position.coords.latitude + ' ' + position.coords.longitude);
      }, function(error) {
        console.error(error);
      }, {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity
      });
    } else {
      alert('GPS를 지원하지 않습니다');
    }
  }
  
  return (
    
    <div className="App" style={{ backgroundColor:'#EDEAEA',display:'flex'}}>
      <div >
        <Header/>
        <Calender/>
        {/* <SelectYearMonth/> */}
        <hr style={{width:'90%'}} />
        <br/>
        <div style={{display:'flex',justifyContent:'space-between',paddingLeft:'6%',paddingRight:'6%'}}>
          <div onClick={getLocation}>추가</div>
          <div style={{display:'flex'}}>
              <div style={{color:schedule}} onClick={clickList}>스케줄</div>
              <div style={{color:checkList}} onClick={clickList}>체크리스트</div>
              <div style={{color:timer}} onClick={clickList}>타이머</div>
          </div>
        </div>
        {
          category === 0 ?
          ( <ScheduleContainer/>)
          :
          category === 1 ?
          (<CheckListContainer />)
          :
          category === 2 ?
          (<TimerContainer />)
          : null
        } 
     </div>
     <div style={{display:'flex'}}>
       <Weather/>
     </div>
    </div>
  );
}

export default App;

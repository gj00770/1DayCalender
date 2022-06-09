import Header from '../components/header'
import Calender from '../components/calender'
import SelectYearMonth from '../components/selectYearMonth'
import TimerContainer from '../components/timerContainer'
import ScheduleContainer from '../components/scheduleContainer'
import CheckListContainer from '../components/checkListContainer'
import Spinner from '../components/spinner'
import Weather from './weather'
import React, {useState, useEffect,useRef} from 'react';
import store from '../redux/store/store';
import { Provider } from 'react-redux';
import { useMediaQuery } from 'react-responsive'
import { connect,useSelector } from 'react-redux';
import upComing from '../components/upComing'
import AddScheduleContainer from './addScheduleContainer'
import { MdOutlineAutoDelete } from 'react-icons/md'




function Wholecal({backColor}) {
    const [schedule, setSchedule] = useState('black');
    const [checkList, setCheckList] = useState('grey');
    const [timer, setTimer] = useState('grey');
    const [category, setCategory] = useState(0);
    const [isModal, setIsModal] = useState(false)
    const addScheduleRef = useRef()

    const OpenModal = () => {
      setIsModal(true)
    }
  



    const clickList=(e)=>{
      console.log(e.target.innerHTML)
      if(e.target.innerHTML==='스케줄'){
       console.log('hi!!')
       setSchedule('#4A78E6')
       setCheckList('grey')
       setTimer('grey')
       setCategory(0)
      }
      else if (e.target.innerHTML === '체크리스트'){
        setSchedule('grey')
       setCheckList('#4A78E6')
       setTimer('grey')
       setCategory(1)
      }
      else if (e.target.innerHTML === '타이머'){
        setSchedule('grey')
       setCheckList('grey')
       setTimer('#4A78E6')
       setCategory(2)
      }
    }
   
  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 })
    return isDesktop ? children : null
  }
  const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 803, maxWidth: 991 })
    return isTablet ? children : null
  }
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 802 })
    return isMobile ? children : null
  }
  const handleClickOutside = ({ target }) => {
   // console.log("%%%%%%%%%editcal1",editcal1Ref.current.contains(target))
     if (isModal&&!addScheduleRef.current.contains(target)) {
       setIsModal(false);    
       }
  
}



  useEffect(()=>{
    

   
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
    window.removeEventListener("mousedown", handleClickOutside);
    };
   


  },[isModal])
  // const [title, setTitle] = useState('');
  // const [summary,setSummart] = useState('');


  
    
    return (
      // <div  style={{ backgroundColor:backColor, border:'1px solid', borderRadius:'40px',marginTop:'20px', boxShadow:'20px 20px 20px grey'}} onClick={OpenModal}>
         <div  style={{ backgroundColor:backColor, border:'1px solid', borderRadius:'40px',marginTop:'20px', boxShadow:'10px 10px 10px '}} >
        <div >
          <Header/>
          <Calender/>
          {/* <SelectYearMonth/> */}
           <div style={{position:'absolute',top:'30%' ,display:isModal? "block":"none"}} ref={addScheduleRef}>
          <AddScheduleContainer />
          </div>
          <br />
          <br />
          <hr style={{width:'90%'}} />
          <br/>
          <div style={{display:'flex',justifyContent:'space-between',paddingLeft:'6%',paddingRight:'6%'}}>
            <div style={{display:'flex',fontSize:'25px' , alignItems:"center"}}> 
                  <div > 2022년 1월 27일  </div>
                  <div style={{paddingLeft:'10px', color:'#4A78E6',fontSize:'40px'}} onClick={OpenModal}>+</div>
            </div>
            <div style={{display:'flex',display:'flex',alignItems:"center"}}>
                <div style={{color:schedule}} onClick={clickList}>스케줄</div>
                <div style={{color:checkList,paddingLeft:'7px'}} onClick={clickList}>체크리스트</div>
      
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
      
      </div>
      
    );
  }
  const mapStateToProps = state =>{
    return{
        year : state.year,
        month : state.month,
        date: state.date,
        selectDate: state.selectDate,
        userInfo: state.userInfo,
        checkList:state.checkList
    }
} 
const mapDispatchToprops = (dispatch)=>{
    
  return {
    
  }
} 

export default connect(mapStateToProps,mapDispatchToprops)(Wholecal)
  
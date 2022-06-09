import AddSchedule from '../components/addSchedule'
import AddCheckList from '../components/addCheckList'
import Weather from './weather'
import React, {useState, useEffect} from 'react';
import InputCal from '../components/inputCal'
function AddScheduleContainer(){

    const [schedule, setSchedule] = useState('#4A78E6');
    const [checkList, setCheckList] = useState('grey');
    const [timer, setTimer] = useState('grey');
    const [category, setCategory] = useState(0);

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


    return (
        <div style={{backgroundColor:'#ffffff', borderRadius:'15px',marginTop:'20px', border:'1px solid',width:'700px', boxShadow:'10px 10px 10px '}}>
            <div style={{display:'flex',padding:'10px 10px 10px 10px'}}>
                <div style={{color:schedule,fontSize:'24px'}} onClick={clickList} >스케줄</div>
                <div style={{color:checkList,fontSize:'24px'}} onClick={clickList}>체크리스트</div>
                
            </div >
            <div style={{padding:'10px 10px 10px 10px'}}>
            {checkList === 'grey'?
            
            <AddSchedule/> 
            :
            <AddCheckList/>
            }
            </div>
            {/* <AddSchedule/> */}
            
        </div>
    )
}

export default AddScheduleContainer
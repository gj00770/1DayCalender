import Schedule from './schedule'
import { connect,useSelector } from 'react-redux';
import React, {useState, useEffect} from 'react';
import { PlusMonth,MinusMonth,SelectGreyDate,ResetSelectDate,SetChecklist,SetSchedule,SetUpcoming,ShortCut,ShortCutPointer,Loading} from '../redux/actions/action'
import { FaSmileBeam } from 'react-icons/fa';
import Spinner from '../components/spinner'
 function ScheduleContainer(props) {
    console.log('스케줄',props.scheduleList)
   //console.log(props.scheduleList[0].start_date)
    //console.log(props.scheduleList[0].end_date)
    const [refresh, setRefesh] = useState(false)

    const refreshContainer = ()=>{
        setRefesh(!refresh)
    }

    useEffect(()=>{
         props.Loading(false, props.loadingCheckList, props.loadingUpcoming)
    },[props.scheduleList])
    return (

        <div>
            {
            props.loadingSchedule === true ?
            <div style={{display:'flex',justifyContent:'center'}}>
                <div>
            <Spinner/>
            </div>
            </div>
            :
          
           props.scheduleList.length > 0?
            props.scheduleList.map((scheduleList,index)=>(
            <Schedule key={index} name={scheduleList.title} startDate={scheduleList.start_date} endDate={scheduleList.end_date} id={scheduleList.id} refreshContainer={refreshContainer} summary={scheduleList.summary}/>)
            )
            :
          
            <div style={{height:'550px',display:'flex', alignItems: 'center',justifyContent: 'center'}}>
                <div>
                <h1>오늘은일정이없어요</h1>
                <h1>일정추가하기</h1>
                </div>
            </div>
            }
        </div>
       )
 }
 const mapStateToProps = state =>{
    return{
        year : state.year,
        month : state.month,
        date: state.date,
        selectDate: state.selectDate,
        userInfo: state.userInfo,
        checkList:state.checkList,
        scheduleList:state.scheduleList,
        loadingSchedule:state.loadingSchedule,
        loadingCheckList: state.loadingCheckList,
        loadingUpcoming: state.loadingUpcoming,
    }
} 
const mapDispatchToprops = (dispatch)=>{
 
    return {
        Loading: (loadingSchedule,loadingCheckList,loadingUpcoming)=>  dispatch(Loading(loadingSchedule,loadingCheckList,loadingUpcoming)),
    }
  } 
 export default connect(mapStateToProps,mapDispatchToprops)(ScheduleContainer)
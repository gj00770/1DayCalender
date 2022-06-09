import { useEffect,useState,useRef,useReducer  } from "react";
import Schedule from './schedule'
import CheckList from './checkList'
import { connect,useSelector } from 'react-redux';
import './upComing.css'
import Spinner from '../components/spinner'
import { PlusMonth,MinusMonth,SelectGreyDate,ResetSelectDate,SetChecklist,SetSchedule,SetUpcoming,ShortCut,ShortCutPointer,Loading} from '../redux/actions/action'

function UpComing(props) {

console.log(props.id)


useEffect(()=>{

    props.Loading(props.loadingSchedule, props.loadingCheckList, props.loadingUpcoming)
 


},[])




    
    return (
        <div class='box' style={{backgroundColor:'#ffffff', borderRadius:'15px',marginTop:'20px', boxShadow:'10px 10px 10px ', border:'1px solid',overflow:'auto' ,height:'600px',width:'700px'}}>
            <h1>UpComing</h1>
            {
                 props.loadingUpcoming === true ?
                 <div style={{display:'flex',justifyContent:'center'}}>
                 <div>
             <Spinner />
             </div>
             </div>
             :
           props.upComingList.length > 0?
            props.upComingList.map((upComingList,index)=>(
            <Schedule key={index} name={upComingList.title} startDate={upComingList.start_date} endDate={upComingList.end_date} summary={upComingList.summary}/>)
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
        upComingList:state.upComingList,
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
 export default connect(mapStateToProps,mapDispatchToprops)(UpComing)
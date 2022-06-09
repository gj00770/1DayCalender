import CheckList from './checkList'
import { connect,useSelector } from 'react-redux';
import React, {useState, useEffect} from 'react';
import { PlusMonth,MinusMonth,SelectGreyDate,ResetSelectDate,SetChecklist,SetSchedule,SetUpcoming,ShortCut,ShortCutPointer,Loading} from '../redux/actions/action'

 function CheckListContainer(props) {
  console.log(props.checkList)

    // const check=checkList.map((checkList)=>(<div key={index} name={checkList.title}>{CheckList}</div>));
    const [refresh, setRefesh] = useState(false)

    const refreshContainer = ()=>{
        setRefesh(!refresh)
    }

    useEffect(()=>{
     //   props.Loading(false, props.loadingCheckList, props.loadingUpcoming)
    },[props.scheduleList,refresh, props.checkList])
    return (
     <div>
         {
        props.checkList.length > 0?
         props.checkList.map((checkList,index)=>(
         <CheckList key={index} name={checkList.title} summary={checkList.summary} id={checkList.id} date={checkList.date} refreshContainer={refreshContainer} check = {checkList.check}/>)
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
        checkList:state.checkList
    }
} 
const mapDispatchToprops = (dispatch)=>{
    
  return {
    Loading: (loadingSchedule,loadingCheckList,loadingUpcoming)=>  dispatch(Loading(loadingSchedule,loadingCheckList,loadingUpcoming)),
}
} 
 export default connect(mapStateToProps,mapDispatchToprops)(CheckListContainer)
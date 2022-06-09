import { useState, useEffect,useRef } from 'react'
import styled from "styled-components";
import { connect,useSelector } from 'react-redux';
import { PlusMonth,MinusMonth,SelectGreyDate,ResetSelectDate,SetChecklist,SetSchedule,SetUpcoming,ShortCut,ShortCutPointer,SetInputScheduleSTart} from '../redux/actions/action'
let monthList = ['January','February','March','April','May','June','July','Agust','September','October','November','December']
let result2 =[]
let firstRow = []
let secondRow =[]
let thirdRow = []
let fourthRow = []
let fifthRow = [] 
let sixthRow = []
let hourList = ['01','02','03','04','05','06','07','08','09','10','11','12']
let minuteList = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59']

function InputCal(props){
//inpucal is for schedule start




    const [color,setColor] = useState('#4A78E6')
  






    let Body = styled.div`
    width: 250px;;
    `
   let Weekend = styled.div`
   display: flex;
   justify-content: space-between;
   `

    let Row = styled.div`
    display: flex;
    justify-content: space-between;
    height: 30px;
    line-height: 30px;
    `
function checkLeapYear(year){
    if(year % 400 === 0) {
        return true
    }
    else if(year%100 === 0){
        return false;
    }
    else if(year%4 === 0){
        return true
    }
    else {
        return false
       }
}



const getFirstDayofmonth =(year, month) =>{
    console.log(month)
    console.log(year)
      let month_day = [31,28,31,30,31,30,31,31,30,31,30,31];
      let result = []
          result2= []
    //  let result2 = []
      if(month === 2){
        if(checkLeapYear(year)) month_day[1] = 29
      }
      if(month < 10) month = '0' + month
      console.log(new Date(year+'-'+month+'-01').getDay())
      let firstDay = new Date(year+'-'+month+'-01').getDay() //첫날찾기
      console.log(firstDay)
      console.log(month_day[month-1])
      console.log(month_day[month-2])
      console.log(firstDay)
          for (let i = 0; i < firstDay; i++) {
              if(!month_day[month-2]) {
                  let count = 31- firstDay+1;
                  result2.push(`${count+i}`)
              }
              else{
              let count = month_day[month-2] - firstDay+1;
              result2.push(`${count+i}`)
              }
          }    
        for (let i = 1; i <= 42-firstDay; i++) {
          if(i >month_day[month-1]){
              result2.push(`${i-month_day[month-1]}`)
          }
          else{
              result2.push(`${i}`)
          }
        }
        console.log(result2)
        console.log(props)
        firstRow = result2.slice(0,7);
        secondRow = result2.slice(7,14);
        thirdRow = result2.slice(14,21);
        fourthRow = result2.slice(21,28);
        fifthRow =result2.slice(28,35);
        sixthRow =result2.slice(35,42);
        //return result;
      //프랍스에 저장함
  }



 //select grey font
  const clickDate = (e)=>{
    //userid 더미데이터 바꿔줄예정
    //where('date','==',)
    
    let monthNumber = monthList.indexOf(props.month)+1
    console.log(typeof(monthNumber))
    props.SetInputScheduleSTart(props.inputYearStart,props.inputMonthStart,e.target.innerHTML,props.inputHourStart,props.inputMinuteStart,props.inputNoonStart)
  }

  

  const clickHour = (e)=>{
    //userid 더미데이터 바꿔줄예정
    //where('date','==',)
    console.log(typeof(monthNumber))
   
    props.SetInputScheduleSTart(props.inputYearStart,props.inputMonthStart,props.inputDateStart,e.target.innerHTML,props.inputMinuteStart,props.inputNoonStart)

  }
  const clickMinute = (e)=>{
    props.SetInputScheduleSTart(props.inputYearStart,props.inputMonthStart,props.inputDateStart,props.inputHourStart,e.target.innerHTML,props.inputNoonStart)
  }


  const clickNoon = (e)=>{
    if(e.target.innerHTML === '오전'){
        props.SetInputScheduleSTart(props.inputYearStart,props.inputMonthStart,props.inputDateStart,props.inputHourStart,props.inputMinuteStart,'noon')

    }
    else{
        props.SetInputScheduleSTart(props.inputYearStart,props.inputMonthStart,props.inputDateStart,props.inputHourStart,props.inputMinuteStart,'afternoon')
    }
   
  }






  const selectFirstGrey =(e) =>{
    console.log(e.target.innerHTML)
    if(e.target.innerHTML !== '↑'){
        console.log('e.target.innerHTML',e.target.innerHTML)
        if(props.inputMonthStart === 'January'){
            props.SetInputScheduleSTart(props.inputYearStart-1,'December',e.target.innerHTML,props.inputHourStart,props.inputMinuteStart,props.inputNoonStart)
        }
        else{
            props.SetInputScheduleSTart(props.inputYearStart,monthList[monthList.indexOf(props.inputMonthStart)-1],e.target.innerHTML,props.inputHourStart,props.inputMinuteStart,props.inputNoonStart)
        }
    }
    else{
        
        if(props.inputMonthStart === 'January'){
            props.SetInputScheduleSTart(props.inputYearStart-1,'December',props.inputDateStart,props.inputHourStart,props.inputMinuteStart,props.inputNoonStart)
        }
        else{
            props.SetInputScheduleSTart(props.inputYearStart,monthList[monthList.indexOf(props.inputMonthStart)-1],props.inputDateStart,props.inputHourStart,props.inputMinuteStart,props.inputNoonStart)
        }
    }
   console.log(props.selectDate)
  }


  const selectLastGrey =(e) =>{
    console.log(e.target.innerHTML)
    if(e.target.innerHTML !== '↓'){
        if(props.inputMonthStart === 'December'){
            props.SetInputScheduleSTart(props.inputYearStart+1,'January',e.target.innerHTML,props.inputHourStart,props.inputMinuteStart,props.inputNoonStart)
        }
        else{
        props.SetInputScheduleSTart(props.inputYearStart,monthList[monthList.indexOf(props.inputMonthStart)+1],e.target.innerHTML,props.inputHourStart,props.inputMinuteStart,props.inputNoonStart)
        }
    }
    else{
        if(props.inputMonthStart === 'December'){
            props.SetInputScheduleSTart(props.inputYearStart+1,'January',props.inputDateStart,props.inputHourStart,props.inputMinuteStart,props.inputNoonStart)
        }
        else{
        props.SetInputScheduleSTart(props.inputYearStart,monthList[monthList.indexOf(props.inputMonthStart)+1],props.inputDateStart,props.inputHourStart,props.inputMinuteStart,props.inputNoonStart)
        }
    }
  }
    



return(
    <div style={{backgroundColor:'white', display:'flex',height:'240px', border:'1px solid black',textAlign:"center"}}>
        <div>
        <Body> 
            <div>{getFirstDayofmonth(props.inputYearStart,monthList.indexOf(props.inputMonthStart)+1)}</div>
        <div style={{display:'flex'}}>
        <div>{props.inputYearStart}년{monthList.indexOf(props.inputMonthStart)+1}월{props.inputDateStart}일</div> <div onClick={selectFirstGrey}>&uarr;</div><div onClick={selectLastGrey}>&darr;</div>
        </div>
        <Weekend >
        <div style={{width:'14.2857vh'}} >일 </div>
        <div style={{width:'14.2857vh'}} >월</div>
        <div style={{width:'14.2857vh'}}>화</div>
        <div style={{width:'14.2857vh'}}>수</div>
        <div style={{width:'14.2857vh'}}>목</div>
        <div style={{width:'14.2857vh'}}>금</div>
        <div style={{width:'14.2857vh'}}>토</div>
        </Weekend>
        { props.shortCut === false || props.shortCutPointer === 1 ?
            <Row>
            {firstRow.length  && firstRow.map((week, index) => (
            
                week > 10? 
                <div key={index} style={{width:'14.2857vh', color:'grey'}} onClick={(e)=>selectFirstGrey(e)} >
            {week}
        </div>
                :
            week === props.inputDateStart ?  
            <div key={index} style={{width:'14.2857vh', backgroundColor:`${color}`, borderRadius:'15px' ,color:'white' }} onClick={(e)=>clickDate(e)}>
            {week}
            </div>
        :
            <div key={index} style={{width:'14.2857vh'}}  onClick={(e)=>clickDate(e)} >
            {week}
            </div>
        
        ))}
        </Row>
        : null
            }


        { props.shortCut === false || props.shortCutPointer === 2?
        <Row>
        {secondRow.length >6 && secondRow.map((week, index) => (
            week === props.inputDateStart ?  
            <div key={index} style={{width:'14.2857vh', backgroundColor:`${color}`, borderRadius:'15px',color:'white' }} onClick={(e)=>clickDate(e)}>
            {week}
            </div>
            :
            <div key={index} style={{width:'14.2857vh'}} onClick={(e)=>clickDate(e)} >
                {week}
            </div>
            ))}
        </Row>
        :
        null}




        { props.shortCut === false || props.shortCutPointer === 3 ?
        <Row>
        {thirdRow.length >6 && thirdRow.map((week, index) => (
        
        week === props.inputDateStart ?  
        <div key={index} style={{width:'14.2857vh', backgroundColor:`${color}`, borderRadius:'15px',color:'white' }} onClick={(e)=>clickDate(e)}>
            {week}
        </div>
        :
            <div key={index} style={{width:'14.2857vh'}} onClick={(e)=>clickDate(e)} >
            {week}
                </div>
            ))}
            </Row>
            : null
        }



        { props.shortCut === false || props.shortCutPointer === 4 ?
        <Row>
        {fourthRow.length ===7 && fourthRow.map((week, index) => (
        week === props.inputDateStart ?  
        <div key={index} style={{width:'14.2857vh', backgroundColor:`${color}`, borderRadius:'15px' ,color:'white'}} onClick={(e)=>clickDate(e)}>
            {week}
        </div>
        :
        <div key={index} style={{width:'14.2857vh'}} onClick={(e)=>clickDate(e)} >
        {week}
            </div>
        ))}
            </Row>
            : null
        }



        { props.shortCut === false || props.shortCutPointer === 5 ?
        <Row>
        {fifthRow.length ===7 && fifthRow.map((week, index) => (
            week < 10 ?  
            <div key={index} style={{width:'14.2857vh',color:'grey' } } onClick={(e)=>selectLastGrey(e)}>
            {week}
            </div> 
            :
                week === props.inputDateStart ? 
                
                <div key={index} style={{width:'14.2857vh',borderRadius:'15px',backgroundColor:`${color}` ,color:'white'}}   onClick={(e)=>clickDate(e)}>
                
                {week}
                </div>
                :
                <div key={index} style={{width:'14.2857vh' }} onClick={(e)=>clickDate(e)}>
                {week}
                </div>
                
                ))}
        </Row>
        : null
        }
        {props.shortCut === false || props.shortCutPointer === 6 ?
        <Row>
        {sixthRow.length ===7 && sixthRow.map((week, index) => (
        week < 28 ?  
            <div key={index} style={{width:'14.2857vh',color:'grey' }} onClick={(e)=>selectLastGrey(e)}>
            {week}
        </div>
            :
            week === props.inputDateStart ? 
        <div key={index} style={{width:'14.2857vh', backgroundColor:`${color}`,borderRadius:'15px' ,color:'white'}}onClick={(e)=>clickDate(e)}>{week}</div>
        :
    <div key={index} style={{width:'14.2857vh'  }} onClick={(e)=>clickDate(e)}>
        {week}
    </div>
    
        ))}
        </Row>
        :
        null
        }
        </Body> 
        </div>
        <div style={{overflow:'auto',paddingLeft:'20px',width:'60px'}}>
            {hourList.map((ele, index)=>(
                ele === props.inputHourStart?
              <div key={index} style={{height:'50px',backgroundColor:'#4A78E6',display:'flex',alignItems:'center' , justifyContent:'center',color:'white'}} onClick={clickHour} >{ele}</div>
              :

              <div key={index} style={{height:'50px',display:'flex',alignItems:'center' , justifyContent:'center'}} onClick={clickHour}>{ele}</div>

            ))}
        </div>

        <div style={{overflow:'auto',paddingLeft:'20px',width:'60px'}}>
            {minuteList.map((ele, index)=>(
                 ele === props.inputMinuteStart?
              <div key={index} style={{height:'50px',backgroundColor:'#4A78E6',display:'flex',alignItems:'center' , justifyContent:'center',color:'white'}} onClick={clickMinute} >{ele}</div>
              :

              <div key={index} style={{height:'50px',display:'flex',alignItems:'center' , justifyContent:'center'}} onClick={clickMinute}>{ele}</div>
            ))}
        </div>

        <div style={{overflow:'auto',paddingLeft:'20px',width:'60px' }}>
            {props.inputNoonStart === 'noon'? 
            <div>
             <div style={{height:'40px',backgroundColor:'#4A78E6',display:'flex', alignItems:'center' , justifyContent:'center',color:'white'}} onClick={clickNoon}>오전</div>
             <div style={{height:'40px',display:'flex', alignItems:'center' , justifyContent:'center'}} onClick={clickNoon}>오후</div>
             </div>
            :
            <div>
            <div style={{height:'40px',display:'flex', alignItems:'center' , justifyContent:'center'}} onClick={clickNoon}>오전</div>
             <div style={{height:'40px',backgroundColor:'#4A78E6',display:'flex',alignItems:'center' , justifyContent:'center',color:'white'}} onClick={clickNoon}>오후</div>
             </div>

            }
            
        </div>
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
        shortCut:state.shortCut,
        shortCutPointer:state.shortCutPointer,
        
        inputYearStart:state.inputYearStart,
        inputMonthStart:state.inputMonthStart,
        inputDateStart:state.inputDateStart,
        inputHourStart:state.inputHourStart,
        inputMinuteStart:state.inputMinuteStart,
        inputNoonStart:state.inputNoonStart,
    }
} 
const mapDispatchToprops = (dispatch)=>{
    
  return {
      PlusMonth: (month,year)=>  dispatch(PlusMonth(month,year)),
      MinusMonth: (month,year)=>  dispatch(MinusMonth(month,year)),
      SelectGreyDate: (selectDate)=>  dispatch(SelectGreyDate(selectDate)),
      ResetSelectDate: (selectDate)=>  dispatch(ResetSelectDate(selectDate)),
      SetChecklist: (checkListInfo)=> dispatch(SetChecklist(checkListInfo)),
      SetSchedule: (scheduleInfo)=> dispatch(SetSchedule(scheduleInfo)),
      SetUpcoming: (upComingInfo)=> dispatch(SetUpcoming(upComingInfo)),
      ShortCut: (shortCut)=> dispatch(ShortCut(shortCut)),
      ShortCutPointer: (shortCutPointer)=> dispatch(ShortCutPointer(shortCutPointer)),
      SetInputScheduleSTart: (inputYearStart,inputMonthStart,inputDateStart,inputHourStart,inputMinuteStart,inputNoonStart)=> dispatch(SetInputScheduleSTart(inputYearStart,inputMonthStart,inputDateStart,inputHourStart,inputMinuteStart,inputNoonStart)),
  }
} 

export default connect(mapStateToProps,mapDispatchToprops)(InputCal)
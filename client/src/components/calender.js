import { useState, useEffect,useRef } from 'react'
import styled from "styled-components";
import { connect,useSelector } from 'react-redux';
import { PlusMonth,MinusMonth,SelectGreyDate,ResetSelectDate} from '../redux/actions/action'
//생활,교통,법,의료,교육, 
let monthList = ['January','February','March','April','May','June','July','Agust','September','October','November','December']
let result2 =[]
let firstRow = []
let secondRow =[]
let thirdRow = []
let fourthRow = []
let fifthRow = [] 
let sixthRow = []
 function Calender(props){
   console.log(props.selectDate)
    const [refresh,setRefresh] = useState();
    const clickRef = useRef();
    let Body = styled.div`
    height: 400px;
    `
   let Weekend = styled.div`
   display: flex;
   justify-content: space-between;
   `

    let Row = styled.div`
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
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
        let month_day = [31,28,31,30,31,30,31,31,30,31,30,31];
        let result = []
            result2= []
      //  let result2 = []
        if(month === 2){
          if(checkLeapYear(year)) month_day[1] = 29
        }
        if(month < 10) month = '0' + month
        console.log(new Date(year+'-'+month+'-01').getDay())
        let firstDay = new Date(year+'-'+month+'-01').getDay()
        console.log(month_day[month-1])
        console.log(month_day[month-2])
        console.log(firstDay)
            for (let i = 0; i < firstDay; i++) {
                if(!month_day[month-2]) {
                    let count = 31- firstDay+1;
                    result2.push(count+i)
                }
                else{
                let count = month_day[month-2] - firstDay+1;
                result2.push(count+i)
                }
            }    
          for (let i = 1; i <= 42-firstDay; i++) {
            if(i >month_day[month-1]){
                result2.push(i-month_day[month-1])
            }
            else{
                result2.push(i)
            }
          }
          // console.log(result2.slice(0,7))
          // console.log(result2.slice(7,14))
          // console.log(result2.slice(14,21))
          // console.log(result2.slice(21,28))
          // console.log(result2.slice(28,35))
          // console.log(result2.slice(35,42))
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
      props.SelectGreyDate(Number(e.target.innerHTML))
    }

    const selectFirstGrey =(e) =>{
      console.log(Number(e.target.innerHTML))
      props.MinusMonth(props.month,props.year)
      props.SelectGreyDate(Number(e.target.innerHTML))
     
     console.log(props.selectDate)
    }
    const selectLastGrey =(e) =>{
      
      props.PlusMonth(props.month,props.year)
      props.SelectGreyDate(Number(e.target.innerHTML))
     }
    
    
    // useEffect(() => {
      
    //   clickRef.current.style = ' width:14.2857vh; background : pink; border-radius:15px;'
        
    //   }, [])

    return(
          <Body> 
               <div>{getFirstDayofmonth(props.year,monthList.indexOf(props.month)+1)}</div>
            
          <Weekend >
          <div style={{width:'14.2857vh'}} >Su </div>
          <div style={{width:'14.2857vh'}} >Mo</div>
          <div style={{width:'14.2857vh'}}>Tu</div>
          <div style={{width:'14.2857vh'}}>We</div>
          <div style={{width:'14.2857vh'}}>Th</div>
          <div style={{width:'14.2857vh'}}>Fr</div>
          <div style={{width:'14.2857vh'}}>Sa</div>
          </Weekend>
          <br/>
          <Row>
          {firstRow.length  && firstRow.map((week, index) => (
               week > 10? 
               <div key={index} style={{width:'14.2857vh', color:'grey'}} onClick={(e)=>selectFirstGrey(e)} >
          {week}
         </div>
              :
              week === props.selectDate ?  
              <div key={index} style={{width:'14.2857vh', backgroundColor:'pink', borderRadius:'15px' }} onClick={(e)=>clickDate(e)}>
                {week}
              </div>
            :
              <div key={index} style={{width:'14.2857vh'}}  onClick={(e)=>clickDate(e)} >
                {week}
              </div>
            ))}
          </Row>
          <br/>

          <Row>
          {secondRow.length >6 && secondRow.map((week, index) => (
             
              week === props.selectDate ?  
              <div key={index} style={{width:'14.2857vh', backgroundColor:'pink', borderRadius:'15px' }} onClick={(e)=>clickDate(e)}>
                {week}
              </div>
              :
                <div key={index} style={{width:'14.2857vh'}} onClick={(e)=>clickDate(e)} >
                  {week}
                </div>
                ))}
          </Row>
          <br/>
          <Row>
          {thirdRow.length >6 && thirdRow.map((week, index) => (
            week === props.selectDate ?  
            <div key={index} style={{width:'14.2857vh', backgroundColor:'pink', borderRadius:'15px' }} onClick={(e)=>clickDate(e)}>
              {week}
            </div>
            :
              <div key={index} style={{width:'14.2857vh'}} onClick={(e)=>clickDate(e)} >
                {week}
           </div>
        
      ))}
          </Row>
          <br/>
          <Row>
          {fourthRow.length ===7 && fourthRow.map((week, index) => (
            week === props.selectDate ?  
            <div key={index} style={{width:'14.2857vh', backgroundColor:'pink', borderRadius:'15px' }} onClick={(e)=>clickDate(e)}>
              {week}
            </div>
            :
           <div key={index} style={{width:'14.2857vh'}} onClick={(e)=>clickDate(e)} >
             {week}
        </div>
      ))}
          </Row>
          <br/>
          <Row>
          {fifthRow.length ===7 && fifthRow.map((week, index) => (
                week < 10 ?  
                <div key={index} style={{width:'14.2857vh',color:'grey' } } onClick={(e)=>selectLastGrey(e)}>
                {week}
                </div> 
                :
                  week === props.selectDate ?  
                  <div key={index} style={{width:'14.2857vh',borderRadius:'15px',backgroundColor:'pink' }}   onClick={(e)=>clickDate(e)}>
                    {week}
                  </div>
                  :
                    <div key={index} style={{width:'14.2857vh' }} onClick={(e)=>clickDate(e)}>
                     {week}
                     </div>
          ))}
          </Row>
          <br/>
          <Row>
          {sixthRow.length ===7 && sixthRow.map((week, index) => (
            
            week < 28 ?  
              <div key={index} style={{width:'14.2857vh',color:'grey' }} onClick={(e)=>selectLastGrey(e)}>
              {week}
            </div>
              :
              week === props.selectDate ? 
            <div key={index} style={{width:'14.2857vh', backgroundColor:'pink',borderRadius:'15px' }}onClick={(e)=>clickDate(e)}>{week}</div>
            :
        <div key={index} style={{width:'14.2857vh'  }} onClick={(e)=>clickDate(e)}>
          {week}
        </div>
      ))}
          </Row>
          <br/>

          </Body> 
    )

    
}



const mapStateToProps = state =>{
    return{
        year : state.year,
        month : state.month,
        date: state.date,
        selectDate: state.selectDate
    }
} 
const mapDispatchToprops = (dispatch)=>{
    
  return {
      PlusMonth: (month,year)=>  dispatch(PlusMonth(month,year)),
      MinusMonth: (month,year)=>  dispatch(MinusMonth(month,year)),
      SelectGreyDate: (selectDate)=>  dispatch(SelectGreyDate(selectDate)),
      ResetSelectDate: (selectDate)=>  dispatch(ResetSelectDate(selectDate))
      
  }
} 

export default connect(mapStateToProps,mapDispatchToprops)(Calender)
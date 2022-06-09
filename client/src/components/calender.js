import { useState, useEffect,useRef } from 'react'
import styled from "styled-components";
import { connect,useSelector } from 'react-redux';
import { PlusMonth,MinusMonth,SelectGreyDate,ResetSelectDate,SetChecklist,SetSchedule,SetUpcoming,ShortCut,ShortCutPointer,Loading} from '../redux/actions/action'
import firebaseConfig, {db,firebaseui,app,ui,uiConfig}  from '../firebase.config'
import { collection, getDoc, getDocs, setDoc, doc, query,where,orderBy,startAt, endAt,limit } from "firebase/firestore";



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
    const [color,setColor] = useState('#4A78E6')
    const [poin,setPoint] = useState(null)
    const clickRef = useRef();
    let Body = styled.div`
    `
   let Weekend = styled.div`
   display: flex;
   justify-content: space-between;
   `

    let Row = styled.div`
    display: flex;
    justify-content: space-between;
    height: 60px;
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
    const shortCut =() =>{
      props.ShortCut(true)
    }
    const pointer =(point) =>{
      setPoint(point)
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
          console.log('223;3;3;33;;33;;3;',Math.floor(result2.indexOf(props.selectDate)/7)+1)
          console.log(props)
          if(props.selectDate!== 0){
          props.ShortCutPointer(Math.floor(result2.indexOf(props.selectDate)/7)+1)
          }
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
      let date =e.target.innerHTML
      let array2= [];
      let array3= [];  //q2
      let array4= [];  //q3
      let array5= []; //q4
      
      //  e.target.innerHTML=props.selectDate
      props.SelectGreyDate(e.target.innerHTML)
      let monthNumber = monthList.indexOf(props.month)+1
      if(monthNumber < 10){
        monthNumber = `0${monthList.indexOf(props.month)+1}`
      }
      if(Number(e.target.innerHTML)<10){
        date = '0'+e.target.innerHTML
      }
      console.log(typeof(monthNumber))
      let array = [`${props.year}`,'0'+monthNumber,e.target.innerHTML]
      let dateCal = `${props.year}`+monthNumber+`${date}`+'0000';
      let dateCal2 = `${props.year}`+monthNumber+`${date}`+'2359';
      let string =array.join('-')
      console.log('122112121212121212',dateCal)
      console.log('122112121212121212',string)
      console.log('122112121212121212',props.userInfo)
      //현재시간을 12자리로 변환해야지~
      //how
      //idk
      //
      //
      const q = query(collection(db, "checklist"),where("userid", "==", `${props.userInfo}`),where('date','==',dateCal));
      const q2 = query(collection(db, "schedule"),where("userid", "==", `${props.userInfo}`),where('end_date','>=',dateCal));
      const q3 = query(collection(db, "schedule"),where("userid", "==", `${props.userInfo}`),where('start_date', '<=',dateCal ));
      const q4 = query(collection(db, "schedule"),where("userid", "==", `${props.userInfo}`),where('start_date','>=',dateCal),where('start_date','<=',dateCal2));
//      const q5 = query(collection(db, "schedule"),where('start_date','==',string), orderBy("population"), limit(2));
    





      getDocs(q).then((querySnapshot)=>{ //
       
        querySnapshot.forEach((doc) => {
       //   doc.data().docId = doc.id
        // doc.data() is never undefined for query doc snapshots
        console.log('2323232323',doc.id, " => ", doc.data());
        const data = doc.data();
        const id = doc.id;
       // console.log({ id, ...data }) 
        const dataId = { id, ...data }
        array2.push(dataId)
        
      })
      props.SetChecklist(array2)
    })




    getDocs(q4).then((querySnapshot)=>{ //
     
      querySnapshot.forEach((doc) => {
    //    doc.data().docId = doc.id
      // doc.data() is never undefined for query doc snapshots
      const data = doc.data();
      const id = doc.id;
   //   console.log({ id, ...data }) 
      const dataId = { id, ...data }
      console.log('2323232323',doc.id, " => ", doc.data());
      array5.push(dataId)
      
    })
  })



     getDocs(q2).then((querySnapshot)=>{ //enddate array3
          querySnapshot.forEach((doc) => {
    //  doc.data().docId = doc.id

          // doc.data() is never undefined for query doc snapshots
      //    console.log('2323232323',doc.id, " => ", doc.data());
      const data = doc.data();
      const id = doc.id;
    //  console.log({ id, ...data }) 
      const dataId = { id, ...data }
          array3.push(dataId)
       
      })

    })


      getDocs(q3).then((querySnapshot)=>{
          
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(typeof(doc.data() ))
        // console.log(typeof(doc.id))
        // let x = doc.data()
        // x.docId = doc.id
        const data = doc.data();
        const id = doc.id;
      //  console.log({ id, ...data }) 
        const dataId = { id, ...data }
     // console.log('2323232323',doc.id, " => ", doc.data());
    
        array4.push(dataId)
      })
      console.log('datecal',dateCal)
      console.log('arr5',array5)
      console.log('arr3',array3)
      console.log('arr4',array4)
        let dupObject = array3.filter((crew) => {
          let entKey = Object.keys(crew); // crew의 key들
          let filtered = array4.filter(people => {
              let isSame = true;
              let yorkKey = Object.keys(people); // people의 key들
      
              if (entKey.length !== yorkKey.length) { // key들이 길이가 다르면 다른 Object
                  isSame = false;
              } else {
                  yorkKey.forEach(key => {
                      if (crew[key] !== people[key]) {
                          isSame = false;
                      }
                  });
              }
              return isSame;
          });
      
          return filtered.length > 0;
    });
    //console.log('ㄷㅠ플듀플듀플듀프',dupObject);
    let x = [...dupObject,...array5]
    props.SetSchedule(x)
    props.Loading(true, props.loadingCheckList, props.loadingUpcoming)
    })
   
   
     
  
    
       
   }

    const selectFirstGrey =(e) =>{
      console.log(Number(e.target.innerHTML))
      props.MinusMonth(props.month,props.year)
      props.SelectGreyDate((e.target.innerHTML))

     console.log(props.selectDate)
    }


    const selectLastGrey =(e) =>{
      props.PlusMonth(props.month,props.year)
      props.SelectGreyDate((e.target.innerHTML))
     }
      
    
    useEffect(() => {
     
     

      let now = new Date();
      let month = now.getMonth()+1;
      let date = `${now.getDate()}`;
      let hour  = now.getHours();
      let minute = now.getMinutes();
      let year = now.getFullYear();
      
      if(month < 10){
        month = `0${month}`
      }

      if(date < 10){
        date = `0${date}`
      }

      if(hour < 10){
        hour = `0${hour}`
      }

      if(minute < 10){
        minute = `0${minute}`
      }

    


      // console.log(year)
      // let monthNumber = monthList.indexOf(todayMonth)+1
      // console.log(monthNumber)
      // let todayDate = now.getDate();
      // let hours = ('0' + now.getHours()).slice(-2); 
      // let minutes = ('0' + now.getMinutes()).slice(-2);
  //    console.log('2232323232',year+'0'+monthNumber+todayDate+hours+minutes)
      
      const currentTime = `${year}`+month+date+hour+minute;  //여기수정
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',currentTime)
      let UpComingContainer = []
      const q5 = query(collection(db, "schedule"),where('userid','==',`${props.userInfo}`),where('start_date','>=', currentTime),limit(10));
      getDocs(q5).then((querySnapshot)=>{ 
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log('#################################',doc.id, " => ", doc.data());
        const data = doc.data();
        const id = doc.id;
       // console.log({ id, ...data }) 
        const dataId = { id, ...data }
        UpComingContainer.push(dataId)
      })
      console.log(UpComingContainer)
      props.SetUpcoming(UpComingContainer)
      props.Loading(props.loadingSchedule,props.loadingCheckList,props.loadingUpcoming)
    })








     clickDate({target:{innerHTML:props.selectDate}})





















        
      }, [props.userInfo])

    return(
          <Body> 
               <div>{getFirstDayofmonth(props.year,monthList.indexOf(props.month)+1)}</div>
            
          <Weekend >
          <div style={{width:'14.2857vh'}} >일 </div>
          <div style={{width:'14.2857vh'}} >월</div>
          <div style={{width:'14.2857vh'}}>화</div>
          <div style={{width:'14.2857vh'}}>수</div>
          <div style={{width:'14.2857vh'}}>목</div>
          <div style={{width:'14.2857vh'}}>금</div>
          <div style={{width:'14.2857vh'}}>토</div>
          </Weekend>
          <br/>
         { props.shortCut === false || props.shortCutPointer === 1 ?
          <Row>
          {firstRow.length  && firstRow.map((week, index) => (
           
               week > 10? 
               <div key={index} style={{width:'14.2857vh', color:'grey',paddingTop:'10px' }} onClick={(e)=>selectFirstGrey(e)} >
          {week}
         </div>
              :
              week === props.selectDate ?  
              <div key={index} style={{width:'8.2857vh', backgroundColor:`${color}`, borderRadius:'1000px' ,color:'white',paddingTop:'10px',marginRight:'1.5vh',marginLeft:'1.5vh'  }} onClick={(e)=>clickDate(e)}>
                {week}
              </div>
            :
              <div key={index} style={{width:'14.2857vh',paddingTop:'10px' }}  onClick={(e)=>clickDate(e)} >
                {week}
              </div>
             
            ))}
          </Row>
          : null
              }


          { props.shortCut === false || props.shortCutPointer === 2?
          <Row>
          {secondRow.length >6 && secondRow.map((week, index) => (
              week === props.selectDate ?  
              <div key={index} style={{width:'8.2857vh', backgroundColor:`${color}`, borderRadius:'1000px' ,color:'white',paddingTop:'10px',marginRight:'1.5vh',marginLeft:'1.5vh'  }} onClick={(e)=>clickDate(e)}>
                {week}
              </div>
              :
                <div key={index} style={{width:'14.2857vh',paddingTop:'10px' }} onClick={(e)=>clickDate(e)} >
                  {week}
                </div>
                ))}
          </Row>
          :
          null}




          { props.shortCut === false || props.shortCutPointer === 3 ?
          <Row>
          {thirdRow.length >6 && thirdRow.map((week, index) => (
           
            week === props.selectDate ?  
            <div key={index} style={{width:'8.2857vh', backgroundColor:`${color}`, borderRadius:'1000px' ,color:'white',paddingTop:'10px',marginRight:'1.5vh',marginLeft:'1.5vh'  }} onClick={(e)=>clickDate(e)}>
              <div>
              {week}
              </div>
            </div>
            :
              <div key={index} style={{width:'14.2857vh',paddingTop:'10px' }} onClick={(e)=>clickDate(e)} >
                {week}
                  </div>
              ))}
                </Row>
              : null
            }



          { props.shortCut === false || props.shortCutPointer === 4 ?
          <Row>
          {fourthRow.length ===7 && fourthRow.map((week, index) => (
            week === props.selectDate ?  
            <div key={index} style={{width:'8.2857vh', backgroundColor:`${color}`, borderRadius:'1000px' ,color:'white',paddingTop:'10px',marginRight:'1.5vh',marginLeft:'1.5vh'  }} onClick={(e)=>clickDate(e)}>
              {week}
            </div>
            :
           <div key={index} style={{width:'14.2857vh',paddingTop:'10px' }} onClick={(e)=>clickDate(e)} >
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
                <div key={index} style={{width:'14.2857vh',color:'grey',paddingTop:'10px'  } } onClick={(e)=>selectLastGrey(e)}>
                {week}
                </div> 
                :
                  week === props.selectDate ? 
                  
                  <div key={index} style={{width:'8.2857vh', backgroundColor:`${color}`, borderRadius:'1000px' ,color:'white',paddingTop:'10px',marginRight:'1.5vh',marginLeft:'1.5vh'  }} onClick={(e)=>clickDate(e)}>
                    
                    {week}
                  </div>
                  :
                    <div key={index} style={{width:'14.2857vh',paddingTop:'10px'  }} onClick={(e)=>clickDate(e)}>
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
              <div key={index} style={{width:'14.2857vh',color:'grey',paddingTop:'10px'  }} onClick={(e)=>selectLastGrey(e)}>
              {week}
            </div>
              :
              week === props.selectDate ? 
              <div key={index} style={{width:'8.2857vh', backgroundColor:`${color}`, borderRadius:'1000px' ,color:'white',paddingTop:'10px',marginRight:'1.5vh',marginLeft:'1.5vh'  }} onClick={(e)=>clickDate(e)}>
              {week}
            </div>
            :
        <div key={index} style={{width:'14.2857vh',paddingTop:'10px'   }} onClick={(e)=>clickDate(e)}>
          {week}
        </div>
       
          ))}
          </Row>
          :
          null
          }
          </Body> 
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
        loadingSchedule:state.loadingSchedule,
        loadingCheckList: state.loadingCheckList,
        loadingUpcoming: state.loadingUpcoming,
        
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
      Loading: (loadingSchedule,loadingCheckList,loadingUpcoming)=>  dispatch(Loading(loadingSchedule,loadingCheckList,loadingUpcoming)),
  }
} 

export default connect(mapStateToProps,mapDispatchToprops)(Calender)
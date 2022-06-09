import { useEffect,useState,useRef,useReducer  } from "react";
import styled from "styled-components";
import EditCal from './editCal'
import { connect,useSelector } from 'react-redux';
import { EditScheduleStart} from '../redux/actions/action'
import firebaseConfig, {db,firebaseui,app,ui,uiConfig}  from '../firebase.config'
import { collection, getDoc, getDocs, setDoc, doc, query,where,orderBy,startAt, endAt,limit ,updateDoc,deleteDoc} from "firebase/firestore";


 function Schedule(props) {
  const [height, setHeight] = useState(null)
   console.log(props.id)
   const titleRef = useRef()
   const summaryRef = useRef()
   const editcal1Ref = useRef()
   const editcal2Ref = useRef()
    //  console.log(startDate)
    //  console.log(startDate.substr(0,4))
    //  console.log(startDate.substr(4,2))
    //  console.log(startDate.substr(6,2))
    //  console.log(startDate.substr(8,2))
    //  console.log(startDate.substr(10,2))
    //  console.log(startDate.substr(12,2))
    let ScheduleBody = styled.div`
    border-bottom: 1px solid grey;
    // padding: 20px 20px 20px 20px;
     display: flex;
     justify-content: center;
     align-items: center;
     padding-bottom: 10px;
     background-color: white;
    margin:20px 20px;
    padding:10px;
    justify-content: space-between;
    height: 130px;
     `


    
    const [isEdit, setIsEdit] = useState(true);
    const [calStart, setCalStart] = useState(false);

    const [calYearStart, setCalYearStart] = useState(props.startDate.substr(0,4));
    const [calMonthStart, setCalMonthStart] = useState(props.startDate.substr(4,2));
    const [calDateStart, setCalDateStart] = useState(props.startDate.substr(6,2));
    const [calHourStart, setCalHourStart] = useState(props.startDate.substr(8,2));
    const [calMinuteStart, setCalMinuteStart] = useState(props.startDate.substr(10,2));

    const [noonStart, setNoonStart] = useState('')
    const [calDateStartinput,setCalDateStartInput] = useState(`${Number(props.startDate.substr(6,2))}`)
    const [calHourStartCal,setCalHourStartCal] = useState(props.startDate.substr(8,2));


    const [calEnd, setCalEnd] = useState(false);
    const [calYearEnd, setCalYearEnd] = useState(props.endDate.substr(0,4));
    const [calMonthEnd, setCalMonthEnd] = useState(props.endDate.substr(4,2));
    const [calDateEnd, setCalDateEnd] = useState(props.endDate.substr(6,2));
    const [calHourEnd, setCalHourEnd] = useState(props.endDate.substr(8,2));
    const [calMinuteEnd, setCalMinuteEnd] = useState(props.endDate.substr(10,2));

    const [noonEnd, setNoonEnd] = useState('')
    const [calDateEndinput,setCalDateEndInput] = useState(`${Number(props.endDate.substr(6,2))}`)
    const [calHourEndCal,setCalHourEndCal] = useState(props.endDate.substr(8,2));
    const [title, setTitle] = useState(props.name);
    const [summary,setSummary] = useState(props.summary);
    const [removeSche,setRemoveSche] = useState(false);

const cancel = ()=>{
  setIsEdit(true)
  setCalStart(false)

  setCalYearStart(props.startDate.substr(0,4))
  setCalMonthStart(props.startDate.substr(4,2))
  setCalDateStart(props.startDate.substr(6,2))
  setCalHourStart(props.startDate.substr(8,2))
  setCalMinuteStart(props.startDate.substr(10,2))

  setNoonStart('')
  setCalDateStartInput(`${Number(props.startDate.substr(6,2))}`)
  setCalHourStartCal(props.startDate.substr(8,2))

  setCalEnd(false)
  setCalYearEnd(props.endDate.substr(0,4))
  setCalMonthEnd(props.endDate.substr(4,2))
  setCalDateEnd(props.endDate.substr(6,2))
  setCalHourEnd(props.endDate.substr(8,2))
  setCalMinuteEnd(props.endDate.substr(10,2))

  setNoonEnd('')
  setCalDateEndInput(`${Number(props.endDate.substr(6,2))}`)
  setCalHourEndCal(props.endDate.substr(8,2))

  
}


  const edit =()=> {
    setIsEdit(!isEdit)
   


    console.log('22222')
  }
  const openCalStart= ()=>{
    setCalStart(true)
  }
  const openCalEnd= ()=>{
    setCalEnd(true)
  }
  const submit=()=>{
    console.log('@@@@@@',titleRef.current.value)
    let x = titleRef.current.value;
    let y = summaryRef.current.value
    console.log('@@@@@@',summaryRef.current.value)
    updateDoc(doc(db, "schedule", props.id), {
      title : titleRef.current.value,
      summary: summaryRef.current.value,
      start_date : calYearStart+calMonthStart+calDateStart+calHourStart+calMinuteStart,
      end_date   : calYearEnd+calMonthEnd+calDateEnd+calHourEnd+calMinuteEnd,
    }).then((docref)=>{
      console.log(docref)
      alert('성공')
      setIsEdit(!isEdit)
      setSummary(y);
      setTitle(x);
      
      props.refreshContainer()
    })
   
  }
  const remove=()=>{
    console.log("dsds")
    deleteDoc(doc(db, "schedule", props.id));
    setRemoveSche(true)
  }


  const clickDate =(e)=>{
    console.log(e.target.innerHTML)
    setCalDateStartInput(e.target.innerHTML)
    if(Number(e.target.innerHTML)<10){
      setCalDateStart(`0${e.target.innerHTML}`)
    }
    else{
      setCalDateStart(e.target.innerHTML)
    }
  }

  const clickDateEnd =(e)=>{
    console.log(e.target.innerHTML)
    setCalDateEndInput(e.target.innerHTML)
    if(Number(e.target.innerHTML)<10){
      setCalDateEnd(`0${e.target.innerHTML}`)
    }
    else{
      setCalDateEnd(e.target.innerHTML)
    }
  }
  



  const clickNoon = (e)=>{
    if(e.target.innerHTML === '오전'){
      setNoonStart('noon')
      if(Number(calHourStart)-12<10){
        setCalHourStart(`0${Number(calHourStart)-12}`)
      }
      else{
        setCalHourStart(`${Number(calHourStart)-12}`)
      }
     
  }
  else{
    setNoonStart('afternoon')
    if(Number(calHourStart)+12<10){
      setCalHourStart(`0${Number(calHourStart)+12}`)
    }
    else{
      setCalHourStart(`${Number(calHourStart)+12}`)
    }
    
  }
 
}

const clickNoonEnd = (e)=>{
  if(e.target.innerHTML === '오전'){
    setNoonEnd('noon')
    if(Number(calHourEnd)-12<10){
      setCalHourEnd(`0${Number(calHourEnd)-12}`)
    }
    else{
      setCalHourEnd(`${Number(calHourEnd)-12}`)
    }
   
}
else{
  setNoonEnd('afternoon')
  if(Number(calHourEnd)+12<10){
    setCalHourEnd(`0${Number(calHourEnd)+12}`)
  }
  else{
    setCalHourEnd(`${Number(calHourEnd)+12}`)
  }
  
}

}


  const clickHour = (e) =>{
    console.log('hi')
    console.log(e.target.innerHTML)
    setCalHourStartCal(e.target.innerHTML)
    if(noonStart === 'afternoon'){
      if(`${Number(e.target.innerHTML)+12}`<10){
        setCalHourStart(`0${Number(e.target.innerHTML)+12}`)
      }
      else{
        setCalHourStart(`${Number(e.target.innerHTML)+12}`)
      }
      
    }


    else{
     if(`${Number(e.target.innerHTML)}`<10){
      setCalHourStart(`0${Number(e.target.innerHTML)}`)
     }
     else {
      setCalHourStart(`${Number(e.target.innerHTML)}`)
     }
      
    }
  }

  const clickHourEnd = (e) =>{
    console.log('hi')
    console.log(e.target.innerHTML)
    setCalHourEndCal(e.target.innerHTML)
    if(noonEnd === 'afternoon'){
      if(`${Number(e.target.innerHTML)+12}`<10){
        setCalHourEnd(`0${Number(e.target.innerHTML)+12}`)
      }
      else{
        setCalHourEnd(`${Number(e.target.innerHTML)+12}`)
      }
      
    }


    else{
     if(`${Number(e.target.innerHTML)}`<10){
      setCalHourEnd(`0${Number(e.target.innerHTML)}`)
     }
     else {
      setCalHourEnd(`${Number(e.target.innerHTML)}`)
     }
      
    }
  }





  const clickFistGrey = (e) =>{
    console.log('hi')
   // calMonthStart -1
   // january일때 month가 12 january -1 
    if(Number(calMonthStart)-1>0){
      setCalDateStartInput(e.target.innerHTML)
        if(Number(calMonthStart)-1<10){
          setCalMonthStart(`0${Number(calMonthStart)-1}`)
        }
        else{
          setCalMonthStart(`${Number(calMonthStart)-1}`)
        }
    }
    else{
      setCalMonthStart('12')
      setCalDateStartInput(e.target.innerHTML)
      setCalYearStart(`${Number(calYearStart)-1}`)
    }
   
  }


  const clickFistGreyEnd = (e) =>{
    console.log('hi')
   // calMonthEnd -1
   // january일때 month가 12 january -1 
    if(Number(calMonthEnd)-1>0){
      setCalDateEndInput(e.target.innerHTML)
        if(Number(calMonthEnd)-1<10){
          setCalMonthEnd(`0${Number(calMonthEnd)-1}`)
        }
        else{
          setCalMonthEnd(`${Number(calMonthEnd)-1}`)
        }
    }
    else{
      setCalMonthEnd('12')
      setCalDateEndInput(e.target.innerHTML)
      setCalYearEnd(`${Number(calYearEnd)-1}`)
    }
   
  }



 const downClick = (e) =>{
  if(Number(calMonthStart)-1>0){
      if(Number(calMonthStart)-1<10){
        setCalMonthStart(`0${Number(calMonthStart)-1}`)
      }
      else{
        setCalMonthStart(`${Number(calMonthStart)-1}`)
      }
  }
  else{
    setCalMonthStart('12')
    setCalDateStartInput(e.target.innerHTML)
    setCalYearStart(`${Number(calYearStart)-1}`)
  }

 }

 const downClickEnd = (e) =>{
  if(Number(calMonthEnd)-1>0){
      if(Number(calMonthEnd)-1<10){
        setCalMonthEnd(`0${Number(calMonthEnd)-1}`)
      }
      else{
        setCalMonthEnd(`${Number(calMonthEnd)-1}`)
      }
  }
  else{
    setCalMonthEnd('12')
    setCalDateEndInput(e.target.innerHTML)
    setCalYearEnd(`${Number(calYearEnd)-1}`)
  }

 }




  const clickLastGrey = (e) => {
    setCalDateStartInput(e.target.innerHTML)
    if(Number(calMonthStart)+1<=12){
    
        if(Number(calMonthStart)+1<10){
          setCalMonthStart(`0${Number(calMonthStart)+1}`)
        }
        else{
          setCalMonthStart(`${Number(calMonthStart)+1}`)
        }
    }
    else{
      setCalMonthStart('01')
      setCalYearStart(`${Number(calYearStart)+1}`)
    }
  }
 
  const clickLastGreyEnd = (e) => {
    setCalDateEndInput(e.target.innerHTML)
    if(Number(calMonthEnd)+1<=12){
    
        if(Number(calMonthEnd)+1<10){
          setCalMonthEnd(`0${Number(calMonthEnd)+1}`)
        }
        else{
          setCalMonthEnd(`${Number(calMonthEnd)+1}`)
        }
    }
    else{
      setCalMonthEnd('01')
      setCalYearEnd(`${Number(calYearEnd)+1}`)
    }
  }


  const upClick = (e)=>{
      if(Number(calMonthStart)+1<=12){
          if(Number(calMonthStart)+1<10){
            setCalMonthStart(`0${Number(calMonthStart)+1}`)
          }
          else{
            setCalMonthStart(`${Number(calMonthStart)+1}`)
          }
      }
      else{
        setCalMonthStart('01')
        setCalYearStart(`${Number(calYearStart)+1}`)
      }
  }


  const upClickEnd = (e)=>{
    if(Number(calMonthEnd)+1<=12){
        if(Number(calMonthEnd)+1<10){
          setCalMonthEnd(`0${Number(calMonthEnd)+1}`)
        }
        else{
          setCalMonthEnd(`${Number(calMonthEnd)+1}`)
        }
    }
    else{
      setCalMonthEnd('01')
      setCalYearEnd(`${Number(calYearEnd)+1}`)
    }
}



  const clickMinute = (e) =>{
    setCalMinuteStart(e.target.innerHTML)
  }

  const clickMinuteEnd = (e) =>{
    setCalMinuteEnd(e.target.innerHTML)
  }

  const handleClickOutside = ({ target }) => {
       console.log("%%%%%%%%%",target)
      // console.log("%%%%%%%%%editcal1",editcal1Ref.current.contains(target))
       if(editcal1Ref.contains !== null){
        if (calStart&&!editcal1Ref.current.contains(target)) {
          setCalStart(false);    
          }
       }
       if(editcal2Ref.contains !== null){
      if (calEnd&&!editcal2Ref.current.contains(target)) {
        setCalEnd(false);    
      }
  }
   
   
};

  useEffect(()=>{
    

    if(props.summary){
      setHeight(130)
    }
    else{
      setHeight(90)
    }
    
    if(Number(calHourStart) >= 12){
      if(Number(calHourStart)-12 < 10){
        setCalHourStartCal( `0${Number(calHourStart)-12}`)
      setNoonStart('afternoon')
      }
      else{
        setCalHourStartCal( `${Number(calHourStart)-12}`)
        setNoonStart('afternoon')
      }
    }
    else{
      setCalHourStartCal(calHourStart)
      setNoonStart('noon')
    }



    if(Number(calHourEnd) >= 12){
      if(Number(calHourEnd) - 12 < 10){
        setCalHourEndCal( `0${Number(calHourEnd)-12}`)
        setNoonEnd('afternoon')
      }
      else {
        setCalHourEndCal( `${Number(calHourEnd)-12}`)
        setNoonEnd('afternoon')
      }
   
      
    }
    else{
      setCalHourEndCal(calHourEnd)
      setNoonEnd('noon')
    }
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
    window.removeEventListener("mousedown", handleClickOutside);
    };
   


  },[calStart,calEnd])
  // const [title, setTitle] = useState('');
  // const [summary,setSummart] = useState('');


  

   return(
       <div style={{ justifyContent: 'center'}}>

           {
           removeSche? 
           null
           :
           isEdit?
                 <ScheduleBody>
                    
                 <div style={{ paddingLeft:'15px',textAlign:'left'}}>
                     <h2 style={{color:'#4A78E6'}}>{title}</h2>
                     <div style={{height:'50px',textAlign:'left', width:'450px'}}> 
                {summary}
                 </div>
                     <div style={{display:'flex'}}>
                      <div style={{paddingRight:'5px' ,color:'grey'}}>{props.startDate.substr(0,4)}.{props.startDate.substr(4,2)}.{props.startDate.substr(6,2)}.{props.startDate.substr(8,2)}:{props.startDate.substr(10,2)}{props.startDate.substr(12,2)}~</div>
                      <div style={{paddingRight:'5px' ,color:'grey'}}>{props.endDate.substr(0,4)}.{props.endDate.substr(4,2)}.{props.endDate.substr(6,2)}.{props.endDate.substr(8,2)}:{props.endDate.substr(10,2)}{props.endDate.substr(12,2)}</div>
                     </div>
                     <br/>
                     <br/>
                 </div>

                

                     <div style={{display:'flex',paddingTop:'60px'}}>
                          <div style={{paddingRight:'5px' ,color:'grey'}} onClick={edit}>수정</div>
                          <div style={{paddingRight:'5px' ,color:'grey'}}>|</div>
                          <div style={{paddingRight:'5px' ,color:'grey'}} onClick={remove}>삭제</div>
                     </div>
                     
             </ScheduleBody>
           :
           <ScheduleBody>
           <div style={{ paddingLeft:'15px',textAlign:'left'}}>
              <input defaultValue={title}  style={{borderBottom:"#4A78E6 4px solid",borderTop:'medium none',borderRight:'medium none',borderLeft:'medium none' ,height:'40px',fontSize:'28px',width:'500px'}} ref={titleRef}/>
              <input  defaultValue = {summary} style={{textAlign:'left', width:'450px',borderBottom:"#4A78E6 4px solid",borderTop:'medium none',borderRight:'medium none',borderLeft:'medium none' ,width:'500px'}} ref={summaryRef}/> 
                
                 
               <div style={{display:'flex'}}>
               <img style={{paddingLeft:'20px'}} src={require('../images/blackCal.png').default}  style={{width:'50px'}} onClick={openCalStart}/>
                <div style={{paddingRight:'5px' ,color:'grey'}}>{calYearStart}.{calMonthStart}.{calDateStart}.{calHourStart}:{calMinuteStart}~</div>
                <img style={{paddingLeft:'20px'}} src={require('../images/blackCal.png').default}  style={{width:'50px'}} onClick={openCalEnd}/>
                <div style={{paddingRight:'5px' ,color:'grey'}}>{calYearEnd}.{calMonthEnd}.{calDateEnd}.{calHourEnd}:{calMinuteEnd}</div>
               </div>
                <div style={{zIndex:'5',position:'absolute' ,display: calStart? "block": "none"}} ref={editcal1Ref}>
                <EditCal calDateStartinput={calDateStartinput} calHourStartCal={calHourStartCal} clickDate={clickDate} calMinuteStart={calMinuteStart} clickHour={clickHour} clickMinute={clickMinute} noonStart={noonStart} clickNoon={clickNoon} calMonthStart={calMonthStart} calYearStart={calYearStart} clickFistGrey={clickFistGrey} calDateStart={calDateStart} clickLastGrey={clickLastGrey} downClick={downClick} upClick={upClick}/>
                </div>
                <div style={{zIndex:'5',position:'absolute',left:'230px',display: calEnd? "block": "none"}} ref={editcal2Ref}>
                <EditCal calDateEndinput={calDateEndinput} calHourEndCal={calHourEndCal} clickDateEnd={clickDateEnd} calMinuteEnd={calMinuteEnd} clickHourEnd={clickHourEnd} clickMinuteEnd={clickMinuteEnd} noonEnd={noonEnd} clickNoonEnd={clickNoonEnd} calMonthEnd={calMonthEnd} calYearEnd={calYearEnd} clickFistGreyEnd={clickFistGreyEnd} calDateEnd={calDateEnd} clickLastGreyEnd={clickLastGreyEnd} downClickEnd={downClickEnd} upClickEnd={upClickEnd}/>
                </div>
               <br/>
               <br/>
           </div>
               
               <div style={{display:'flex',paddingTop:'60px'}}>
                    <div style={{paddingRight:'5px' ,color:'white', backgroundColor:'#4A78E6', width:'40px',height:'30px',borderRadius:'10px'}} onClick={submit}>확인</div>
                    <div style={{marginLeft:"4px", paddingRight:'5px' ,color:'white', backgroundColor:'#4A78E6', width:'40px',height:'30px',borderRadius:'10px'}} onClick={cancel}>취소</div>
               </div>
       </ScheduleBody>
        
        }
      
       </div>
   )
  }


  const mapStateToProps = state =>{
    return{
      editYearStart:state.editYearStart,
      editMonthDisplayStart:state.editMonthDisplayStart,
      editDateDisplayStart:state.editDateDisplayStart,
      editHourDisplayStart:state.editHourDisplayStart,
      editMinuteStart:state.editMinuteStart,
    }
    
} 
const mapDispatchToprops = (dispatch)=>{
    
  return {
    EditScheduleStart: (editYearStart,editMonthStart,editDateStart,editHourStart,editMinuteStart,editNoonStart)=>  dispatch(EditScheduleStart(editYearStart,editMonthStart,editDateStart,editHourStart,editMinuteStart,editNoonStart)),
  }
} 
export default connect(mapStateToProps,mapDispatchToprops)(Schedule)
import styled from "styled-components";
import React, {useState, useEffect,useRef} from 'react';
import { collection, getDoc, getDocs, setDoc, doc,query,limit,addDoc } from "firebase/firestore";
import firebaseConfig, {db,firebaseui,app,ui,uiConfig}  from '../firebase.config'
import { connect,useSelector } from 'react-redux';
import InputCal from './inputCal'
import InputCal2 from './inputCal2'
import inputCal from "./inputCal";
let monthList = ['January','February','March','April','May','June','July','Agust','September','October','November','December']
function AddSchedule(props){
    const [text, setText] = useState('');
    const [textArea, setTextArea] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isopenStart, setIsopenStart] = useState(false);
    const [isopenEnd, setIsopenEnd] = useState(false);
    const [monthNum, setMonthNum] = useState(monthList.indexOf(props.inputMonthStart)+1)
    const inputCal1Ref = useRef();
    const intputCal2Ref = useRef();


    let ScheduleBody = styled.div`
    border: 1px solid black;
    // padding: 20px 20px 20px 20px;
     display: flex;
     justify-content: center;
     align-items: center;
     padding-bottom: 10px;
     background-color: white;
     border-radius: 10px; 
    margin:20px 20px;
    padding:10px;
    justify-content: space-between;
    height: 80px;
     `
     const openCalStart =(e)=>{

        setIsopenStart(true)
       }
       const openCalEnd =(e)=>{

        setIsopenEnd(true)
       }



    const startTimeInuput =(e)=>{
     console.log(e)
      let year =e.target.value.substr(0, 4)
      let month = e.target.value.substr(5, 2)
      let date =e.target.value.substr(8, 2)
      let hour =e.target.value.substr(11, 2)
      let minutes =e.target.value.substr(14, 2)
      setStartDate(year+month+date+hour+minutes)
    }

    const endTimeInuput =(e)=>{
   
        let year =e.target.value.substr(0, 4)
        let month = e.target.value.substr(5, 2)
        let date =e.target.value.substr(8, 2)
        let hour =e.target.value.substr(11, 2)
        let minutes =e.target.value.substr(14, 2)
        setEndDate(year+month+date+hour+minutes)
    }
    
    

    const textInput =(e)=>{
    console.log(e.target.value)
    setText(e.target.value)

    }


    const textAreaInput =(e)=>{
        console.log(e.target.value)
        setTextArea(e.target.value)
        
    }



    const subnmit =(e)=>{
        if(startDate > endDate){
            alert('날짜를 정확히 확인해주세요~')
        }
        else if(props.userInfo){
        console.log(typeof(startDate))
        console.log(typeof(endDate))
        console.log(typeof(endDate))
        console.log(props.userInfo)
            addDoc(collection(db, "schedule"),{
                start_date:props.inputWholeDateStart,
                end_date:props.inputWholeDateEnd,
                title:text,
                summary:textArea,
                userid:props.userInfo,
              //  id: addDoc.id
                }).then((docref)=>{
              console.log(docref)
              alert('성공')
            })
        }
        else{
            alert('로그인해주세요')
        }
      }
     const handleClickOutside=({target})=>{
            if (isopenStart&&!inputCal1Ref.current.contains(target)) {
              setIsopenStart(false);    
              }
            if (isopenEnd&&!intputCal2Ref.current.contains(target)) {
                setIsopenEnd(false);    
          }
      }
      useEffect(()=>{
        window.addEventListener("mousedown", handleClickOutside);
        return () => {
        window.removeEventListener("mousedown", handleClickOutside);
        };
       
    
    
      },[isopenStart,isopenEnd])

  
   return(
       <div style={{ justifyContent: 'center', width:'650px', backgroundColor: 'white',fontFamily:'NotoSansKR-Bold'}}>
           
                <div style={{display:'flex',alignItems:"center" }}>
                    <img src={require('../images/blackCal.png').default}  style={{width:'50px'}} onClick={openCalStart}/>
                    
                     <div style={{fontSize:'30px',color:'#4A78E6'}}>시작:</div>
                     <div style={{paddingLeft:'20px'}}>{props.inputYearStart}.{props.inputMonthDisplayStart}.{props.inputDateDisplayStart}.{props.inputHourDisplayStart}:{props.inputMinuteStart}</div>
                        <img style={{paddingLeft:'20px'}} src={require('../images/blackCal.png').default}  style={{width:'50px'}} onClick={openCalEnd}/>
                   
                        <div style={{fontSize:'30px',color:'#4A78E6'}}>종료:</div>
                        <div style={{paddingLeft:'20px'}}>{props.inputYearEnd}.{props.inputMonthDisplayEnd}.{props.inputDateDisplayEnd}.{props.inputHourDisplayEnd}:{props.inputMinuteEnd}</div>
                </div>
                    <div style={{zIndex:'5',position:'absolute',display:isopenStart? "block":"none"}} ref={inputCal1Ref}>
                    <InputCal/>
                    </div>

                    <div style={{zIndex:'5',position:'absolute', display:isopenEnd? "block":"none" }} ref={intputCal2Ref}>
                    <InputCal2/>
                    </div>


                <hr/>
                <div style={{ height : '300px', display: 'flex', flexDirection:'column'}}>
                    <input type='text'  style={{ border : 'none', width:'596px',height:'90px',fontSize:'30px'}} placeholder='제목' onChange={textInput} />
                    <br/>
                    <hr/>
                    <textarea placeholder='상세' style={{ border : 'none', width:'596px',height:'400px',resize: 'none',fontSize:'20px'}} onChange={textAreaInput}/>
                    <button type="submit" onClick={subnmit} style={{height:'50px',width:'80px',backgroundColor:'#4A78E6',color:'white',fontSize:'25px',borderRadius:'16px',marginLeft:'90%',fontFamily:'NotoSansKR-Bold'}}>확인</button> 

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

        inputYearStart:state.inputYearStart,
        inputMonthStart:state.inputMonthStart,
        inputDateStart:state.inputDateStart,
        inputHourStart:state.inputHourStart,
        inputMinuteStart:state.inputMinuteStart,
        inputNoonStart:state.inputNoonStart,
        inputMonthDisplayStart:state.inputMonthDisplayStart,
        inputDateDisplayStart:state.inputDateDisplayStart,
        inputHourDisplayStart:state.inputHourDisplayStart,

        inputWholeDateStart:state.inputWholeDateStart,


        inputYearEnd: state.inputYearEnd,
        inputMonthEnd:state.inputMonthEnd,
        inputDateEnd:state.inputDateEnd,
        inputHourEnd:state.inputHourEnd,
        inputMinuteEnd:state.inputMinuteEnd,
        inputNoonEnd:state.inputNoonEnd,

        inputMonthDisplayEnd:state.inputMonthDisplayEnd,
        inputDateDisplayEnd:state.inputDateDisplayEnd,
        inputWholeDateEnd:state.inputWholeDateEnd,
        inputHourDisplayEnd:state.inputHourDisplayEnd,
    }
} 
export default connect(mapStateToProps)(AddSchedule)



{/* <div style={{ justifyContent: 'center', width:'600px'}}>
       <ScheduleBody>
           <div style={{display:'flex', paddingLeft:'15px'}}>
               <input style={{width:'200px'}} ></input>
           </div>
           <input type='datetime-local' name='userBirthday' onChange={input}/>

           <div style={{display:'flex',flexDirection:'column'}}>
               <button/>
           </div>
           
       </ScheduleBody>
       
       </div> */}
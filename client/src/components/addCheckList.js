import styled from "styled-components";
import React, {useState, useEffect} from 'react';
import { collection, getDoc, getDocs, setDoc, doc,query,limit,addDoc } from "firebase/firestore";
import firebaseConfig, {db,firebaseui,app,ui,uiConfig}  from '../firebase.config'
import { connect,useSelector } from 'react-redux';
import InputCal3 from './inputCal3'

function AddCheckList(props){
    const [text, setText] = useState('');
    const [textArea, setTextArea] = useState('');
    const [date, setDate] = useState('');
    const [isopen, setIsopen] = useState(false);
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
    const textInput =(e)=>{
        console.log(e.target.value)
        setText(e.target.value)
    
        }
    
    
        const textAreaInput =(e)=>{
            console.log(e.target.value)
            setTextArea(e.target.value)
            
        }
    
   



    const timeInuput =(e)=>{
        console.log(e.target.value)
        let year =e.target.value.substr(0, 4)
        let month = e.target.value.substr(5, 2)
        let date =e.target.value.substr(8, 2)
        setDate(year+'-'+month+'-'+date)
      }

      const subnmit =(e)=>{
        if(props.userInfo){
        console.log(`${props.checkListYear}${props.checkMonthDisplay}${props.checkDateDisplay}0000`)
        console.log(typeof(endDate))
        console.log(typeof(endDate))
        console.log(props.userInfo)
            addDoc(collection(db, "checklist"),{
                date:`${props.checkListYear}${props.checkMonthDisplay}${props.checkDateDisplay}0000`,
                title:textArea,
                summary:text,
                userid:props.userInfo,
                check:false
                }).then((docref)=>{
             // console.log(docref)
              alert(`${props.checkListYear}${props.checkMonthDisplay}${props.checkDateDisplay}0000`)
            })
        }
        else{
            alert('로그인해주세요')
        }
      }



      const openCalStart =(e)=>{

        setIsopen(!isopen)
       }


       useEffect(()=>{

       },[props.date])



   return(
       <div style={{ justifyContent: 'center', width:'650px', backgroundColor: 'white'}}>
           
                <div style={{display:'flex',alignItems:'center' }}>
                    {/* <input type='date' className='check1' onChange={timeInuput} style={{ border : 'none', disply:'none'}} /> */}
                    {/* <label htmlFor="check1" style={{ border: '1px solid black', width:'600px'}}>5656</label> */}
                    <div>
                        <div style={{display:'flex',alignItems:'center'}}>
                            <img src={require('../images/blackCal.png').default}  style={{width:'50px'}} onClick={openCalStart}/>
                            <div style={{fontSize:'30px',color:'#4A78E6'}}>날짜설정:</div>
                            <div style={{paddingLeft:'20px'}}>{props.checkListYear}.{props.checkMonthDisplay}.{props.checkDateDisplay}</div>

                        </div>
                      
                    </div>
                </div>
                {isopen?

                    <div style={{zIndex:'5',position:'absolute'}}>
                    <InputCal3/>
                    </div>
                    :
                    null
                    }
                <hr/>
                <div style={{ height : '300px', display: 'flex', flexDirection:'column'}}>
                <input type='text'  style={{ border : 'none', width:'596px',height:'90px',fontSize:'30px'}} placeholder='제목' onChange={textInput} />
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
        checkListYear: state.checkListYear,
        checkListMonth: state.checkListMonth,
        checkDate: state.checkDate,
        checkMonthDisplay:state.checkMonthDisplay,
        checkDateDisplay:state.checkDateDisplay,
    }
} 
export default connect(mapStateToProps)(AddCheckList)
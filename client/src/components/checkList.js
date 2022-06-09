import { useEffect,useState,useRef,useReducer  } from "react";
import styled from "styled-components";
import EditCal2 from './editcal2'
import firebaseConfig, {db,firebaseui,app,ui,uiConfig}  from '../firebase.config'
import { collection, getDoc, getDocs, setDoc, doc, query,where,orderBy,startAt, endAt,limit ,updateDoc,deleteDoc} from "firebase/firestore";

 function CheckList(props) {
    const [check, setCheck] = useState(props.check? "grey":"white");
    const [checkcolor, setCheckcolor] = useState(props.check? "black":"grey");
    const [vali, setVali] = useState(props.check);
    const [textColor, setTextColor] = useState(props.check? "black":'#4A78E6');

    const [openCal, setOpenCal] = useState(false);
    const [isEdit, setIsEdit] = useState(true);
    const [year, setYear] = useState(props.date.substr(0,4));
    const [month, setMonth] = useState(props.date.substr(4,2));
    const [date, setDate] = useState(props.date.substr(6,2));
    const [calDateInput,setCaldateInput] = useState(`${Number(props.date.substr(6,2))}`)
     
   //setVali(props.check)
     console.log('$$$$$$$$$',props.check)
     console.log('$$$$$$$$$',props.name)
     console.log('$$$$$$$$$$',vali)
    // setVali(props.check)
    let ScheduleBody = styled.div`
    // padding: 20px 20px 20px 20px;
    border-bottom: 1px solid grey;
     display: flex;
     justify-content: center;
     align-items: center;
     padding-bottom: 10px;
     background-color: white;
    margin:20px 20px;
    padding:10px;
    justify-content: space-between;
    height: 130px;
    background-color: ${check};
     `

    let ScheduleBodyInput = styled.div`
    // padding: 20px 20px 20px 20px;
    border-bottom: 1px solid grey;
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
    
    const clickCheck = (e)=>{
    console.log(e.target.checked)
    
        if(e.target.checked === true){
        //  e.target.checked=false;
            setCheck('grey')
            console.log(e.target.checked)
            setVali(e.target.checked)
            setCheckcolor('black')
            setTextColor('black')
            // e.target.checked =e.target.checked
        }
        else if((e.target.checked === false)){
          //e.target.checked=true;
            setCheck('white')
            setVali(e.target.checked)
            setCheckcolor('grey')
            setTextColor('#4A78E6')
            
        }

        updateDoc(doc(db, "checklist", props.id), {
          check :e.target.checked ,
    
        }).then((docref)=>{
          console.log(docref)
        //  alert('성공')
          
          props.refreshContainer()
        })
       
    }
    const edit =()=> {
        setIsEdit(!isEdit)
       
    
    
        console.log('22222')
      }
      const open = ()=>{
          setOpenCal(!openCal)
      }

    const clickDate =(e)=>{
        console.log(e.target.innerHTML)
        setCaldateInput(e.target.innerHTML)
        if(Number(e.target.innerHTML)<10){
            setDate(`0${e.target.innerHTML}`)
        }
        else{
            setDate(e.target.innerHTML)
        }
  }
  const upClick = (e)=>{
    if(Number(month)+1<=12){
        if(Number(month)+1<10){
          setMonth(`0${Number(month)+1}`)
        }
        else{
          setMonth(`${Number(month)+1}`)
        }
    }
    else{
      setMonth('01')
      setYear(`${Number(year)+1}`)
    }
}

const downClick = (e) =>{
    if(Number(month)-1>0){
        if(Number(month)-1<10){
          setMonth(`0${Number(month)-1}`)
        }
        else{
          setMonth(`${Number(month)-1}`)
        }
    }
    else{
      setMonth('12')
      setCaldateInput(e.target.innerHTML)
      setYear(`${Number(year)-1}`)
    }
  
   }

   const clickFistGrey = (e) =>{
    console.log('hi')
   // month -1
   // january일때 month가 12 january -1 
    if(Number(month)-1>0){
      setCaldateInput(e.target.innerHTML)
        if(Number(month)-1<10){
          setMonth(`0${Number(month)-1}`)
        }
        else{
          setMonth(`${Number(month)-1}`)
        }
    }
    else{
      setMonth('12')
      setCaldateInput(e.target.innerHTML)
      setYear(`${Number(year)-1}`)
    }
   
  }

  const clickLastGrey = (e) => {
    setCaldateInput(e.target.innerHTML)
    if(Number(month)+1<=12){
    
        if(Number(month)+1<10){
          setMonth(`0${Number(month)+1}`)
        }
        else{
          setMonth(`${Number(month)+1}`)
        }
    }
    else{
      setMonth('01')
      setYear(`${Number(year)+1}`)
    }
  }

  const submit=()=>{

    updateDoc(doc(db, "checklist", props.id), {
      date :`${year}${month}${date}0000`,

    }).then((docref)=>{
      console.log(docref)
      alert('성공')
      setIsEdit(!isEdit)
//props.refreshContainer()
    })
   
  }

  const cancel = (e) =>{
    //const curcheck = !props.check;
    console.log("ji")
   

    setIsEdit(!isEdit);
  }

  const dele = ()=>{
    deleteDoc(doc(db, "checklist", props.id), {
    

    }).then((docref)=>{
      console.log(docref)
      alert('성공')
     
     // props.refreshContainer()
    })
  }

  
  // useEffect(()=>{
  //  //  setVali(props.check)
  //   if(vali === true){
   
  //     setCheck('white')
   
  //     setCheckcolor('grey')
  //     setTextColor('#4A78E6')
  //   } 
  //   else{
  //     setCheck('grey')
     
  //     setCheckcolor('black')
  //     setTextColor('black')
  //   }
  //           } ,[props.check])
   return(
       <div style={{ justifyContent: 'center'}}>
        {isEdit?
            <ScheduleBody>
            <div style={{ paddingLeft:'15px',textAlign:'left'}}>
                <div style={{display:'flex'}}>
                        <input type='checkbox' style={{width:'30px',height:'30px',marginTop:'22px'}} checked={vali} onChange = {(e)=>clickCheck(e)}></input>
                    <h2 style={{color:`${textColor}` ,paddingLeft:'10px'}}>{props.name}</h2>
                    
                    </div>
                    <div style={{height:'50px',textAlign:'left', width:'450px',paddingLeft:'10px'}}> 
                        {props.summary}
                        </div>
                    <div style={{display:'flex'}}>
                            <div style={{paddingRight:'5px' ,color:`${checkcolor}`}}>{props.date.substr(0,4)}.{props.date.substr(4,2)}.{props.date.substr(6,2)}</div>
                     
                            <br/>
                            <br/>
                    </div>
                </div>
                        
                    
                    <div style={{display:'flex',paddingTop:'60px'}}>
                            <div style={{paddingRight:'5px' ,color:`${checkcolor}`}} onClick={edit}>수정</div>
                            <div style={{paddingRight:'5px' ,color:`${checkcolor}`}}>|</div>
                            <div style={{paddingRight:'5px' ,color:`${checkcolor}`}} onClick={dele}>삭제</div>
                    </div>
            </ScheduleBody>
            :
            <ScheduleBodyInput>
            <div style={{ paddingLeft:'15px',textAlign:'left'}}>
                <div style={{display:'flex'}}>
             
                        <input defaultValue={props.name} style={{borderBottom:"#4A78E6 4px solid",borderTop:'medium none',borderRight:'medium none',borderLeft:'medium none' ,height:'40px',fontSize:'28px',width:'500px'}}/>
                    
                    </div>
                    <input  defaultValue = {props.summary} style={{textAlign:'left', width:'450px',borderBottom:"#4A78E6 4px solid",borderTop:'medium none',borderRight:'medium none',borderLeft:'medium none' ,width:'500px'}}/> 
                    <div style={{display:'flex'}}>
                    <img style={{paddingLeft:'20px'}} src={require('../images/blackCal.png').default}  style={{width:'50px',height:'50px'}} onClick={open} />
                    <div style={{paddingRight:'5px' ,color:`${checkcolor}`}}>{year}.{month}.{date}</div>
                    
                  
                            <br/>
                            <br/>
                    </div>
                    {openCal?
                      <div style={{zIndex:'5',position:'absolute'}}>
                      <EditCal2 calDateStartinput={calDateInput} clickDate={clickDate}   calMonthStart={month} calYearStart={year} clickFistGrey={clickFistGrey} calDateStart={date} clickLastGrey={clickLastGrey} downClick={downClick} upClick={upClick}/>
                      </div>
                    :
                    null

                    }
                </div>
                        
                    
                    <div style={{display:'flex',paddingTop:'60px'}}>
                      <div style={{paddingRight:'5px' ,color:'white', backgroundColor:'#4A78E6', width:'40px',height:'30px',borderRadius:'10px'}} onClick={submit}>확인</div>
                      <div style={{marginLeft:"4px",paddingRight:'5px' ,color:'white', backgroundColor:'#4A78E6', width:'40px',height:'30px',borderRadius:'10px'}} onClick={cancel}>취소</div>
                    </div>
            </ScheduleBodyInput>

                
       }
       </div>
   )
    }
export default CheckList
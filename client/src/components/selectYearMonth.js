import { useEffect,useState,useRef,useReducer  } from "react";
import styled from "styled-components";
import store from '../redux/store/store';
import { connect,useSelector } from 'react-redux';
import { ApplyMonthYear} from '../redux/actions/action'



    function SelectYearMonth(props){
        
        const currentYear = useSelector(state => state.year);
         console.log(currentYear)
         let selectYear = props.year;
         
         
    let monthList = ['January','February','March','April','May','June','July','Agust','September','October','November','December']
    const [modalyears, setModalYears] = useState(null);
   
    const yearRef = useRef(null);
    const monthRef = useRef(null);


    let Modal = styled.div`
     width: 300px;
     height: 300px;
     border: 1px solid red;
    `
    let Month = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width:'33.3%';
    `
    let now = new Date();
    let year = now.getFullYear();
    let todayMonth = now.getMonth()+1;
    let todatDate = now.getDate();
    const changeYearPlus=()=>{
        selectYear = yearRef.current.innerHTML
             =   `${Number(yearRef.current.innerHTML)+1}`
        console.log(yearRef.current)
        console.log(document.getElementById('years'))
   //     setModalYears(years+1)
    }
    const changeYearMinus=()=>{
        console.log(yearRef.current.innerHTML
             =   `${Number(yearRef.current.innerHTML)-1}`)
        console.log(yearRef.current)
        console.log(document.getElementById('years'))
      //  setModalYears(years+1)
    }
    const clickMonth=(e)=>{
        console.log('hi!!')
       
        console.log(e.target.innerHTML)
        console.log(monthList)
        console.log(monthList.indexOf(e.target.innerHTML))
        console.log(store)
    }
  
 return(
     <div>
        <Modal>
            <div>
                <br/>
                <div style={{display:'flex',justifyContent: "center"}}>
                    <button onClick={changeYearMinus}> &lt;</button>
                    <div  ref={yearRef}>{props.year}</div>
                    {/* <div>{modalyears}</div> */}
                    <button onClick={changeYearPlus} >&gt;</button>
                </div>
                <hr/>
            </div>
            <div style={{display:'flex', height:'18%',  }} >
                <div onClick = {()=>props.ApplyMonthYear('January',selectYear)} style={{width:'33.3%', display:'flex',flexDirection:'column',justifyContent:'center'}}>January</div>
                <div onClick = {()=>props.ApplyMonthYear('February',selectYear)} style={{width:'33.3%', display:'flex',flexDirection:'column',justifyContent:'center'}}>February</div>
                <div onClick = {()=>props.ApplyMonthYear('March',selectYear)} style={{width:'33.3%', display:'flex',flexDirection:'column',justifyContent:'center'}}>March</div>
            </div>
            <div style={{display:'flex', height:'18%'}} >
            <div onClick = {()=>props.ApplyMonthYear('April',selectYear)} style={{width:'33.3%', display:'flex',flexDirection:'column',justifyContent:'center'}}>April</div>
            <div onClick = {()=>props.ApplyMonthYear('May',selectYear)} style={{width:'33.3%', display:'flex',flexDirection:'column',justifyContent:'center'}}>May</div>
            <div onClick = {()=>props.ApplyMonthYear('June',selectYear)} style={{width:'33.3%', display:'flex',flexDirection:'column',justifyContent:'center'}}>June</div>
            </div>
            <div style={{display:'flex', height:'18%'}} >
            <div onClick = {()=>props.ApplyMonthYear('July',selectYear)} style={{width:'33.3%', display:'flex',flexDirection:'column',justifyContent:'center'}}>July</div>
            <div onClick = {()=>props.ApplyMonthYear('Agust',selectYear)} style={{width:'33.3%', display:'flex',flexDirection:'column',justifyContent:'center'}}>Agust</div>
            <div onClick = {()=>props.ApplyMonthYear('September',selectYear)} style={{width:'33.3%', display:'flex',flexDirection:'column',justifyContent:'center'}}>September</div>
            </div>
            <div style={{display:'flex', height:'18%'}} >
            <div onClick = {()=>props.ApplyMonthYear('October',selectYear)} style={{width:'33.3%', display:'flex',flexDirection:'column',justifyContent:'center'}}>October</div>
            <div onClick = {()=>props.ApplyMonthYear('November',selectYear)} style={{width:'33.3%', display:'flex',flexDirection:'column',justifyContent:'center'}}>November</div>
            <div onClick = {()=>props.ApplyMonthYear('December',selectYear)} style={{width:'33.3%', display:'flex',flexDirection:'column',justifyContent:'center'}}>December</div>
            </div>
           
        </Modal>
     </div>
 )
}
const mapStateToProps = state =>{
    return{
        year : state.year
    }
} 
const mapDispatchToprops = (dispatch)=>{
    
    return {
        ApplyMonthYear: (month,year)=>  dispatch(ApplyMonthYear(month,year))
    }
} 
export default connect(mapStateToProps,mapDispatchToprops)(SelectYearMonth)
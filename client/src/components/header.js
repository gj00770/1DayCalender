import { useState } from 'react'
import styled from "styled-components";
import { connect,useSelector } from 'react-redux';
import { PlusMonth,MinusMonth,ShortCut,NextWeek,PrevWeek} from '../redux/actions/action'
import SelectYearMonth from './selectYearMonth'
//생활,교통,법,의료,교육, 

function Header(props){
    const [isOpen, setIsOpen] = useState(false);
    let Header = styled.div`
    padding: 20px 20px 20px 20px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    `
    let SignUpIn = styled.div`
    height: 20px;
    display: flex;
    font-size: 26px;
    padding: 10px 0px 10px 30px;
    display: flex;
    align-items: center;
    height: 50px;
    `
   const openYearMonth = () =>{
       setIsOpen(true)
   }

    return(
          <Header> 
             <div>
                <SignUpIn >
                {   props.shortCut === false?
                    <div style={{color:'#4A78E6',fontSize:'34px' }} onClick={()=>props.MinusMonth(props.month,props.year)}>&lt;</div> :
                    <div style={{color:'#4A78E6',fontSize:'34px'}} onClick={()=>props.PrevWeek(props.month, props.year,  props.shortCutPointer)}>&lt;</div> 

                     }
                <div style={{paddingLeft:'20px'}}>{props.year}년 </div>   
                <div style={{paddingLeft:'10px'}}>{props.monthNumber}월 </div> 
                {   props.shortCut === false?  
                <div style={{color:'#4A78E6',paddingLeft:'20px',fontSize:'34px'}} onClick={()=>props.PlusMonth(props.month,props.year,props.monthNumber)}>&gt;</div>   :
                <div style={{color:'#4A78E6',paddingLeft:'20px',fontSize:'34px'}} onClick={()=>props.NextWeek(props.month, props.year,  props.shortCutPointer)}>&gt;</div> 
                }                
                </SignUpIn>
             </div>
            
             <div>
             <div onClick={()=>props.ShortCut()}>접기</div> 
                
             </div>   
             { isOpen? 
             <div style={{position:'absolute'}}>
             <SelectYearMonth/>
             </div>
             :
             null
            }
          </Header> 
    )

    
}
const mapStateToProps = state =>{
    return{
        year : state.year,
        month : state.month,
        selectDate: state.selectDate,
        monthNumber: state.monthNumber,
        shortCut: state.shortCut,
        shortCutPointer: state.shortCutPointer
    }
} 
const mapDispatchToprops = (dispatch)=>{
    
    return {
        PlusMonth: (month,year)=>  dispatch(PlusMonth(month,year)),
        MinusMonth: (month,year)=>  dispatch(MinusMonth(month,year)),
        ShortCut: (shortCut)=> dispatch(ShortCut(shortCut)),
        NextWeek: (month,year,shortCutPointer)=> dispatch(NextWeek(month,year,shortCutPointer)),
        PrevWeek: (month,year,shortCutPointer)=> dispatch(PrevWeek(month,year,shortCutPointer)),
    }
} 

export default connect(mapStateToProps,mapDispatchToprops)(Header)
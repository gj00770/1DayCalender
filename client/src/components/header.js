import { useState } from 'react'
import styled from "styled-components";
import { connect,useSelector } from 'react-redux';
import { PlusMonth,MinusMonth} from '../redux/actions/action'
//생활,교통,법,의료,교육, 

function Header(props){
    let Header = styled.div`
    padding: 20px 20px 20px 20px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    `
    let SignUpIn = styled.div`
    
    height: 20px;
    display: flex;
    
    `

   

    return(
          <Header> 
             <div>
                <SignUpIn>
                     <div >로그인</div>
                     <div style = {{padding:'0 10px 0 0'}}>회원가입</div>
                </SignUpIn>
                <SignUpIn>
                <h3>{props.month}</h3>   
                <h3>{props.year}</h3>   
                </SignUpIn>
             </div>
            
             <div>
             <div>접기</div> 
                <SignUpIn>
                    <button onClick={()=>props.MinusMonth(props.month,props.year)}>&lt;</button>  
                    <button onClick={()=>props.PlusMonth(props.month,props.year)}>&gt;</button>  
                </SignUpIn>
             </div>   
          </Header> 
    )

    
}
const mapStateToProps = state =>{
    return{
        year : state.year,
        month : state.month,
        selectDate: state.selectDate
    }
} 
const mapDispatchToprops = (dispatch)=>{
    
    return {
        PlusMonth: (month,year)=>  dispatch(PlusMonth(month,year)),
        MinusMonth: (month,year)=>  dispatch(MinusMonth(month,year))
    }
} 

export default connect(mapStateToProps,mapDispatchToprops)(Header)
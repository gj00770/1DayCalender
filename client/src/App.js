import './App.css';

import Weather from './pages/weather'
import React, {useState, useEffect,useRef} from 'react';
import firebase from 'firebase/compat/app'
import { signOut, getAuth, setPersistence, signInWithRedirect, signInWithPopup, onAuthStateChanged, GoogleAuthProvider,browserSessionPersistence ,getRedirectResult} from "firebase/auth"

import Wholecal from './pages/wholecal'
import AddScheduleContainer from './pages/addScheduleContainer'
import { useMediaQuery } from 'react-responsive'
import UpComing from './components/upComing'
import Login from './components/login'
import styled from "styled-components";
import InputCal from './components/inputCal'
import Spinner from './components/spinner'
import Landing from './landing/landing'


import { connect,useSelector } from 'react-redux'
import { SetUserInfo} from './redux/actions/action'
import firebaseConfig, {db,firebaseui,app,ui,uiConfig}  from './firebase.config'



function App(props) {
 console.log("document.cookie",document.cookie.split(";"))
  const userInfo = useSelector(state => state.userInfo);
  const [weather, setWeather] = useState(false);
  const [upComing, setUpComing] = useState(false);
const [backColor, setBackColor] = useState('white')
const openWeather = () => {
  setWeather(!weather)
  if(backColor === 'white'){
   setBackColor('rgba(76, 76, 76, 0.9)')
  }
  else{
  setBackColor('white')
  }
} 
const openUpcoming = () => {
  setUpComing(!upComing)
  if(backColor === 'white'){
    setBackColor('rgba(76, 76, 76, 0.9)')
  }
  else{
  setBackColor('white')
  }
} 


  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 })
    return isDesktop ? children : null
  }
  const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 803, maxWidth: 991 })
    return isTablet ? children : null
  }
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 802 })
    return isMobile ? children : null
  }



 const logOut = () =>{
   console.log("23232")
  props.SetUserInfo("");
  const auth = getAuth();
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
 }



  
  return (
    
    // <div className="App" style={{ backgroundColor:'#4A78E6', display:'flex',justifyContent: "center",fontFamily:'NotoSansKR-Bold',height:'1300px'}}>



    
  <div className="App" style={{fontFamily:'NotoSansKR-Bold',height:"100vh",overflow:"scroll"}}>
    {
   
      userInfo !== ''?
   
        
      <div style={{ backgroundColor:'#4A78E6', display:'flex',justifyContent: "center",height:'100vh',overflow:"scroll"}}>
           <Desktop>
        <div style={{width:'800px',paddingLeft:'10%'}}>
          <div style={{display:"flex",justifyContent:'space-between',width:'70vw'}}>
            <div style={{fontSize:'50px',color:'white',textAlign:'left'}}>ONE DAY SCHEDULE</div>
            <div onClick ={logOut}  style={{lineHeight:"102px", zIndex:"4",pointer:"cursor",fontSize:'22px',color:'white',textAlign:'left',cursor:"pointer"}}  >로그아웃</div>
          </div>
            <div style={{paddingRight:'50px'}}>
             <Wholecal backColor={backColor}/>
            </div>
          </div>
          <div style={{paddingRight:'10%',paddingTop:'72px' }}>
          
            <Weather/> 
            <AddScheduleContainer/>
            <UpComing/>
          </div>
         
    </Desktop>

    <Tablet>
    <div style={{width:'100%'}}>
       <Wholecal/>
       </div>
       <div style={{height:'700px'}}>
       {/* <Weather/>  */}
       </div>
      
    </Tablet>
    <Mobile>
      <div  style={{width:'100%'}} b>
        <div style={{display:'flex'}}>
          <div style={{fontSize:'30px',color:'white',textAlign:'left',paddingLeft:'30px'}} onClick={openWeather}>날씨</div>
          <div style={{fontSize:'30px',color:'white',textAlign:'left',paddingLeft:'30px'}}onClick={openUpcoming}>마감임박!</div>
        </div>
        <div>
       <Wholecal backColor = {backColor}/>
       </div>
       {
         weather? 
         <div  style={{position:'absolute' ,top:'20%', left:'10%',opacity:'1.0',width:'600px'}}>
           <div onClick={openWeather} style={{color:'white',textAlign:'right'}} >X</div>
           <div style={{}}>
           <Weather />
           </div>
         </div>
         : null
       }
        {
         upComing? 
         <div  style={{position:'absolute' ,top:'20%', left:'3%',opacity:'1.0',width:'600px'}}>
           <div onClick={openWeather} style={{color:'white',textAlign:'right'}} onClick={openUpcoming} >X</div>
           <div style={{}}>
           <UpComing />
           </div>
         </div>
         : null
       }
       </div>
   </Mobile>
      </div>

      
      : 
      <div>
      <Landing/>
      </div>
    }

 
    </div>
  );
}

const mapStateToProps = state =>{
  return{
    
      userInfo: state.userInfo
  }
} 
const mapDispatchToprops = (dispatch)=>{
  
return {
  SetUserInfo: (userInfo)=>  dispatch(SetUserInfo(userInfo))
}
}
export default connect(mapStateToProps,mapDispatchToprops)(App)
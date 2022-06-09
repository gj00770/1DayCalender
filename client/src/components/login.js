import React, { useEffect ,useState} from "react";
import firebaseConfig, {db,firebaseui,app,ui,uiConfig}  from '../firebase.config'
import firebase from 'firebase/compat/app'
import { collection, getDoc, getDocs, setDoc, doc,query,limit } from "firebase/firestore";
import { connect,useSelector } from 'react-redux';
import { SetUserInfo} from '../redux/actions/action'
import { signOut, getAuth, setPersistence, signInWithRedirect, signInWithPopup, onAuthStateChanged, GoogleAuthProvider,browserSessionPersistence ,getRedirectResult} from "firebase/auth"
import calBackGround from '../images/landing/wholecal.png'
import Spinner from './spinner'
// const docSnap  = await getDoc(d)
// console.log(userRef)

const auth = getAuth()//
window.sssss = () => {signOut(auth)
  // window.getRedirectResult
};
 function LogIn(props) {
  
 var authResult
 const [userId, setUserId] = useState('');
 const [loading, setLoading] = useState(true);
      const login= ()=>{
        console.log("signout");
        setLoading(false);
        // const provider = new GoogleAuthProvider();
        // signInWithPopup(auth, provider, function(res) {
        //   console.log("resres", res);
        // })
        // return
        
        setPersistence(auth, browserSessionPersistence)
          .then(() => {
        
        // In memory persistence will be applied to the signed in Google user
        // even though the persistence was set to 'none' and a page redirect
        // occurred.
        const provider = new GoogleAuthProvider();
          signInWithRedirect(auth, provider);
          console.log('redirect', getRedirectResult)
          getRedirectResult(auth, function(result) {
            // The firebase.User instance:
            // var user = result.user;
            // The Facebook firebase.auth.AuthCredential containing the Facebook
            // access token:
            var credential = result.credential;
            // As this API can be used for sign-in, linking and reauthentication,
            // check the operationType to determine what triggered this redirect
            // operation.
            var operationType = result.operationType;
            console.log('result',result)
            console.log()
            console.log()
          })
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
        });
      
      }
      firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
        // Send token to your backend via HTTPS
        // ...
      }).catch(function(error) {
        // Handle error
      });
      
      

    useEffect(()=>{
      
      onAuthStateChanged(auth, function(user) {
        setLoading(false);
        if (user) {
          
          // User is signed in. 
          console.log('user@@@@',user)
            console.log('userid',userId)
          console.log(' console.log(auth) console.log(auth)',user.uid)
            const uidRef = doc(db, 'user', `${user.uid}`);


            props.SetUserInfo(`${user.uid}`)
            getDoc(uidRef).then ((docSnap)=>{
              props.SetUserInfo(`${user.uid}`)
              console.log("jiosjid")
              if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
              } else {
                console.log("No such document!");
                setDoc(doc(db, "user", `${user.uid}`), {
                  email: user.email,
                });
              }
            setLoading(false);
            })
             
        } else { //럭
          console.log("signout");
          // const loginButton = document.querySelector("#login-button")

          // loginButton.style= "display:block"
        }
        setLoading(true);
      });
    
      //ui.start('#firebaseui-auth-container', uiConfig); 
    //  props.SetUserInfo(userId)
        }, [])
        

    return (
      
          <div style={{backgroundColor:'#4A78E6',display:'flex',flexDirection:'column',alignItems:'center',height:"100%",justifyContent:"center",backgroundImage:`linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ), url(${calBackGround})`,backgroundRepeat:"no-repeat",backgroundPosition:"center"}}>
            {loading == false?
            <Spinner/>
            : 
            <div style={{backgroundColor:"white",border:'1px solid black',display:'flex',flexDirection:'column',alignItems:'center',height:"60vw",width:"40vw",justifyContent:"center",borderRadius:"20px"}}>
              <img src={require('../images/cal.png').default}  style={{width:'10vw'}}/>
              <div style={{fontSize:'30px', color:'#4A78E6'}} >ONE DAY CALENDER</div>
              <div style={{fontSize:'30px',paddingTop:'60px'}}>ONE DAY CALENDER에 오신걸 환영합니다!</div>
              <div style={{width:'400px', height:'60px',border:'4px solid #4A78E6', borderRadius:'50px',marginTop:'60px',display:'flex'}}>
                <img style={{width:'40px',margin:'10px 10px 10px 10px',backgroundSize: "100vw 100%"}} src={require('../images/google.png').default} />
                <div style={{fontSize:'30px' ,padding:'8px 10px 10px 40px',cursor:"pointer"}}  onClick={login} >  Google로 로그인 </div>
            </div>
                   <div>
                  </div>
                 
          </div>
            }
          </div>
    );
  }

  const mapStateToProps = state =>{
    return{
        year : state.year,
        month : state.month,
        date: state.date,
        selectDate: state.selectDate,
        userInfo: state.userInfo
    }
} 
const mapDispatchToprops = (dispatch)=>{
    
  return {
    SetUserInfo: (userInfo)=>  dispatch(SetUserInfo(userInfo))
  }
}
  export default connect(mapStateToProps,mapDispatchToprops)(LogIn)
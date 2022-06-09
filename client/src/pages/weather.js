import React, {useState, useEffect} from 'react';
import { MdWbSunny,MdOutlineWbSunny,MdOutlineWbCloudy,MdWbCloudy } from "react-icons/md" //MdWbSunny 저녁 화창  MdOutlineWbSunny 낮 화창  MdOutlineWbCloudy 흐림
import { RiSunCloudyLine,RiMoonCloudyFill,RiMistFill,RiMistLine } from "react-icons/ri"; //조금흐림
import { BsClouds,BsCloudsFill,  BsCloudRainHeavy,BsCloudRainHeavyFill, BsCloudSnow,BsCloudSnowFill } from "react-icons/bs"; // 많이흐림
import { FaCloudSunRain,FaCloudMoonRain } from "react-icons/fa"; 
import { IoThunderstormOutline,IoThunderstormSharp } from "react-icons/io5"; 
const { kakao } = window;
const iconIndex = ['01d','01n','02d','02n','03d','03n','04d','04n','09d','09n','10d','10n','11d','11n','12d','12n','13d','13n','50d','50n']
const iconPaint = [MdOutlineWbSunny,MdWbSunny,  RiSunCloudyLine,RiMoonCloudyFill, MdOutlineWbCloudy,MdWbCloudy,  BsClouds,BsCloudsFill,   BsCloudRainHeavy,BsCloudRainHeavyFill, FaCloudSunRain,FaCloudMoonRain, IoThunderstormOutline,IoThunderstormSharp, BsCloudSnow,BsCloudSnowFill, RiMistFill,RiMistLine ]
function Weather(){
  const [location, setLocation] = useState(null);
  const [temp, setTemp] = useState();
  const [tempMax, setTempMax] = useState();
  const [tempMin, setTempMin] = useState();
  const [weather, setWeather] = useState();
  const [icon, setIcon] = useState();
    let lat  
    let lng  
    let x = <RiMoonCloudyFill/>
 
    
    
      const getAddr=()=>{
        navigator.geolocation.getCurrentPosition(function(pos) {
           lat = pos.coords.latitude;
           lng = pos.coords.longitude;
       //  alert("현재 위치는 : " + lat + ", "+ lng);
         let geocoder = new kakao.maps.services.Geocoder();
          let coord = new kakao.maps.LatLng(lat, lng);
          let callback = function(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                console.log(result[0]);
                setLocation(result[0].address.region_2depth_name)
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${'eeb34ec901d7f64f318d2ec7815dfbf4'}&units=metric`)
                .then(res => res.json())
                .then(data => {
                  console.log(data);
                  const temp = data.main.temp;
                  const weathers = data.weather[data.weather.length - 1];
                  const tempMax = data.main.temp_max
                  const tempMin = data.main.temp_min
                  const icons = data.weather[0].icon
                  console.log(tempMin)
                  setTemp(temp);
                  setTempMax(tempMax)
                  setTempMin(tempMin)
                  console.log(temp)
                  setWeather(weathers.main);
                 // setIcon(icons)
                  console.log(icons)
                  console.log(iconPaint[2])
                setIcon(icons)
                
                })
                
            }
            
          };
        
         geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
      })
 
    }
    useEffect(()=>{ 
      getAddr()
    },[])

      return(
        <div style={{backgroundColor:'white', border:'1px solid', borderRadius:'15px',marginTop:'20px', boxShadow:'10px 10px 10px ',width:"700px"}} >
          <div style={{display:'flex',padding:'40px 0px 0px 40px'}}>
              <div >
                {icon && icon=== '01d'? 
                  <MdOutlineWbSunny size='100'/>
                :
                icon && icon=== '01n'? 
                <MdWbSunny size='100'/>
                :
                icon && icon=== '02d'? 
                  <RiSunCloudyLine size='100'/>
                :
                icon && icon=== '02n'? 
                  <RiMoonCloudyFill size='100'/>
                :
                icon && icon=== '03d'? 
                  <MdOutlineWbCloudy size='100'/>
                :
                icon && icon=== '03n'? 
                  <MdWbCloudy size='100'/>
                :
                icon && icon=== '04d'? 
                  <BsClouds size='100'/>
                :
                icon && icon=== '04n'? 
                  <BsCloudsFill size='100'/>
                :
                icon && icon=== '09d'? 
                  <BsCloudRainHeavy size='100'/>
                :
                icon && icon=== '09n'? 
                  <BsCloudRainHeavyFill size='100'/>
                :
                icon && icon=== '10d'? 
                  <FaCloudSunRain size='100'/>
                :
                icon && icon=== '10n'? 
                  <FaCloudMoonRain size='100'/>
                :
                icon && icon=== '11d'? 
                  <IoThunderstormOutline size='100'/>
                :
                icon && icon=== '11n'? 
                  <IoThunderstormSharp size='100'/>
                :
                icon && icon=== '13d'? 
                  <BsCloudSnow size='100'/>
                :
                icon && icon=== '13n'? 
                  <BsCloudSnowFill size='100'/>
                :
                icon && icon=== '50d'? 
                  <RiMistFill size='100'/>
                :
                icon && icon=== '50n'? 
                  <RiMistLine size='100'/>
                : null
                }
                </div> 
                <div style={{fontSize:'40px',paddingLeft:'90px'}}>
                {location}
                </div>
           </div>
           <div style={{display:'flex',padding:'0px 0px 0px 40px'}}>
                <div style={{fontSize:'40px'}}>
                  {weather}
                </div>
                <div style={{fontSize:'40px',paddingLeft:'90px',color:'#4A78E6'}}>
                {temp}
               </div>
               <div style={{fontSize:'20px',paddingLeft:'80px',paddingBottom:'30px'}}>
                  최고:{tempMax}| 최저:{tempMin}
               </div>
           </div>
                
           
        </div>
      )
     
}

// <div style={{height:'40px'}}>
// {icon && icon=== '01d'? 
//  <MdOutlineWbSunny/>
// :
// icon && icon=== '01n'? 
// <MdWbSunny/>
// :
// icon && icon=== '02d'? 
//  <RiSunCloudyLine/>
// :
// icon && icon=== '02n'? 
//  <RiMoonCloudyFill/>
// :
// icon && icon=== '03d'? 
//  <MdOutlineWbCloudy/>
// :
// icon && icon=== '03n'? 
//  <MdWbCloudy/>
// :
// icon && icon=== '04d'? 
//  <BsClouds/>
// :
// icon && icon=== '04n'? 
//  <BsCloudsFill/>
// :
// icon && icon=== '09d'? 
//  <BsCloudRainHeavy/>
// :
// icon && icon=== '09n'? 
//  <BsCloudRainHeavyFill/>
// :
// icon && icon=== '10d'? 
//  <FaCloudSunRain/>
// :
// icon && icon=== '10n'? 
//  <FaCloudMoonRain/>
// :
// icon && icon=== '11d'? 
//  <IoThunderstormOutline/>
// :
// icon && icon=== '11n'? 
//  <IoThunderstormSharp/>
// :
// icon && icon=== '13d'? 
//  <BsCloudSnow/>
// :
// icon && icon=== '13n'? 
//  <BsCloudSnowFill/>
// :
// icon && icon=== '50d'? 
//  <RiMistFill/>
// :
// icon && icon=== '50n'? 
//  <RiMistLine/>
// : null
// }
// </div> 
export default React.memo(Weather);
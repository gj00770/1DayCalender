import React, {useState, useEffect} from 'react';
function Weather(props){
    let lat  = 37.4996992;
    let lon  = 126.8580352; 
    var apiURI =  `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${APIkey} `;
    var apiURI2 =  `http://api.openweathermap.org/geo/1.0/reverse?lat=51.5098&lon=-0.1180&limit=5&appid=${APIkey} `;
    const getLocation=()=> {
        if (navigator.geolocation) { // GPS를 지원하면
          navigator.geolocation.getCurrentPosition(function(position) {
              
            //  lat = 37.4996992
            //  lon = 126.8580352
            alert(position.coords.latitude + ' ' + position.coords.longitude);
            console.log(apiURI)
            console.log(apiURI2)
          }, function(error) {
            console.error(error);
          }, {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: Infinity
          });
        } else {
          alert('GPS를 지원하지 않습니다');
        }
      }
      return(
        <div onClick={getLocation}>
            안녕1212333333334343434343323233333333
        </div>
      )
     
}


export default Weather
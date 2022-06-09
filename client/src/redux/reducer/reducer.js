import { ShortCut } from '../actions/action';
import {APPLY_MONTH_YEAR,NEXT_MONTH,PREV_MONTH,SELECT_DATE,RESET_SELECT_DATE,SET_USERINFO, SET_CHECKLIST, SET_SCHEDULE,UP_COMING,SHORT_CUT, SHORT_CUT_POINTER,NEXT_WEEK,PREV_WEEK,SET_INPUT_SCHEDULE_START,SET_INPUT_SCHEDULE_END, LOADING,CHECKLIST_START ,EDIT_INPUT_SCHEDULE_START, EDIT_INPUT_SCHEDULE_END } from '../types/types'

let monthList = ['January','February','March','April','May','June','July','Agust','September','October','November','December']
let now = new Date();
let year = now.getFullYear();
let todayMonth = monthList[now.getMonth()]
let todayDate = `${now.getDate()}`;
let hours = now.getHours();
let minutes = now.getMinutes();
let noon;
let hourString;
let hourStringNoon
let inputMonthDisplayStart
let inputMonthDisplayEnd
let inputHourDisplayEnd
let inputHourDisplayStart
let inputDateDisplayEnd
let inputDateDisplayStart
let checkMonthDisplay
let checkDateDisplay

let editDateDisplayEnd
let editDateDisplayStart
let editMonthDisplayStart
let editMonthDisplayEnd
let editHourDisplayEnd
let editHourDisplayStart


if(now.getDate() <10 ){
    inputDateDisplayEnd = `0${now.getDate()}`
    inputDateDisplayStart =  `0${now.getDate()}`
    checkDateDisplay= `0${now.getDate()}`
    editDateDisplayEnd=`0${now.getDate()}`
    editDateDisplayStart=`0${now.getDate()}`
}
else{
    inputDateDisplayEnd = `${now.getDate()}`
    inputDateDisplayStart =  `${now.getDate()}`
    checkDateDisplay= `${now.getDate()}`
    editDateDisplayEnd=`${now.getDate()}`
    editDateDisplayStart=`${now.getDate()}`
}

if(new Date().getHours()>=12){ //1314151617
    noon = 'afternoon'
    if(new Date().getHours()-12 >=10 ){ //23 11 -> 22시면    22 23 24
        hourString = `${new Date().getHours()}`      //  10 11 12
        hourStringNoon = `${new Date().getHours()-12}`  
    }
    else{
        hourString = `${new Date().getHours()}`  
        hourStringNoon = `0${new Date().getHours()-12}`  
    }
}
else {
    console.log('heeeeereeee')
    hourString = `0${hours}`
    noon= 'noon' //1~12
    if(hours >=10 ){ //
        hourString = `${hours}`
        hourStringNoon = `${new Date().getHours()-12}` 
    }
    else{
        hourString = `0${hours}`
        hourStringNoon = `0${new Date().getHours()-12}` 
    }
}

    if(new Date().getMinutes() <10 ){
        minutes = `0${minutes}`
    }
    else{
        minutes = `${now.getMinutes()}`
    }

if(new Date().getMonth()<10){
    inputMonthDisplayStart = `0${new Date().getMonth()+1}`
    inputMonthDisplayEnd = `0${new Date().getMonth()+1}`
    checkMonthDisplay=`0${new Date().getMonth()+1}`
    editMonthDisplayStart=`0${new Date().getMonth()+1}`
    editMonthDisplayEnd=`0${new Date().getMonth()+1}`
}
else {
    console.log('heeeeereeee')
    inputMonthDisplayStart =`${new Date().getMonth()+1}`
    inputMonthDisplayEnd = `${new Date().getMonth()+1}`
    checkMonthDisplay=`0${new Date().getMonth()+1}`
    editMonthDisplayStart =`0${new Date().getMonth()+1}`
    editMonthDisplayEnd =`0${new Date().getMonth()+1}`
}




const initialState = {
    year: year,
    month:todayMonth,
    date:todayDate,
    selectDate:todayDate,
    userInfo: '',
    checkList: [],
    scheduleList: [],
    upComingList: [],
    monthNumber: now.getMonth()+1,
    shortCut: false,
    
    shortCutPointer:0,
    scheduleMonth:0,
    schedulYear:0,




    inputYearStart:new Date().getFullYear(),
    inputMonthStart:monthList[new Date().getMonth()],
    inputDateStart:todayDate,
    inputHourStart:hourStringNoon,
    inputMinuteStart:`${minutes}`,
    inputNoonStart: noon,
    inputWholeDateStart:'',
    inputMonthDisplayStart:inputMonthDisplayStart,
    inputHourDisplayStart:`${hourString}`,
    inputDateDisplayStart:inputDateDisplayStart,
    inputWholeDateStart:`${new Date().getFullYear()}${inputMonthDisplayStart}${inputDateDisplayStart}${hourString}${minutes}`,




    inputYearEnd:new Date().getFullYear(),
    inputMonthEnd:monthList[new Date().getMonth()],
    inputDateEnd:todayDate,
    inputDateDisplayEnd: inputDateDisplayEnd, //sdsd
    inputHourEnd:hourStringNoon,        
    inputHourDisplayEnd:`${hourString}`, //sdsd
    inputMonthDisplayEnd:inputMonthDisplayEnd, //sdsd
    inputMinuteEnd:`${minutes}`,
    inputNoonEnd: noon,
    inputWholeDateEnd:`${new Date().getFullYear()}${inputMonthDisplayEnd}${inputDateDisplayEnd}${hourString}${minutes}`,
  
    

    editYearStart:new Date().getFullYear(),
    editMonthStart:monthList[new Date().getMonth()],
    editDateStart:todayDate,
    editHourStart:hourString,
    editMinuteStart:`${minutes}`,
    editNoonStart: noon,
    editWholeDateStart:'',
    editMonthDisplayStart:editMonthDisplayStart,
    editHourDisplayStart:`${hourString}`,
    editDateDisplayStart:editDateDisplayStart,
    editWholeDateStart:`${new Date().getFullYear()}${editMonthDisplayStart}${editDateDisplayStart}${hourString}${minutes}`,



    editYearEnd:new Date().getFullYear(),
    editMonthEnd:monthList[new Date().getMonth()],
    editDateEnd:todayDate,
    editDateDisplayEnd: editDateDisplayEnd, //sdsd
    editHourEnd:hourString,        
    editHourDisplayEnd:`${hourString}`, //sdsd
    editMonthDisplayEnd:editMonthDisplayEnd, //sdsd
    editMinuteEnd:`${minutes}`,
    editNoonEnd: noon,
    editWholeDateEnd:`${new Date().getFullYear()}${editMonthDisplayEnd}${editDateDisplayEnd}${hourString}${minutes}`,



    
    loadingSchedule:false,
    loadingCheckList:false,
    loadingUpcoming:false,

    checkListYear: new Date().getFullYear(),
    checkListMonth: monthList[new Date().getMonth()],
    checkDate: todayDate,
    checkMonthDisplay:checkMonthDisplay,
    checkDateDisplay:checkDateDisplay,




}

const yearReducer = (state=initialState, action)=>{
    switch(action.type){
        case APPLY_MONTH_YEAR:
            console.log('hi')
            console.log(state)
            console.log(action)
            return {
                ...state,
                year: action.year,
                month:action.month
            }

        case NEXT_MONTH:
            console.log('hi')
            console.log(state)
            console.log(action)
            if(action.month === 'December'|| action.month === 12){
                action.month = 'January'
           //     action.monthNumber = 1
                action.year = action.year+1
                console.log(action.month)
            }
            else {
                console.log(action)
              console.log( monthList.indexOf(action.month)) 
              action.month = monthList[monthList.indexOf(action.month)+1]
           //   state.monthNumber = monthNumber+1
              console.log(action.month)
            }
            return{
                ...state,
                year: action.year,
                month:action.month,
                selectDate: 0,
                monthNumber:monthList.indexOf(action.month)+1
            }

        case PREV_MONTH:
            if(action.month === 'January'){
                action.month = 'December'
                action.year = action.year-1
                console.log('년도',action.year)
            }
            else {
                action.month = monthList[monthList.indexOf(action.month)-1]
            }
            return{
                ...state,
                year: action.year,
                month:action.month,
                selectDate:0,
                monthNumber:monthList.indexOf(action.month)+1
               // selectDate: 30,
                }


        case SELECT_DATE:
            //action.selectDate=selectDate
            console.log( action.selectDate)
            return{
                ...state,
                selectDate: action.selectDate,
                date:0
                }



        case RESET_SELECT_DATE:
            //action.selectDate=selectDate
            console.log( 'resetttt')
            return{
                ...state,
                selectDate: 0,
                date:0
                }        


        case SET_USERINFO:
            console.log(action.userInfo)
            return {
                ...state,
                userInfo: action.userInfo,
            }
       
       
         case SET_CHECKLIST:
            console.log(action.userInfo)
            console.log(state)
            return {
                ...state,
                checkList:action.checkListInfo,
            }   
        case SET_SCHEDULE:
            console.log(action.userInfo)
            console.log(state)
            return {
                ...state,
                scheduleList:action.scheduleInfo,
            }  
        case UP_COMING:
            console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%',action.upComingInfo)
            console.log(state)
            return {
                ...state,
                upComingList:action.upComingInfo,
            }   


        case SHORT_CUT:
            console.log(action.shortCut)
            console.log(state)
            return {
                ...state,
                shortCut:!state.shortCut,
            }           
        case SHORT_CUT_POINTER:
            return {
               ...state,
                shortCutPointer:action.shortCutPointer
            
            }      
        case NEXT_WEEK:
            if(action.shortCutPointer === 6){
                action.shortCutPointer = 1
                if(action.month === 'December'|| action.month === 12){
                    action.month = 'January'
               //     action.monthNumber = 1
                    action.year = action.year+1
                    console.log(action.month)
                }
                else {
                    console.log(action)
                  console.log( monthList.indexOf(action.month)) 
                  action.month = monthList[monthList.indexOf(action.month)+1]
               //   state.monthNumber = monthNumber+1
                  console.log(action.month)
                }
            }
            else{
                action.shortCutPointer=action.shortCutPointer+1
            }
            return {
                ...state,
                year: action.year,
                month:action.month,
                selectDate: 0,
                monthNumber:monthList.indexOf(action.month)+1,
                shortCutPointer:action.shortCutPointer
            
            }

            





        case PREV_WEEK:
            if(action.shortCutPointer === 1){
                action.shortCutPointer = 6
                if(action.month === 'January'){
                    action.month = 'December'
                    action.year = action.year-1
                    console.log('년도',action.year)
                }
                else {
                    action.month = monthList[monthList.indexOf(action.month)-1]
                }
            }
            else{
                action.shortCutPointer=action.shortCutPointer-1
            }
            return {
                ...state,
                year: action.year,
                month:action.month,
                selectDate: 0,
                monthNumber:monthList.indexOf(action.month)+1,
                shortCutPointer:action.shortCutPointer
            
            }


            case SET_INPUT_SCHEDULE_START:
                console.log(action.inputDateStart)

                if(monthList.indexOf(action.inputMonthStart)+1 <10){
                    inputMonthDisplayStart = `0${monthList.indexOf(action.inputMonthStart)+1}`
                }
                else if(monthList.indexOf(action.inputMonthStart)+1 >=10){
                    inputMonthDisplayStart = `${monthList.indexOf(action.inputMonthStart)+1}`
                }


                if(Number(action.inputDateStart)<10){
                    inputDateDisplayStart = `0${action.inputDateStart}`
                }

                else{
                    inputDateDisplayStart = `${action.inputDateStart}`
                }

                if(action.inputNoonStart === 'noon'){
                    console.log('29829292929292992239923829389238928329')
                    if(Number(action.inputHourStart) === 12){
                        inputHourDisplayStart = "00"
                        
                    }
                    else{
                        if(Number(action.inputHourStart)<10){
                         inputHourDisplayStart = '0'+Number(action.inputHourStart)
                        }
                        else{
                            inputHourDisplayStart=  Number(action.inputHourStart)
                        }
                    }
                }
                else if(action.inputNoonStart === 'afternoon'){
                    console.log('29829292929292992239923829389238928329',Number(action.inputHourStart))
                    if(Number(action.inputHourStart) === 12){
                         inputHourDisplayStart = '12'
                    }
                    else{
                        
                        inputHourDisplayStart = Number(action.inputHourStart)+12
                        console.log('797979797979797979977997',inputHourDisplayStart)
                        }

                }

                return {
                    ...state,
                    inputYearStart:action.inputYearStart,
                    inputMonthStart:action.inputMonthStart,
                    inputDateStart:action.inputDateStart,
                    inputHourStart:action.inputHourStart,
                    inputMinuteStart:action.inputMinuteStart,
                    inputNoonStart:action.inputNoonStart,

                    inputHourDisplayStart:inputHourDisplayStart,
                    inputDateDisplayStart:inputDateDisplayStart,
                    inputMonthDisplayStart:inputMonthDisplayStart,
                    inputWholeDateStart:`${action.inputYearStart}${inputMonthDisplayStart}${inputDateDisplayStart}${inputHourDisplayStart}${action.inputMinuteStart}`
                }
            
                
                
            case SET_INPUT_SCHEDULE_END:
                console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@',action.inputNoonEnd)
                if(monthList.indexOf(action.inputMonthEnd)+1 <10){
                    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@',action.inputNoonEnd)
                    inputMonthDisplayEnd = `0${monthList.indexOf(action.inputMonthEnd)+1}`
                }
                else if(monthList.indexOf(action.inputMonthEnd)+1 >=10){
                    inputMonthDisplayEnd = `${monthList.indexOf(action.inputMonthEnd)+1}`
                }

                if(action.inputNoonEnd === 'noon'){
                    if(Number(action.inputHourEnd) === 12){
                        inputHourDisplayEnd = "00"
                        
                    }
                    else{
                        if(Number(action.inputHourEnd)<10){
                    console.log('29829292929292992239923829389238928329')

                         inputHourDisplayEnd = '0'+Number(action.inputHourEnd)
                        }
                        else{
                            inputHourDisplayEnd=  Number(action.inputHourEnd)
                        }
                    }
                }
                else if(action.inputNoonEnd === 'afternoon'){
                    console.log('29829292929292992239923829389238928329',Number(action.inputHourEnd))
                    if(Number(action.inputHourEnd) === 12){
                         inputHourDisplayEnd = '12'
                    }
                    else{
                        
                        inputHourDisplayEnd = Number(action.inputHourEnd)+12
                        console.log('797979797979797979977997',inputHourDisplayEnd)
                        }
                }

                
                if(Number(action.inputDateEnd)<10){
                    inputDateDisplayEnd = `0${action.inputDateEnd}`
                }
                else{
                    inputDateDisplayEnd = `${action.inputDateEnd}`
                }
                

                return {
                    ...state,
                    inputYearEnd:action.inputYearEnd,
                    inputMonthEnd:action.inputMonthEnd,
                    inputDateEnd:action.inputDateEnd,
                    inputHourEnd:action.inputHourEnd,
                    inputMinuteEnd:action.inputMinuteEnd,
                    inputNoonEnd:action.inputNoonEnd,
                    inputHourDisplayEnd:inputHourDisplayEnd,
                    inputDateDisplayEnd:inputDateDisplayEnd,
                    inputMonthDisplayEnd:inputMonthDisplayEnd,
                    inputWholeDateEnd:`${action.inputYearEnd}${inputMonthDisplayEnd}${inputDateDisplayEnd}${inputHourDisplayEnd}${action.inputMinuteEnd}`
                
                    
                }

            case LOADING:
                
                return {
                    ...state,
                    loadingSchedule:action.loadingSchedule,
                    loadingCheckList:action.loadingCheckList,
                    loadingUpcoming:action.loadingUpcoming,
                
                }


            case CHECKLIST_START:

                if(monthList.indexOf(action.checkListMonth)+1 <10){

                    checkMonthDisplay = `0${monthList.indexOf(action.checkListMonth)+1}`
                }
                else if(monthList.indexOf(action.checkListMonth)+1 >=10){
                    checkMonthDisplay = `${monthList.indexOf(action.checkListMonth)+1}`
                }

                if(Number(action.checkDate)<10){
                    console.log("@@@@@@@@@")
                    checkDateDisplay = `0${action.checkDate}`
                }
                else{
                    console.log("@@@@@@@@@")
                    checkDateDisplay = `${action.checkDate}`
                }


                return {
                    ...state,
                    checkListYear:action.checkListYear,
                    checkListMonth:action.checkListMonth,
                    checkDate:action.checkDate,
                    checkMonthDisplay:checkMonthDisplay,
                    checkDateDisplay:checkDateDisplay,
                }




        case EDIT_INPUT_SCHEDULE_START:
            console.log(action.editDateStart)

            if(monthList.indexOf(action.editMonthStart)+1 <10){
                editMonthDisplayStart = `0${monthList.indexOf(action.editMonthStart)+1}`
            }
            else if(monthList.indexOf(action.editMonthStart)+1 >=10){
                editMonthDisplayStart = `${monthList.indexOf(action.editMonthStart)+1}`
            }


            if(Number(action.editDateStart)<10){
                editDateDisplayStart = `0${action.editDateStart}`
            }

            else{
                editDateDisplayStart = `${action.editDateStart}`
            }

            if(action.editNoonStart === 'noon'){
                console.log('29829292929292992239923829389238928329')
                if(Number(action.editHourStart) === 12){
                    editHourDisplayStart = "00"
                    
                }
                else{
                    if(Number(action.editHourStart)<10){
                    editHourDisplayStart = '0'+Number(action.editHourStart)
                    }
                    else{
                        editHourDisplayStart=  Number(action.editHourStart)
                    }
                }
            }
            else if(action.editNoonStart === 'afternoon'){
                console.log('29829292929292992239923829389238928329',Number(action.editHourStart))
                if(Number(action.editHourStart) === 12){
                    editHourDisplayStart = '12'
                }
                else{
                    
                    editHourDisplayStart = Number(action.editHourStart)+12
                    console.log('797979797979797979977997',editHourDisplayStart)
                    }

            }

            return {
                ...state,
                editYearStart:action.editYearStart,
                editMonthStart:action.editMonthStart,
                editDateStart:action.editDateStart,
                editHourStart:action.editHourStart,
                editMinuteStart:action.editMinuteStart,
                editNoonStart:action.editNoonStart,

                editHourDisplayStart:editHourDisplayStart,
                editDateDisplayStart:editDateDisplayStart,
                editMonthDisplayStart:editMonthDisplayStart,
                editWholeDateStart:`${action.editYearStart}${editMonthDisplayStart}${editDateDisplayStart}${editHourDisplayStart}${action.editMinuteStart}`
            }
                


        default: return state
            
    }
    
}


export default yearReducer
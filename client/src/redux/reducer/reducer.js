import {APPLY_MONTH_YEAR,NEXT_MONTH,PREV_MONTH,SELECT_DATE,RESET_SELECT_DATE} from '../types/types'

let monthList = ['January','February','March','April','May','June','July','Agust','September','October','November','December']
let now = new Date();
let year = now.getFullYear();
let todayMonth = monthList[now.getMonth()]
let todayDate = now.getDate();


const initialState = {
    year: year,
    month:todayMonth,
    date:todayDate,
    selectDate:todayDate
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
            if(action.month === 'December'){
                action.month = 'January'
                action.year = action.year+1
                console.log(action.month)
            }
            else {
                console.log(action)
              console.log( monthList.indexOf(action.month)) 
              action.month = monthList[monthList.indexOf(action.month)+1]
              console.log(action.month)
            }
            return{
                ...state,
                year: action.year,
                month:action.month,
                selectDate: 0
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
                selectDate:0
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

        default: return state
            
    }
}




export default yearReducer
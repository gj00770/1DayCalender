import {APPLY_MONTH_YEAR,NEXT_MONTH, PREV_MONTH, SELECT_DATE,RESET_SELECT_DATE, SET_USERINFO, SET_CHECKLIST, SET_SCHEDULE, UP_COMING, SHORT_CUT, SHORT_CUT_POINTER,NEXT_WEEK,PREV_WEEK,SET_INPUT_SCHEDULE_START,SET_INPUT_SCHEDULE_END,LOADING,CHECKLIST_START, EDIT_INPUT_SCHEDULE_START, EDIT_INPUT_SCHEDULE_END  } from '../types/types'

export const ApplyMonthYear = (month,year) => {
  console.log(month)
  return {
      type : APPLY_MONTH_YEAR,
      month: month,
      year : year
  }
}
export const PlusMonth = (month,year) => {
  console.log('hi')
  return {
      type : NEXT_MONTH,
      month: month,
      year : year
  }
}

export const MinusMonth = (month,year) => {
  console.log('hi')
  return {
      type : PREV_MONTH,
      month: month,
      year : year
  }
}
  export const SelectGreyDate = (selectDate) => {
    console.log('hi')
    console.log(selectDate)
    return {
        type : SELECT_DATE,
        selectDate: selectDate,
        
    }
  }
  export const ResetSelectDate = (selectDate) => {
    console.log(selectDate)
    return {
        type : RESET_SELECT_DATE,
       
        
    }
  }

  export const SetUserInfo = (userInfo) => {
    return {
        type : SET_USERINFO,
        userInfo: userInfo
        
    }
  }


  export const SetChecklist = (checkListInfo) => {
    return {
        type : SET_CHECKLIST,
        checkListInfo: checkListInfo
        
    }
  }
    export const SetSchedule = (scheduleInfo) => {
      return {
          type : SET_SCHEDULE,
          scheduleInfo: scheduleInfo
          
      }
  }
  export const SetUpcoming = (upComingInfo) => {
    console.log('hi')
    console.log(upComingInfo)
    return {
        type : UP_COMING,
        upComingInfo: upComingInfo,
        
    }
   
}
export const ShortCut = (shortCut,) => {
  return {
      type : SHORT_CUT,
      shortCut:!shortCut,
      
  }
}
export const ShortCutPointer = (shortCutPointer) => {
  return {
      type : SHORT_CUT_POINTER,
      shortCutPointer:shortCutPointer
      
  }
  
}

export const NextWeek = (month,year,shortCutPointer) => {
  console.log(12312312321)
  console.log(month)
  console.log(year)
  console.log(12312312321)
  return {
      type :NEXT_WEEK,
      month: month,
      year : year,
      shortCutPointer:shortCutPointer
      
  }
  
}
export const PrevWeek = (month,year,shortCutPointer) => {
  return {
      type : PREV_WEEK,
      month: month,
      year : year,
      shortCutPointer:shortCutPointer
      
  }
  
}
export const SetInputScheduleSTart = (inputYearStart,inputMonthStart,inputDateStart,inputHourStart,inputMinuteStart,inputNoonStart) => {
  console.log(inputDateStart)
  return {
      type : SET_INPUT_SCHEDULE_START,
      inputYearStart: inputYearStart,
      inputMonthStart:inputMonthStart,
      inputDateStart:inputDateStart,
      inputHourStart:inputHourStart,
      inputMinuteStart:inputMinuteStart,
      inputNoonStart:inputNoonStart,
      
  }

  
}

export const SetInputScheduleEnd = (inputYearEnd,inputMonthEnd,inputDateEnd,inputHourEnd,inputMinuteEnd,inputNoonEnd) => {
  return {
      type : SET_INPUT_SCHEDULE_END ,
      inputYearEnd: inputYearEnd,
      inputMonthEnd:inputMonthEnd,
      inputDateEnd:inputDateEnd,
      inputHourEnd:inputHourEnd,
      inputMinuteEnd:inputMinuteEnd,
      inputNoonEnd:inputNoonEnd,
      
  }
  
  
}

export const EditScheduleStart = (editYearStart,editMonthStart,editDateStart,editHourStart,editMinuteStart,editNoonStart) => {
  return {
      type : EDIT_INPUT_SCHEDULE_START, 
      editYearStart: editYearStart,
      editMonthStart:editMonthStart,
      editDateStart:editDateStart,
      editHourStart:editHourStart,
      editMinuteStart:editMinuteStart,
      editNoonStart:editNoonStart,
      
  }

  
}

export const EditeditScheduleEnd = (editYearEnd,editMonthEnd,editDateEnd,editHourEnd,editMinuteEnd,editNoonEnd) => {
  return {
      type : EDIT_INPUT_SCHEDULE_END,
      editYearEnd: editYearEnd,
      editMonthEnd:editMonthEnd,
      editDateEnd:editDateEnd,
      editHourEnd:editHourEnd,
      editMinuteEnd:editMinuteEnd,
      editNoonEnd:editNoonEnd,
      
  }
  
  
}


export const Loading = (loadingSchedule,loadingCheckList,loadingUpcoming) => {
  return {
      type : LOADING ,
      loadingSchedule: loadingSchedule,
      loadingCheckList: loadingCheckList,
      loadingUpcoming: loadingUpcoming,
      
  }
  
  
}



export const CheckListStart = (checkListYear,checkListMonth,checkDate) => {
  return {
      type : CHECKLIST_START ,
      checkListYear: checkListYear,
      checkListMonth: checkListMonth,
      checkDate: checkDate,
      
  }
  
  
}
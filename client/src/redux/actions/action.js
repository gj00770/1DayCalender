import {APPLY_MONTH_YEAR,NEXT_MONTH, PREV_MONTH, SELECT_DATE,RESET_SELECT_DATE} from '../types/types'

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
    console.log('hi')
    console.log(selectDate)
    return {
        type : RESET_SELECT_DATE,
       
        
    }
  }
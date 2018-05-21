import React from 'react'
import styled from 'styled-components'
import InfiniteCalendar from 'react-infinite-calendar'
import 'react-infinite-calendar/styles.css';
import moment from 'moment'

const today = new Date()
const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
console.log(today, lastWeek)

export default function Calendar(props) {
  console.log(props)
  return (
  <Wrapper>
    <InfiniteCalendar
      width={350}
      height={350}
      selected={today}
      minDate={lastWeek}
      onSelect={ (date)=> {props.dispatchIsOpenCalendar(false)} }
    />
  </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
`
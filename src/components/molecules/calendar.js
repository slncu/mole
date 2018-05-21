import React from 'react'
import styled from 'styled-components'
import InfiniteCalendar from 'react-infinite-calendar'
import 'react-infinite-calendar/styles.css';
import moment from 'moment'

const today = new Date()
const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
console.log(today, lastWeek)

export default function Calendar(props) {
  function onSelectDate(date) {
    console.log(props)
    props.dispatchIsOpenCalendar(false)
    props.dispatchSetDeadEnd(date, props.typeOfDate)
  }

  return (
  <Wrapper>
    <InfiniteCalendar
      width={350}
      height={350}
      selected={today}
      minDate={lastWeek}
      onSelect={ (date)=> { onSelectDate(date) } }
    />
  </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
`
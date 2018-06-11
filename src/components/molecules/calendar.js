// @flow
import React from 'react'
import styled from 'styled-components'
import InfiniteCalendar from 'react-infinite-calendar'
import 'react-infinite-calendar/styles.css'
import ClickOutside from 'react-click-outside'
import type { Item } from '../../redux/modules/tasks'
import Const from '../../const'
const { Color } = Const

const today = new Date()
const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)

type Props = {
  typeOfDate: string,
  editItem: Item,
  dispatchIsOpenCalendar: (isOpen: boolean) => void,
  dispatchSetDeadEnd: (date: string, type:string) => void
}

export default function Calendar (props: Props) {
  function onSelectDate (date) {
    props.dispatchIsOpenCalendar(false)
    props.dispatchSetDeadEnd(date, props.typeOfDate)
  }

  function onClose () {
    props.dispatchIsOpenCalendar(false)
  }

  return (
    <Wrapper>
      <ClickOutside onClickOutside={() => { onClose() }}>
        <InfiniteCalendar
          width={300}
          height={200}
          selected={
            props.typeOfDate === 'start'
              ? props.editItem.startTime || today
              : props.editItem.endTime || today
          }
          minDate={lastWeek}
          onSelect={(date) => { onSelectDate(date) }}
          theme={{
            accentColor: `${Color.LIGHT_GREEN}`,
            floatingNav: {
              background: 'rgba(56, 87, 138, 0.94)',
              chevron: '#FFA726',
              color: '#FFF'
            },
            headerColor: `${Color.THICK_GREEN}`,
            selectionColor: `${Color.LIGHT_GREEN}`,
            textColor: {
              active: '#FFF',
              default: '#333'
            },
            todayColor: `${Color.LIGHT_GREEN}`,
            weekdayColor: `${Color.LIGHT_GREEN}`
          }}
        />
      </ClickOutside>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  top: -45%;
  left: 0;
  padding: 20px;
`

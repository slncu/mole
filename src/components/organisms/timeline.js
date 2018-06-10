// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import styled from 'styled-components'
import type { Tasks } from '../../redux/modules/tasks'
import type { Ui } from '../../redux/modules/ui'
import { momentDiffFormatter } from '../../utils/dateManipulator'
import Const from '../../const'
const { Color } = Const

type Props = {
  tasks: Tasks,
  ui: Ui
}

class Timeline extends Component<Props>{
  today: any // ちゃんとした型に変える

  constructor() {
    super()
    this.today = moment()
  }

  // minDate() {
  //   const { lists } = this.props.tasks
  //   const min = lists.map(list => {
  //     return list.items.map(item => {
  //       return this.calculateTermOfTasks(item.startTime, item.endTime).startToNow
  //     })
  //   })
  //   return _.min(min[0])
  // }

  // maxDate() {
  //   const { lists } = this.props.tasks
  //   const min = lists.map(list => {
  //     return list.items.map(item => {
  //       return this.calculateTermOfTasks(item.startTime, item.endTime).nowToEnd
  //     })
  //   })
  //   return _.max(min[0])
  // }

  timelineBlock(item) {
    const items = [];

    [this.calculateTermOfTasks(item.startTime, item.endTime).nowToEnd].forEach(e => {
      for (let i = 0; i <= e; i++) {
        items.push(<TimelineBlock key={`${item.id}${i}`}/>)
      }
    })
    return items
  }

  calculateTermOfTasks(startTime: string, endTime: string) {
    const startToNow = moment(momentDiffFormatter(this.today)).diff(moment(momentDiffFormatter(moment(startTime))), 'days')
    const nowToEnd = moment(momentDiffFormatter(moment(endTime))).diff(moment(momentDiffFormatter(this.today)), 'days')

    return { startToNow, nowToEnd }
  }

  render() {
    const { lists } = this.props.tasks

    return (
      <Wrapper>
        <Overlay />
        <TimelineWrapper>
          <ListTime>
            {this.today.format('YYYY/MM/DD')}
            {/* {this.timelineBlock()} */}
          </ListTime>
          <ListLabel>
            {lists.map(list =>{ 
              return(
              <List key={list.id}>
                <Label>{list.name}</Label>
                <CardList>
                  {list.items.map(item => (
                    <li key={item.id}>
                      {item.content}
                      {this.timelineBlock(item)}
                    </li>
                  ))}
                </CardList>
              </List>
            )})}
          </ListLabel>
        </TimelineWrapper>
      </Wrapper>
    )
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks,
    ui: state.ui
  }
}

export default connect(mapStateToProps)(Timeline)

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: ${Color.BLACK_ALPHA60};
`

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 33.3%;
  bottom: 0;
  left: 0;
`

const TimelineWrapper = styled.div`
  display: block;
  width: 100%;
  background: ${Color.THICK_WHITE};
  z-index: 1;
  overflow-y: scroll;
`

const ListLabel = styled.div`
  display: flex;
  flex-direction: column;
`

const List = styled.div`
  display: block;
`

const Label = styled.div`
  display: block;
  width: 100px;

`

const CardList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  white-space: no-wrap;

  > li + li {
    padding-top: 8px;
  }
`

const ListTime = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 100px;
  padding-left:
`

const TimelineBlock = styled.div`
  display: inline-block;
  background-color: ${Color.THICK_GREEN};
  border-radius: 8px;
  border: 1px solid ${Color.GRAY};
  width: 80px;
  height: 20px;
`
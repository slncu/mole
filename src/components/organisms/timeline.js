// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import ClickOutside from 'react-click-outside'
import _ from 'lodash'
import styled from 'styled-components'
import type { Tasks } from '../../redux/modules/tasks'
import type { Ui } from '../../redux/modules/ui'
import { disPatchIsOpenTimeline } from '../../redux/modules/ui'
import { momentDiffFormatter } from '../../utils/dateManipulator'
import Const from '../../const'
const { Color } = Const

type Props = {
  tasks: Tasks,
  ui: Ui,
  disPatchIsOpenTimeline: (isOpen:boolean) => void
}

class Timeline extends Component<Props> {
  today: any // ちゃんとした型に変える

  constructor () {
    super()
    this.today = moment()
  }

  maxDate () {
    const { lists } = this.props.tasks
    const max = _.cloneDeep(lists).map(list => {
      return list.items.map(item => {
        return this.calculateTermOfTasks(item.startTime, item.endTime).nowToEnd
      })
    })
    console.log(_.max(max[0]))
    return _.max(max[0])
  }

  daysBlock () {
    const days = []
    const max = this.maxDate()
    console.log(max)

    for (let i = 1; i <= max; i++) {
      days.push(
        <DaysBlock key={i}>{this.today.add(1, 'days').format('MM/DD')}</DaysBlock>
      )
    }
    console.log(days)
    return days
  }

  timelineBlock (item) {
    const items = [];

    [this.calculateTermOfTasks(item.startTime, item.endTime).nowToEnd].forEach(e => {
      for (let i = 0; i <= e; i++) {
        items.push(
          <TimelineBlock key={`${item.id}${i}`} />
        )
      }
    })
    console.log(items)
    return items
  }

  calculateTermOfTasks (startTime: string, endTime: string) {
    const startToNow = moment(momentDiffFormatter(this.today)).diff(moment(momentDiffFormatter(moment(startTime))), 'days')
    const nowToEnd = moment(momentDiffFormatter(moment(endTime))).diff(moment(momentDiffFormatter(this.today)), 'days')

    return { startToNow, nowToEnd }
  }

  onClose() {
    this.props.disPatchIsOpenTimeline(false)
  }

  render () {
    const { lists } = this.props.tasks

    return (
      <Wrapper>
        <Overlay />
        <ClickOutside onClickOutside={() => { this.onClose() }}>
          <Milestone>
            <LeftContent>
              <CardBox>
                {lists.map(list => (
                  list.items.map(item => (
                    <CardName key={item.id}>
                      {item.content}
                    </CardName>
                  ))
                ))}
              </CardBox>
            </LeftContent>
            <RightContent>
              <TermsBox>
                {lists.map(list => (
                  list.items.map(item => (
                    <TermsWrapper key={item.id}>
                      {this.timelineBlock(item)}
                    </TermsWrapper>
                  ))
                ))}
                <DaysWrapper>
                  <DaysBlock>{this.today.format('MM/DD')}</DaysBlock>
                  {this.daysBlock()}
                </DaysWrapper>
              </TermsBox>
            </RightContent>
          </Milestone>
        </ClickOutside >
      </Wrapper>
    )
  }
}

function mapStateToProps (state) {
  return {
    tasks: state.tasks,
    ui: state.ui
  }
}

export default connect(mapStateToProps,{
  disPatchIsOpenTimeline
})(Timeline)

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
  width: 100vw;
  height: 33.3%;
  bottom: 0;
  left: 0;
`

const Milestone = styled.div`
  position: relative;
  overflow: scroll;
  width: 100%;
  height: 100%;
`

const LeftContent = styled.div`
  position: sticky;
  background-color: ${Color.THICK_WHITE};
  padding: 29px 0 0 0;
  border-right: 1px solid ${Color.GRAY};
  float: left;
  top: 0;
  left: 0;
  z-index: 2;
`
const CardName = styled.div`
  width: 120px;
  padding: 6px 12px 6px 0;
  text-align: right;
  background-color: ${Color.THICK_WHITE};
  border-top: 1px solid ${Color.GRAY};
`

const RightContent = styled.div`
  position: absolute;
  background-color: ${Color.THICK_WHITE};
  z-index: 1;
  white-space: nowrap;
  left: 133px;
  padding-top: 29px;
  height: 100%;
`

const TermsWrapper = styled.div`
  padding: 6px 12px 6px 10px;
  background-color: ${Color.THICK_WHITE};
  white-space: nowrap;
  height: 23px;
  border-top: 1px solid ${Color.GRAY};
`

const DaysWrapper = styled.div`
  display: flex;
  position: absolute;
  font-size: 10px;
  padding: 6px 0 0 145px;
  top: -29px;
  left: -133px;
`

const DaysBlock = styled.div`
  display: inline-block;
  background-color: ${Color.THICK_WHITE};
  width: 36px;
  height: 22px;
  box-sizing: border-box;
`

const TimelineBlock = styled.div`
  display: inline-block;
  background-color: ${Color.THICK_GREEN};
  border-radius: 4px;
  border: 1px solid ${Color.GRAY};
  width: 36px;
  height: 22px;
  box-sizing: border-box;
`

const CardBox = styled.div`
  position: relative;
  overflow: scroll;
`

const TermsBox = styled.div`
  position: relative;
`

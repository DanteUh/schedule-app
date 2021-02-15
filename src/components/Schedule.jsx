import React, { Component } from 'react';
import Event from './Event';
import { connect } from 'react-redux';
import date from 'date-and-time';
import * as events from '../app-data/events.json';
import * as dayColors from '../app-data/dayColor.json';

import { getEventData } from '../store/actions/eventData';

class Schedule extends Component {
  state = {
    eventData: [],
    weekdays: [],
    dayColors: [],
  }

  componentDidMount() {
    this.setWeekDays();
    // this.props.getEventData();
    this.setData();
  }

  /*
    Get all weekdays to render from a array

    Only get the events from today and one week forward (today + 6)

    Remember weekdays and events are seperate things

    A weekday should have it's own events

    Return eventData data not working?!?!?
  */

  setData = () => {
    this.setState({
      eventData: events.data,
      dayColors: dayColors.data,
    })
  }

  setWeekDays = () => {
    const now = new Date();
    const pattern = date.compile('dddd, YYYY-MM-DD');

    // We will always have +6 days from now
    const dayNumbersArray = [0, 1, 2, 3, 4, 5, 6];
    const daysArray = this.createDayObj(dayNumbersArray, now, pattern);

    this.setState({
      ...this.state,
      weekdays: daysArray
    });
  }

  createDayObj = (dayArr, now, pattern) => {
    return dayArr.map(dayNum => {
      return {
        day: date.format(date.addDays(now, dayNum), date.compile('dddd')),
        date: date.format(date.addDays(now, dayNum), date.compile('YYYY-MM-DD'))
      }
    });
  }

  renderWeekday = () => {
    return this.state.weekdays.map((weekday, i) => {
      const weekdayColor = this.state.dayColors.filter(day => {
        return day.weekDay === weekday.day;
      });

      return(
        <div className="weekday-card w-full h-auto" key={i}>
          <div className={`justify-between shadow ${weekdayColor[0].color} rounded xl:rounded-none xl:shadow-none p-2`}>
            <div className="flex flex-row justify-center">
              <p className="text-lg">{weekday.day}</p>
              <svg className="h-6 w-6 md:hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              {/* <svg className="h-6 w-6 md:hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg> */}
            </div>
          </div>
  
          {/* Hidden card under the clickable day */}
          <div className="shadow-md border-t-0 overflow-y-visible rounded rounded-t-none flex-1 xl:rounded-none xl:shadow-none xl:border-b-0 xl:min-h-44 overflow-y-hidden p-2 pb-3">
            {this.renderEvent(weekday)}
          </div>
        </div>
      );
    })
  }

  renderEvent = (weekday) => {
    return this.state.eventData.map((event, i) => {
      if(event.date !== weekday.date) {
        return '';
      }
      return(
        <Event
          key={i}
          eventName={event.name}
          eventTime={event.time}
          eventDate={event.date}
          eventLinks={event.links}
        />
      );
    });
  }

  render() {
    return (
      <div className="weekday-card-container grid grid-cols-1 gap-4 xl:flex xl:flex-direction-row xl:justify-center xl:gap-0 xl:p-0 text-white p-1 h-auto">
        {this.renderWeekday()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    asd: state.eventData,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getEventData: () => dispatch(getEventData()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);

import React from 'react';
import date from 'date-and-time';
import { useSelector } from 'react-redux';
import Weekday from './Weekday';
import { apiCall } from '../helpers/functions';
import * as dayColors from '../app-data/dayColor.json';

export default function ScheduleHook() {
  const [state, setState] = React.useState({
    weekdays:[],
    events: [],
    dayColors: [],
  });

  React.useEffect(() => {
    /* Do things on init */
    apiCall('http://localhost:4000/events', {method: 'GET'},
    (response) => {
      loadInitData(response);
    });
  }, []);

  const loadInitData = (data) => {
    setState({
      ...state,
      events: data,
      weekdays: setWeekDaysArray(),
      dayColors: dayColors.data,
    })
  }

  const setWeekDaysArray = () => {
    const now = new Date();
    const pattern = date.compile('dddd, YYYY-MM-DD');
    // We will always have +6 days from now
    const dayNumbersArray = [0, 1, 2, 3, 4, 5, 6];

    return createDayObj(dayNumbersArray, now, pattern);
  }

  const createDayObj = (dayArr, now, pattern) => {
    return dayArr.map(dayNum => {
      return {
        day: date.format(date.addDays(now, dayNum), date.compile('dddd')),
        date: date.format(date.addDays(now, dayNum), date.compile('YYYY-MM-DD'))
      }
    });
  }

  const renderWeekdays = state.weekdays.map((weekday, i) => {
    return(
      <div className="weekday-card w-full h-auto" key={i}>
        <Weekday
          day={weekday.day}
          date={weekday.date}
          events={state.events}
          dayColors={state.dayColors}
        />
      </div>
    )
  }) 

  return(
    <>
      <div className="weekday-card-container grid grid-cols-1 gap-4 xl:flex xl:flex-direction-row xl:justify-center xl:gap-0 xl:p-0 text-white p-1 h-auto">
        {renderWeekdays}
      </div>
    </>
  );
}

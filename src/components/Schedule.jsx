import React from 'react';
import date from 'date-and-time';
import { useSelector, useDispatch } from 'react-redux';

import Weekday from './Weekday';
import * as types from '../store/actions/types';
import * as dayColors from '../app-data/dayColor.json';

export default function ScheduleHook() {
  const eventData = useSelector(state => state.eventData);
  const dispatch = useDispatch();

  const [state, setState] = React.useState({
    weekdays:[],
    dayColors: [],
  });

  React.useEffect(() => {
    /* Do things on init */
    fetch('http://localhost:4000/events', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET'
    })
    .then(response => response.json())
    .then(response => {
      dispatch({
        type: types.GET_EVENTS_SUCCESS,
        payload: response
      });
    })
    .catch(error => console.log('Error', error));

    loadInitData();
  }, []);

  const loadInitData = (data) => {
    setState({
      ...state,
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
          events={eventData.events}
          dayColors={state.dayColors}
        />
      </div>
    )
  });

  return(
    <>
      <div className="weekday-card-container grid grid-cols-1 gap-4 xl:flex xl:flex-direction-row xl:justify-center xl:gap-0 xl:p-0 text-white p-1 h-auto">
        {renderWeekdays}
      </div>
    </>
  );
}

import React from 'react';
import date from 'date-and-time';
import { useSelector, useDispatch } from 'react-redux';

import Weekday from './Weekday';

import { apiRequest } from '../slices/eventsActions';
import { eventsSelector, getEventsSuccess } from '../slices/events';
import * as dayColorsData from '../app-data/dayColor.json';

export default function ScheduleHook() {
  const { events } = useSelector(eventsSelector);
  const dispatch = useDispatch();

  const [weekdays, setWeekdays] = React.useState([]);
  const [dayColors, setdayColors] = React.useState([]);

  React.useEffect(() => {
    /* Do things on init */
    dispatch(apiRequest('http://localhost:4000/events', {method: 'GET'}, getEventsSuccess));
  }, [dispatch]);

  React.useEffect(() => {
    setWeekdays(setWeekDaysArray());
    setdayColors(dayColorsData.data);
  }, []);

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

  const renderWeekdays = weekdays.map((weekday, i) => {
    return(
      <div className="weekday-card w-full h-auto" key={i}>
        <Weekday
          day={weekday.day}
          date={weekday.date}
          events={events}
          dayColors={dayColors}
        />
      </div>
    )
  });

  console.log(events);

  return(
    <>
      <div className="weekday-card-container grid grid-cols-1 gap-4 xl:flex xl:flex-direction-row xl:justify-center xl:gap-0 xl:p-0 text-white p-1 h-auto">
        {renderWeekdays}
      </div>
    </>
  );
}

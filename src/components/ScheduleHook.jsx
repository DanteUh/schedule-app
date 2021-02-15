import React from 'react';
import date from 'date-and-time';

import Event from './Event';
import { apiCall } from '../helpers/functions';

export default function ScheduleHook() {
  const [state, setState] = React.useState({
    text: 'Hello',
    weekdays:[],
    events: [],
  });

  React.useEffect(() => {
    const newWeekDays = setWeekDaysArray();

    apiCall('http://localhost:4000/events', {method: 'GET'},
    (response) => {
      setState({
        ...state,
        events: response,
        weekdays: newWeekDays,
      });
    });
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

  const renderWeekdays = state.weekdays.map((weekday, i) => {
    return(
      <Weekday
        key={i}
        day={weekday.day}
        date={weekday.date}
      />
    )
  })
  
  const renderEvents = state.events.map((event, i) => {
    return (
      <Event
        key={i}
        eventName={event.name}
        eventTime={event.time}
        eventDate={event.date}
        eventLinks={event.links}
      />
    )
  })

  return(
    <>
      <div>
        {renderEvents}
      </div>
      <button>Show Events</button>
    </>
  );
}

function Weekday(props) {
  //${weekdayColor[0].color}
  return(
    <div className="weekday-card w-full h-auto">
      <div className={`justify-between shadow rounded xl:rounded-none xl:shadow-none p-2`}>
        <div className="flex flex-row justify-center">
          <p className="text-lg">{props.day}</p>
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
        {/* {renderEvent(weekday)} */}
      </div>
    </div>
  );
}

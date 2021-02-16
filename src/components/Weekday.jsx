import React from 'react';
import Event from './Event';

export default function Weekday(props) {
  const renderEvents = props.events.map((event, i) => {
    //console.log(event.links)
    if(event.date !== props.date) {
      return '';
    }
    return (
      <Event
        key={i}
        eventName={event.name}
        eventTime={event.time}
        eventDate={event.date}
        eventLinks={event.links}
      />
    );
  });

  const weekdayColor = props.dayColors.filter(day => {
    return day.weekDay === props.day;
  });

  return(
    <>
      <div className={`justify-between shadow ${weekdayColor[0].color} rounded xl:rounded-none xl:shadow-none p-2`}>
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
        {renderEvents}
      </div>
    </>
  );
}
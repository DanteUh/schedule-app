import React from 'react';
import { useDispatch } from 'react-redux';

import { fetchEvents, fetchEventsFailure } from '../slices/events';
import { getEventsSuccess } from '../slices/events';
import { apiRequest } from '../slices/eventsActions';

const API_URL = process.env.REACT_APP_API_URL;

export default function Event(props) {
  const dispatch = useDispatch();

  const deleteEvent = (eventId) => {
    dispatch(fetchEvents());

    fetch(`${API_URL}${eventId}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        return;
      }

      dispatch(apiRequest(`${API_URL}`, '', {method: 'GET'}, getEventsSuccess));
    })
    .catch(error => {
      dispatch(fetchEventsFailure());
    });
  }

  const renderLink = props.eventLinks.map((link, i) => {
    if (!link.name) {
      return '';
    }
    
    const btnColor = link.name === 'Discord' ? ('bg-indigo-500')
                    : link.name === 'SmashGG' ? ('bg-red-500')
                    : link.name === 'Challonge' ? ('bg-orange')
                    : ('bg-gray-500');
    
    return(
      <button key={i} className={`container rounded-sm ${btnColor} p-2 mt-3`}>
        <a href={`${link.url}`}>
          {link.name}
        </a>
      </button>
    );
  });

  return(
    <div className="event-card bg-gray-800 flex-1 rounded mt-1 p-3">
      <h1 className="text-lg">{props.eventName}</h1>
      <div className="flex justify-center items-center">
        <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p>{props.eventTime}</p>
      </div>
      {/* Buttons should have own style classes */}
      
      {renderLink}
      <button
        className='container bg-red-500 rounded-sm p-2 mt-3'
        onClick={() => deleteEvent(props.eventId)}
      >
        Delete
      </button>
    </div>
  );
}

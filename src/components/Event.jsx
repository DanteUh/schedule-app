import React, { Component } from 'react'

export default class Event extends Component {
  render() {
    const renderLink = this.props.eventLinks.map((link, i) => {
      const btnColor = link === 'Discord' ? ('bg-indigo-500')
                        : link === 'SmashGG' ? ('bg-red-500')
                        : link === 'Challonge' ? ('bg-orange')
                        : ('bg-gray-500');
      return(
        <div key={i} className={`container rounded-sm ${btnColor} p-2 mt-3`}>
          <a href="#">
            {link}
          </a>
        </div>
      );
    })

    return (
      <div className="event-card bg-gray-800 flex-1 rounded mt-1 p-3">
        <h1 className="text-lg">{this.props.eventName}</h1>
        <div className="flex justify-center items-center">
          <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>{this.props.eventTime}</p>
        </div>
        {/* Buttons should have own style classes */}
        
        {renderLink}
      </div>
    );
  }
}

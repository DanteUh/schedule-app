import React from 'react'
import AddEventForm from './AddEventForm';
import { useSelector } from 'react-redux';

export default function AddEventModal(props) {
  const toggle = props.modalToggle ? '' : 'hidden';

  useSelector(state => console.log(state.eventData));

  return (
    <div className={`${toggle} fixed z-10 inset-0 overflow-y-auto`}>
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* 
          Background overlay, show/hide based on modal state.

          Entering: "ease-out duration-300"
            From: "opacity-0"
            To: "opacity-100"
          Leaving: "ease-in duration-200"
            From: "opacity-100"
            To: "opacity-0"
          */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-800 opacity-70"></div>
        </div>

        {/* This element is to trick the browser into centering the modal contents. */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        {/* 
          Modal panel, show/hide based on modal state.

          Entering: "ease-out duration-300"
            From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            To: "opacity-100 translate-y-0 sm:scale-100"
          Leaving: "ease-in duration-200"
            From: "opacity-100 translate-y-0 sm:scale-100"
            To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        */}
        <div className="inline-block align-bottom bg-gray-700 rounded-lg text-left text-white overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <AddEventForm
            handleToggle={props.handleToggle}
          />
        </div>
      </div>
    </div>
  )
}

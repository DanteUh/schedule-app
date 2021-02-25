/* eslint-disable no-restricted-globals */
import React from  'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

export default function AddEventForm(props) {
  const dispatch = useDispatch();
  const { register, errors, handleSubmit } = useForm();

  const onSubmit = (data) => {
    fetch('http://localhost:4000/events', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
    .then(response => {
      if (!response.ok) {
        return;
      }

      dispatch({
        type: 'POST_EVENT_SUCCESS',
        payload: data
      })
    })
    .catch(error => console.log('Error', error));
  }

  return(
    <>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-gray-700 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3 className="text-2xl leading-6 font-medium mb-5" id="modal-headline">
                Add Event
              </h3>
              <div className="mt-2">
                <div className="grid grid-cols-2 grid-rows-4 gap-3">
                  <div className="col-span-2">
                    <label htmlFor="name">Event Name</label>
                    <input className="add-event-input border-2 border-green-500 bg-gray-700 focus:border-color-green-400 focus:ring-0 rounded px-1 h-10 w-full mt-1 mb-2" type="text" name="name" ref={register({ required: true })}/>
                    {errors.name && "A name for the event is required"}
                  </div>
                  <div>
                    <label htmlFor="date">Date of the Event</label>
                    <input className="border-2 border-green-500 bg-gray-700 focus:border-color-green-400 focus:ring-0 rounded px-1 h-10 w-full mt-1" type="date" name="date" ref={register({ required: true })}/>
                  </div>
                  <div>
                    <label htmlFor="time">Time of the Event</label>
                    <input className="border-2 border-green-500 bg-gray-700 focus:border-color-green-400 focus:ring-0 rounded px-1 h-10 w-full mt-1" type="time" name="time" ref={register({ required: true })}/>
                  </div>
                  <fieldset className="row-span-2" name="links[0]">
                    <div className="mb-2">
                      <label htmlFor="links[0].name">Link Name #1</label>
                      <input className="border-2 border-indigo-500 bg-gray-700 focus:border-color-green-400 focus:ring-0 rounded px-1 h-10 w-full mt-1" type="text" name="links[0].name" ref={register}/>
                    </div>
                    <div>
                      <label htmlFor="link1.url">Link Url #1</label>
                      <input className="border-2 border-indigo-500 bg-gray-700 focus:border-color-green-400 focus:ring-0 rounded px-1 h-10 w-full mt-1" type="url" name="links[0].url" ref={register}/>
                    </div>
                  </fieldset>
                  <fieldset className="row-span-2" name="links[1]">
                    <div className="mb-2">
                      <label htmlFor="links[1].name">Link Name 2#</label>
                      <input className="border-2 border-pink-500 bg-gray-700 focus:border-color-green-400 focus:ring-0 rounded px-1 h-10 w-full mt-1" type="text" name="links[1].name" ref={register}/>
                    </div>
                    <div>
                      <label htmlFor="links[1].url">Link Url 2#</label>
                      <input className="border-2 border-pink-500 bg-gray-700 focus:border-color-green-400 focus:ring-0 rounded px-1 h-10 w-full mt-1" type="url" name="links[1].url" ref={register}/>
                    </div>
                  </fieldset>
              </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button onClick={props.handleToggle} type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
            Submit
          </button>
          <button onClick={props.handleToggle} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
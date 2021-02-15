import React from 'react';
import './App.css';
import ScheduleHook from './components/ScheduleHook';
import Navbar from './components/Navbar';
import Schedule from './components/Schedule';

function App() {
  return (
    <div className="App overflow-hidden">
      <Navbar/>
      <main>
        <div className="max-w-8xl mx-auto py-2 px-3 lg:p-0">
          <ScheduleHook/>
          {/* <Schedule/> */}
        </div>
      </main>
    </div>
  );
}

export default App;

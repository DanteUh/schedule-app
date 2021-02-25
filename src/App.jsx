import React from 'react';
import './App.css';
import ScheduleHook from './components/Schedule';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App overflow-hidden">
      <Navbar/>
      <main>
        <div className="max-w-8xl mx-auto py-2 px-3 lg:p-0">
          <ScheduleHook/>
        </div>
      </main>
    </div>
  );
}

export default App;

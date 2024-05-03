import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className='App'>
      <h1>Training app</h1>
      <nav>
        <button>
          <Link to="/">Home</Link>
        </button>{" "}
        <button>
          <Link to="/customer">Customers</Link>
        </button>{" "}
        <button>
          <Link to="/training">Training</Link>
        </button>{" "}
        <button>
          <Link to="/calendar">Calendar</Link>
        </button>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;

import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className='App'>
      <h1 >Training app</h1>
      <nav>
        <button>
          <Link to="/" style={{ color: 'white' }}>Home</Link>
        </button>{" "}
        <button>
          <Link to="/customer" style={{ color: 'white' }}>Customers</Link>
        </button>{" "}
        <button>
          <Link to="/training" style={{ color: 'white' }}>Training</Link>
        </button>{" "}
        <button>
          <Link to="/calendar" style={{ color: 'white' }}>Calendar</Link>
        </button>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;

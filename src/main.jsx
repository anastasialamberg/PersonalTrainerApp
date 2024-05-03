import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Home from './components/Home.jsx';
import Customer from './components/Customer.jsx';
import Training from './components/Training.jsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Calendar from './components/Calendar.jsx';
import Statistics from './components/Statistics.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <Home />,
        index: true
      },
      {
        path: "customer",
        element: <Customer />,
      },
      {
        path: "training",
        element: <Training />,
      },
      {
        path: "calendar",
        element: <Calendar />,
      },
      {
        path: "statistics",
        element: <Statistics />,
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

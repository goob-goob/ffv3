import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import Root from './routes/root'
import ErrorPage from "./error-page";
import List from './components/List.tsx'
import ManageFolders from './components/ManageFolders.tsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [{
      path: "/raid",
      element: <List />
    }
    ]
  },
  {
    path: "/folders",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [{
      
      element: <ManageFolders />
    }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <>
    <RouterProvider router={router} />
    <App />
  </>
  // </React.StrictMode>,
)

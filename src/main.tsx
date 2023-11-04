import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

import App from './App';
import HomePage from './Pages/Home';
import CompaniesPage from './Pages/ListCompanies';
import { EditCompanyPage } from './Pages/EditCompany';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/companies",
        element: <CompaniesPage/>,
      },
      {
        path: "/companies/:cnpj",
        element: <EditCompanyPage/>,
      }

    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

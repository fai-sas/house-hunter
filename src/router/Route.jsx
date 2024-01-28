/* eslint-disable no-unused-vars */

import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import HomePage from '../pages/HomePage'
import SingleHouse from '../pages/SingleHouse'
import Register from '../pages/Register'
import Login from '../pages/Login'

const Route = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/singleHouse/:id',
        element: <SingleHouse />,
      },
    ],
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
])

export default Route

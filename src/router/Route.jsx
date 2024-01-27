/* eslint-disable no-unused-vars */

import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import HomePage from '../pages/HomePage'
import SingleHouse from '../pages/SingleHouse'

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
])

export default Route

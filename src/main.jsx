import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './Pages/Root';
import ErrorPage from './Pages/ErrorPage';
import VehicleEditPage from './Pages/VehicleEditPage';
import VehicleCreatePage from './Pages/VehicleCreatePage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'vehicles/:id/edit',
                element: <VehicleEditPage />,
            },
            {
                path: 'vehicles/create',
                element: <VehicleCreatePage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

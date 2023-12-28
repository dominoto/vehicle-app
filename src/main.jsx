import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './Pages/Root';
import ErrorPage from './Pages/ErrorPage';
import ModelEditPage from './Pages/ModelEditPage';
import ModelCreatePage from './Pages/ModelCreatePage';
import ModelListPage from './Pages/ModelListPage';
import MakeListPage from './Pages/MakeListPage';

const router = createBrowserRouter([
    {
        path: '/vehicle-app',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                errorElement: <ErrorPage />,
                children: [
                    {
                        path: '/vehicle-app/',
                        element: <MakeListPage />,
                    },
                    {
                        path: 'vehicleMakes/:MakeId',
                        element: <ModelListPage />,
                    },
                    {
                        path: 'vehicleMakes/:MakeId/vehicleModels/:Id/edit',
                        element: <ModelEditPage />,
                    },
                    {
                        path: 'vehicleMakes/:MakeId/vehicleModels/create',
                        element: <ModelCreatePage />,
                    },
                ],
            },
        ],
    },
]);

// Use strict mode if in development
if (process.env.NODE_ENV === 'development') {
    ReactDOM.createRoot(document.getElementById('root')).render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
} else {
    ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);
}

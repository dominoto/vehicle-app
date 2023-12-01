import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './Pages/Root';
import ErrorPage from './Pages/ErrorPage';
import MakeListPage from './Pages/MakeListPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                errorElement: <ErrorPage />,
                children: [
                    {
                        path: '/',
                        element: <MakeListPage />,
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

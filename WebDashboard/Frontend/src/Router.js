import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Login from './components/login/index';
import Signup from './components/signup/index';
import ProtectedRoute from './ProtectedRoute';
import Home from './components/home/home';
import Dashboard from './components/dashboard/dashboard';

const getAccessToken = () => {
    return localStorage.getItem("token");
}

const isAuthenticated = () => {
    return !!getAccessToken();
}

const router = createBrowserRouter(
    [
        {
            path: '/login',
            element: <Login />,
            index: true
        },
        {
            path: '/signup',
            element: <Signup />,
            index: true
        },
        {
            element: <ProtectedRoute isAuthenticated={isAuthenticated()} />,
            children: [
            {
                path: '/', 
                element: <Home />
            },
            {
                path: '/home', 
                element: <Home />
            },
            {
                path: '/dashboard', 
                element: <Dashboard />
            }            
            ]
        },
        {
            path: '*',
            element: <p>404 Error - Nothing here...</p>
        }
    ]
);

export default router;

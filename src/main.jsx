import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './component/home/Home.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import HistoryPage from './pages/HistoryPage.jsx';
import WeatherPage from './pages/WeatherPage.jsx';
import Protected from './component/Protected.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: (
          <Protected authentication={false}>
            <LoginPage />
          </Protected>
        )
      },
      {
        path: '/signup',
        element: (
          <Protected authentication={false}>
            <SignupPage />
          </Protected>
        )
      },
      {
        path: '/history',
        element: (
          <Protected>
            <HistoryPage />
          </Protected>
        )
      },
      {
        path: '/weather/:slug',
        element: (
          <Protected>
            <WeatherPage />
          </Protected>
        )
      },
      {
        path: '*',
        element: <h1 className="text-white text-center text-3xl mt-20">404 - Page Not Found</h1>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);

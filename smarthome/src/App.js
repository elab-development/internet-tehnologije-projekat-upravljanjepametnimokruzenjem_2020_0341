import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthorizeUser, ProtectedRoute } from './utils/authProtector';
import DashContextWrapper from './context/DashContext';
import Home from './pages/Home';
import Username from './pages/Username';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Password from './pages/Password';
import Recovery from './pages/Recovery';
import Reset from './pages/Reset';
import Profile from './pages/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/username',
    element: <Username />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/password',
    element: (
      <ProtectedRoute>
        <Password />
      </ProtectedRoute>
    ),
  },
  {
    path: '/recovery',
    element: (
      <ProtectedRoute>
        <Recovery />
      </ProtectedRoute>
    ),
  },
  {
    path: '/reset',
    element: (
      <ProtectedRoute>
        <Reset />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <AuthorizeUser>
        <DashContextWrapper>
          <Dashboard />
        </DashContextWrapper>
      </AuthorizeUser>
    ),
  },
  {
    path: '/settings',
    element: (
      <AuthorizeUser>
        <DashContextWrapper>
          <Settings />
        </DashContextWrapper>
      </AuthorizeUser>
    ),
  },
  {
    path: '/profile',
    element: (
      <AuthorizeUser>
        <DashContextWrapper>
          <Profile />
        </DashContextWrapper>
      </AuthorizeUser>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;

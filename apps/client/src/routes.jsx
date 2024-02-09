import { lazy } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext.jsx';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';

import { DashboardLayout } from './layouts/DashboardLayout.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Signup = lazy(() => import('./pages/Signup.jsx'));
const NewPaymentOption = lazy(() => import('./pages/payment-option/NewPaymentOption.jsx'));
const PaymentOptions = lazy(() => import('./pages/payment-option/PaymentOptions.jsx'));

const router = createBrowserRouter([
  {
    path: '',
    element: (
      <AuthProvider>
        <ProtectedRoute>
          <DashboardLayout>
            <Home />
          </DashboardLayout>
        </ProtectedRoute>
      </AuthProvider>
    ),
  },
  {
    path: 'payment-option',
    element: (
      <AuthProvider>
        <ProtectedRoute>
          <DashboardLayout>
            <PaymentOptions />
          </DashboardLayout>
        </ProtectedRoute>
      </AuthProvider>
    ),
  },
  {
    path: 'payment-option/new',
    element: (
      <AuthProvider>
        <ProtectedRoute>
          <DashboardLayout>
            <NewPaymentOption />
          </DashboardLayout>
        </ProtectedRoute>
      </AuthProvider>
    ),
  },
  {
    path: 'login',
    element: (
      <AuthProvider>
        <Login />
      </AuthProvider>
    ),
  },
  {
    path: 'signup',
    element: (
      <AuthProvider>
        <Signup />
      </AuthProvider>
    ),
  },
]);

export default router;

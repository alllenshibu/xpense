'use client';

import { useRouter } from 'next/navigation';

import { useAuth } from '@/hooks/useAuth';

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  const router = useRouter();

  if (!user) router.push('/login');

  return children;
};

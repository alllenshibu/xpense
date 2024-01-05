'use client';

import React from 'react';

import { ChakraProvider, extendTheme, withDefaultColorScheme } from '@chakra-ui/react';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';

const theme = extendTheme(
  withDefaultColorScheme({
    colorScheme: 'purple',
  }),
);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Xpense</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="h-screen">
        <AuthProvider>
          <ProtectedRoute>
            <ChakraProvider theme={theme}>{children}</ChakraProvider>
          </ProtectedRoute>
        </AuthProvider>
      </body>
    </html>
  );
}

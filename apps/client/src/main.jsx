import React from 'react';
import ReactDOM from 'react-dom/client';

import { RouterProvider } from 'react-router-dom';

import router from './routes.jsx';

import { ChakraProvider, extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

const theme = extendTheme(
  withDefaultColorScheme({
    colorScheme: 'purple',
  }),
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
);

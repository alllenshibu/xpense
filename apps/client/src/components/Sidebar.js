'use client';

import { useState } from 'react';

import { useAuth } from '@/hooks/useAuth';

import { Box, Text, Button, Flex } from '@chakra-ui/react';

const Sidebar = () => {
  const [loading, setLoading] = useState(false);

  const { logout } = useAuth();

  return (
    <Box padding={4} height="100%" width={80}>
      <Box paddingY={4}>
        <a href="/">
          <Text fontSize="4xl" fontWeight="bold">
            xpense
          </Text>
        </a>
      </Box>
      <Flex paddingY={4} direction="column" gap={2}>
        <Text fontSize="xl">
          <a href="/">Dashboard</a>
        </Text>
        <Text fontSize="xl">
          <a href="/expenses">Expenses</a>
        </Text>
        <Text fontSize="xl">
          <a href="/incomes">Incomes</a>
        </Text>
        <Text fontSize="xl">
          <a href="/categories">Categories</a>
        </Text>
        <Text fontSize="xl">
          <a href="/payment-options">Payment Options</a>
        </Text>
      </Flex>
      <Box paddingY={4}>
        <Text fontSize="xl">
          <a href="/settings">Settings</a>
        </Text>
      </Box>
      <Box paddingY={4}>
        <Button
          onClick={() => {
            setLoading(true);
            logout();
          }}
          isLoading={loading}
          loadingText="Please Wait"
          width="100%"
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;

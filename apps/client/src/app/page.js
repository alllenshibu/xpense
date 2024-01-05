'use client';

import { useState, useEffect } from 'react';
import { useFetch } from '@/hooks/useFetch';
import DashboardLayout from '@/layouts/DashboardLayout';

import { Box, Flex, Text } from '@chakra-ui/react';
import { useAuth } from '@/hooks/useAuth';

export default function Dashboard() {
  const { user } = useAuth();
  const { status, get } = useFetch();

  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      const { data, status } = await get('/stats');
      if (status === 200) {
        setStats(data.stats);
      } else {
        alert('Something went wrong');
      }
    };
    fetchStats();
  }, []);

  return (
    <DashboardLayout>
      <Flex
        direction="column"
        height="100%"
        width="100%"
        alignItems="center"
        justifyContent="start"
        gap={8}
      >
        <Box width="100%" py={8}>
          <Text fontSize="5xl">
            Hello{' '}
            <Text as="span" fontWeight="bold">
              {user?.firstName}!
            </Text>
          </Text>
        </Box>
        <Flex direction="row" width="100%" alignItems="center" justifyContent="start" gap={8}>
          <Text fontSize="2xl">
            Total spent{' '}
            <Text as="span" fontWeight="bold">
              ₹{stats?.expenses?.total}
            </Text>
          </Text>
          <Text fontSize="2xl">
            Total earned{' '}
            <Text as="span" fontWeight="bold">
              ₹{stats?.incomes?.total}
            </Text>
          </Text>{' '}
          <Text fontSize="2xl">
            Balance{' '}
            <Text as="span" fontWeight="bold">
              ₹{stats?.balance}
            </Text>
          </Text>
        </Flex>
        <Flex direction="row" width="100%" alignItems="center" justifyContent="start" gap={8}>
          chart
        </Flex>
      </Flex>
    </DashboardLayout>
  );
}

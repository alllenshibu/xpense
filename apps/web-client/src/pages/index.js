import React, { useEffect, useState } from 'react';

import { Flex, Text, Card } from '@radix-ui/themes';

import { useFetch } from '@/hooks/useFetch';

export default function Home() {
  const [currentMonthExpense, setCurrentMonthExpense] = useState(0);

  const { get } = useFetch();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data, status } = await get('/stats');
        if (status === 200) {
          setCurrentMonthExpense(data.currentMonthExpense);
        } else {
          console.error('Failed to fetch stats');
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  return (
    <Flex width="100%" direction="column" gap="4">
      <Flex justify="between">
        <Text size="7" weight="bold">
          Dashboard
        </Text>
      </Flex>
      <Card>{currentMonthExpense}</Card>
    </Flex>
  );
}

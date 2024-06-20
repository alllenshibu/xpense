import { useEffect, useState } from 'react';

import { Flex, Text, Box, Card, Table, Button } from '@radix-ui/themes';
import { useFetch } from '@/hooks/useFetch';
import { useRouter } from 'next/router';

export default function ExpenseDetails() {
  const [expense, setExpense] = useState({});

  const { get } = useFetch();

  const router = useRouter();

  const { expenseId } = router.query;

  useEffect(() => {
    if (!expenseId) return;

    const fetchExpense = async () => {
      try {
        const { data, status } = await get(`/expenses/${expenseId}`);
        if (status === 200) {
          setExpense(data.expense);
        } else {
          console.error('Failed to fetch expense');
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchExpense();
  }, []);

  return (
    <Flex width="100%" direction="column" gap="4">
      <Flex>
        <Text size="7" weight="bold">
          {expense.name}
        </Text>
      </Flex>
      <Card>
        <Flex>
          <Text>{expense.amount}</Text>
          <Text>{new Date(expense.date).toLocaleString()}</Text>
          <Text>{expense?.category?.name}</Text>
          <Text>{expense?.paymentOption?.name}</Text>
        </Flex>
      </Card>
    </Flex>
  );
}

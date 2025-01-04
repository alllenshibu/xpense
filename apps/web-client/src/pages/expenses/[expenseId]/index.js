import { useEffect, useState } from 'react';

import { Flex, Text, Box, Card, Table, Button , Span } from '@radix-ui/themes';
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
      <Flex justify="between">
        <Text size="7" weight="bold">
          {expense.name}
        </Text>
        <Button onClick={(e)=>{
          e.preventDefault();
          router.push(`/splits/new/${expenseId}`);
        }}>Split with friends</Button>
      </Flex>
      <Card>
        <Flex direction="column" gap="4">
          <Text weight="bold" size="6">Rs. {expense.amount}</Text>
          <Text>{new Date(expense.date).toLocaleString()}</Text>
          <Text>Category - {expense?.category?.name}</Text>
          <Text>Payment Option - {expense?.paymentOption?.name}</Text>
        </Flex>
      </Card>
    </Flex>
  );
}

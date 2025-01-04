import { useEffect, useState } from 'react';

import { Flex, Text, Box, Card, Table, Button } from '@radix-ui/themes';
import { useFetch } from '@/hooks/useFetch';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);

  const { get } = useFetch();
  const router = useRouter();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const { data, status } = await get('/expenses');
        if (status === 200) {
          setExpenses(data.expenses);
        } else {
          console.error('Failed to fetch expenses');
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchExpenses();
  }, []);



  return (
    <Flex width="100%" direction="column" gap="4">
      <Flex justify="between">
        <Text size="7" weight="bold">
          Expenses
        </Text>
        <Button>
          <Link href="/expenses/new">New</Link>
        </Button>
      </Flex>
      <Card>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {expenses.map((expense) => (
              <Table.Row key={expense.id} onClick={(e) => {
                e.preventDefault();
                router.push(`/expenses/${expense.id}`);
              }}>
                <Table.RowHeaderCell>{expense.name}</Table.RowHeaderCell>
                <Table.RowHeaderCell>{expense.amount}</Table.RowHeaderCell>
                <Table.Cell>{new Date(expense.date).toLocaleString()}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Card>
    </Flex>
  );
}

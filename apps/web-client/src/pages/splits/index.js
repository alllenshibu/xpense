import {useEffect, useState} from 'react';

import {Flex, Text, Box, Card, Table, Button} from '@radix-ui/themes';
import {useFetch} from '@/hooks/useFetch';
import {useRouter} from 'next/router';
import Link from 'next/link';

export default function Splits() {
  const [splits, setSplits] = useState([]);

  const {get} = useFetch();
  const router = useRouter();

  useEffect(() => {
    const fetchSplits = async () => {
      try {
        const {data, status} = await get('/splits');
        if (status === 200) {
          setSplits(data.splits);
        } else {
          console.error('Failed to fetch splits');
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchSplits();
  }, []);


  return (
    <Flex width="100%" direction="column" gap="4">
      <Flex justify="between">
        <Text size="7" weight="bold">
          Splits
        </Text>
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
            {splits.map((split) => (
              <Table.Row key={split.expenseId} onClick={(e) => {
                e.preventDefault();
                router.push(`/splits/${split.expenseId}`);
              }}>
                <Table.RowHeaderCell>{split.expense.name}</Table.RowHeaderCell>
                <Table.RowHeaderCell>{split.expense.amount * split.share}</Table.RowHeaderCell>
                <Table.Cell>{new Date(split.expense.date).toLocaleString()}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Card>
    </Flex>
  );
}

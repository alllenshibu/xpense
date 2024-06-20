import { useEffect, useState } from 'react';

import { Flex, Text, Box, Card, Table, Button } from '@radix-ui/themes';
import { useFetch } from '@/hooks/useFetch';
import { useRouter } from 'next/router';

export default function CategoryDetails() {
  const [category, setCategory] = useState({});

  const { get } = useFetch();

  const router = useRouter();

  const { categoryId } = router.query;

  useEffect(() => {
    if (!categoryId) return;

    const fetchCategory = async () => {
      try {
        const { data, status } = await get(`/categories/${categoryId}`);
        if (status === 200) {
          setCategory(data.category);
        } else {
          console.error('Failed to fetch category');
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategory();
  }, []);

  return (
    <Flex width="100%" direction="column" gap="4">
      <Flex>
        <Text size="7" weight="bold">
          Category - {category.name}
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
            {category?.expenses?.map((expense) => (
              <Table.Row>
                <Table.RowHeaderCell>{expense.name}</Table.RowHeaderCell>
                <Table.Cell>{expense.amount}</Table.Cell>
                <Table.Cell>{new Date(expense.date).toLocaleString()}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Card>
    </Flex>
  );
}

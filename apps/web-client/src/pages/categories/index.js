import { useEffect, useState } from 'react';

import { Flex, Text, Box, Card, Table, Button } from '@radix-ui/themes';
import { useFetch } from '@/hooks/useFetch';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Categories() {
  const [categories, setCategories] = useState([]);

  const { get } = useFetch();
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, status } = await get('/categories');
        if (status === 200) {
          setCategories(data.categories);
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  const handleNavigate = (e) => {
    const category = categories.find((category) => category.name === e.target.innerText);
    router.push(`/categories/${category.id}`);
  };

  return (
    <Flex width="100%" direction="column" gap="4">
      <Flex justify="between">
        <Text size="7" weight="bold">
          Categories
        </Text>
        <Button>
          <Link href="/categories/new">New</Link>
        </Button>
      </Flex>
      <Card>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>No.</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Total</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {categories.map((category) => (
              <Table.Row key={category.id} onClick={handleNavigate}>
                <Table.RowHeaderCell>{category.name}</Table.RowHeaderCell>
                <Table.RowHeaderCell>{category.expenses.length}</Table.RowHeaderCell>
                <Table.Cell>{category.total}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Card>
    </Flex>
  );
}

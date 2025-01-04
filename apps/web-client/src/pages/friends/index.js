import { useEffect, useState } from 'react';

import { Flex, Text, Box, Card, Table, Button } from '@radix-ui/themes';
import { useFetch } from '@/hooks/useFetch';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Friends() {
  const [friends, setFriends] = useState([]);

  const { get } = useFetch();
  const router = useRouter();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const { data, status } = await get('/friends');
        if (status === 200) {
          setFriends(data.friends);
        } else {
          console.error('Failed to fetch friends');
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchFriends();
  }, []);

  return (
    <Flex width="100%" direction="column" gap="4">
      <Flex justify="between">
        <Text size="7" weight="bold">
          Friends
        </Text>
        <Button>
          <Link href="/friend-requests/new">Add</Link>
        </Button>
      </Flex>
      <Card>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>First Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Last Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {friends.map((friend) => (
              <Table.Row>
                <Table.Cell>{friend.firstName}</Table.Cell>
                <Table.Cell>{friend.lastName}</Table.Cell>
                <Table.Cell>{friend.email}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Card>
    </Flex>
  );
}

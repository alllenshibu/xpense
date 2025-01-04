import {useEffect, useState} from 'react';

import {Flex, Text, Box, Card, Table, Button, TextField, Select} from '@radix-ui/themes';
import {useFetch} from '@/hooks/useFetch';
import {useRouter} from 'next/router';
import Link from "next/link";

export default function NewSplit() {
  const [expense, setExpense] = useState({});
  const [friends, setFriends] = useState([]);
  const [shares, setShares] = useState([{
    userId: 'SELF',
    share: 1,
  }]);

  const {get, post} = useFetch();

  const router = useRouter();

  const {expenseId} = router.query;

  useEffect(() => {
    if (!expenseId) return;

    const fetchExpense = async () => {
      try {
        const {data, status} = await get(`/expenses/${expenseId}`);
        if (status === 200) {
          setExpense(data.expense);
        } else {
          console.error('Failed to fetch expense');
        }
      } catch (err) {
        console.error(err);
      }
    };
    const fetchFriends = async () => {
      try {
        const {data, status} = await get('/friends');
        if (status === 200) {
          setFriends(data.friends);
        } else {
          console.error('Failed to fetch friends');
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchExpense();
    fetchFriends();
  }, []);

  const handleSubmit = async () => {
    try {
      const {status} = await post(
        '/splits',
        {},
        {
          expenseId: expenseId,
          shares
        },
      );
      if (status === 200) {
        router.push('/splits');
      } else {
        console.error('Failed to create split');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const recalculateShares = ({userId, newShare}) => {
    const totalShares = shares.reduce((amount, share) => amount + share.share, 0);
    const otherSharesTotal = totalShares - shares.find((share) => share.userId === userId).share;

    const remainingShare = 1 - newShare;

    setShares(
      shares.map((share) => {
        if (share.userId === userId) {
          return {...share, share: newShare};
        } else {
          return {...share, share: (share.share / otherSharesTotal) * remainingShare};
        }
      })
    );
  };


  return (
    <Flex width="100%" direction="column" gap="4">
      <Flex justify="between">
        <Text size="7" weight="bold">
          {expense.name}
        </Text>
        <Button onClick={handleSubmit}>
          Confirm Split
        </Button>
      </Flex>
      <Card>
        <Flex direction="column" gap="4">
          <Text weight="bold" size="6">Rs. {expense.amount}</Text>
          <Text>{new Date(expense.date).toLocaleString()}</Text>
          <Text>Category - {expense?.category?.name}</Text>
          <Text>Payment Option - {expense?.paymentOption?.name}</Text>
        </Flex>
      </Card>
      <Flex direction="row" justify="center" align="start" gap="4">
        <Flex width="100%" direction="column">
          <Text size="5" weight="bold">Share List</Text>
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
                {shares.map((share) => {
                  if (share.userId === 'SELF') {
                    return (
                      <Table.Row key={share.userId}>
                        <Table.Cell>SELF</Table.Cell>
                        <Table.Cell>SELF</Table.Cell>
                        <Table.Cell>SELF</Table.Cell>
                        <Table.Cell>
                          <TextField.Root
                            value={share.share * expense.amount}
                            onChange={(e) => recalculateShares({
                              userId: share.userId,
                              newShare: e.target.value / expense.amount
                            })}
                          >
                            <TextField.Slot></TextField.Slot>
                          </TextField.Root>
                        </Table.Cell>
                      </Table.Row>
                    )
                      ;
                  } else {
                    const friend = friends.find((f) => f.id === share.userId);
                    return (
                      <Table.Row key={share.userId}>
                        <Table.Cell>{friend?.firstName}</Table.Cell>
                        <Table.Cell>{friend?.lastName}</Table.Cell>
                        <Table.Cell>{friend?.email}</Table.Cell>
                        <Table.Cell>{
                          <TextField.Root
                            value={share.share * expense.amount}
                            onChange={(e) => recalculateShares({
                              userId: share.userId,
                              newShare: e.target.value / expense.amount
                            })}
                          >
                            <TextField.Slot></TextField.Slot>
                          </TextField.Root>
                        }</Table.Cell>
                        <Table.Cell>
                          <Button
                            onClick={(e) => {
                              e.preventDefault();
                              setShares(shares.filter((s) => s.userId !== share.userId));
                            }}
                          >
                            Remove
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    );
                  }
                })}
              </Table.Body>
            </Table.Root>
          </Card>
        </Flex>
        <Flex width="100%" direction="column">
          <Text size="5" weight="bold">Select Friends</Text>
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
                  <Table.Row key={friend.id}>
                    <Table.Cell>{friend.firstName}</Table.Cell>
                    <Table.Cell>{friend.lastName}</Table.Cell>
                    <Table.Cell>{friend.email}</Table.Cell>
                    <Button onClick={(e) => {
                      e.preventDefault();
                      if (shares.find(share => share.userId === friend.id)) return;
                      setShares([...shares, {userId: friend.id, share: 0}]);
                    }}>Add</Button>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Card>
        </Flex>
      </Flex>
    </Flex>
  )
    ;
}

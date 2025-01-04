import {useEffect, useState} from 'react';

import {Flex, Text, Box, Card, Table, Button, TextField} from '@radix-ui/themes';
import {useFetch} from '@/hooks/useFetch';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {request} from "axios";

export default function NewFriendRequest() {
  const [email, setEmail] = useState([]);

  const {get, post} = useFetch();

  const router = useRouter();

  const sendRequest = async () => {
    try {
      const {data, status} = await post('/friend-requests/send', {}, {email});
      if (status === 200) {
        router.push('/friend-requests');
      } else if (status === 400) {
        console.error(data.error);
      } else {
        console.error('Failed to send friend request');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (<Flex width="100%" direction="column" gap="4">
    <Flex justify="between">
      <Text size="7" weight="bold">
        New Friend Request
      </Text>
    </Flex>
    <Card>
      <Text size="4" weight="bold">Search by email</Text>
      <TextField.Root
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      >
        <TextField.Slot></TextField.Slot>
      </TextField.Root>
      <Button onClick={sendRequest}>Send</Button>
    </Card>
  </Flex>);
}

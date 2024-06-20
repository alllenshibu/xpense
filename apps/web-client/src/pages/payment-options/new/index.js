import { useEffect, useState } from 'react';

import { Flex, Text, Box, Card, Table, Button, TextField } from '@radix-ui/themes';
import { useFetch } from '@/hooks/useFetch';
import { useRouter } from 'next/router';

export default function NewPaymentOption() {
  const [name, setName] = useState({});

  const { post } = useFetch();

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const { status } = await post('/payment-options', {}, { name });
      if (status === 200) {
        router.push('/payment-options');
      } else {
        console.error('Failed to create payment option');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Flex width="100%" direction="column" gap="4">
      <Flex>
        <Text size="7" weight="bold">
          New Payment Option
        </Text>
      </Flex>
      <Card>
        <Flex direction="column" gap="4">
          <Text>Payment Option Name</Text>
          <TextField.Root
            placeholder="Travel"
            onChange={(e) => {
              setName(e.target.value);
            }}
          >
            <TextField.Slot></TextField.Slot>
          </TextField.Root>
          <Button onClick={handleSubmit}>Create</Button>
        </Flex>
      </Card>
    </Flex>
  );
}

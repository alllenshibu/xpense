'use client';

import { useState, useEffect } from 'react';

import { useFetch } from '@/hooks/useFetch';

import {
  Button,
  Box,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Text,
  Select,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function NewPaymentOption() {
  const { loading, get, post } = useFetch();

  const router = useRouter();

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('0');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { status } = await post(
      '/income',
      {},
      {
        name,
        amount,
      },
    );
    if (status === 201) {
      router.push('/incomes');
    } else {
      alert('Something went wrong');
    }
  };

  return (
    <Flex
      direction="column"
      height="100%"
      width="100%"
      alignItems="center"
      justifyContent="center"
      gap={8}
    >
      <Box textAlign="center">
        <Text fontSize="3xl" fontWeight="bold">
          Add new income
        </Text>
      </Box>
      <Card width="100%" maxWidth="400px" height="auto">
        <CardBody>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired my={4}>
              <FormLabel>Name</FormLabel>
              <Input
                type="name"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </FormControl>
            <FormControl isRequired my={4}>
              <FormLabel>Amount</FormLabel>
              <Input
                type="number"
                name="amount"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </FormControl>

            <Button type="submit" width="100%" my="4" isLoading={loading} loadingText="Please Wait">
              Add
            </Button>
          </form>
        </CardBody>
      </Card>
    </Flex>
  );
}

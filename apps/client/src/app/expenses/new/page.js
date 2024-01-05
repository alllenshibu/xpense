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
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [paymentOption, setPaymentOption] = useState('');
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { status } = await post(
      '/expense',
      {},
      {
        name,
        amount,
        paymentOption,
        category,
      },
    );
    if (status === 201) {
      router.push('/expenses');
    } else {
      alert('Something went wrong');
    }
  };

  useEffect(() => {
    const fetchPaymentOptions = async () => {
      const { data, status } = await get('/payment-option');
      if (status === 200) {
        setPaymentOptions(data.paymentOptions);
        setPaymentOption(data.paymentOptions[0]?.id);
      } else {
        alert('Something went wrong');
      }
    };
    fetchPaymentOptions();
    const fetchCategories = async () => {
      const { data, status } = await get('/category');
      if (status === 200) {
        setCategories(data.categories);
        setCategory(data.categories[0]?.id);
      } else {
        alert('Something went wrong');
      }
    };
    fetchCategories();
  }, []);

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
          Add new expense
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
            <FormControl isRequired my={4}>
              <FormLabel>Payment Option</FormLabel>
              <Select
                onChange={(e) => {
                  setPaymentOption(e.target.value);
                }}
              >
                {paymentOptions.map((p) => (
                  <option value={p.id}>{p.name}</option>
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired my={4}>
              <FormLabel>Category</FormLabel>
              <Select
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                {categories.map((c) => (
                  <option value={c.id}>{c.name}</option>
                ))}
              </Select>
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

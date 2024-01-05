'use client';

import { useEffect, useState } from 'react';

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
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';

export default function Categories() {
  const { loading, get } = useFetch();

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const { data, status } = await get('/expense');
      if (status === 200) {
        setExpenses(data.expenses);
      } else {
        alert('Something went wrong');
      }
    };
    fetchExpenses();
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
      <Box width="100%" p={8}>
        <Text fontSize="4xl" fontWeight="bold">
          Expenses
        </Text>
      </Box>
      <Box width="100%" height="100%">
        <TableContainer width="100%" height="100%">
          <Table variant="simple">
            <TableCaption>Expenses</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Payment Option</Th>
                <Th>Category</Th>
                <Th>Time</Th>
                <Th isNumeric>Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              {expenses.map((expense) => (
                <Tr key={expense?.id}>
                  <Td>{expense?.name}</Td>
                  <Td>{expense?.paymentOption?.name}</Td>
                  <Td>{expense?.category?.name}</Td>
                  <Td>{new Date(expense?.createdAt).toString()}</Td>
                  <Td isNumeric>{expense?.amount}</Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>{expenses.length} Expenses</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
    </Flex>
  );
}

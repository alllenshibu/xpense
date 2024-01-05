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

  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    const fetchIncomes = async () => {
      const { data, status } = await get('/income');
      if (status === 200) {
        setIncomes(data.incomes);
      } else {
        alert('Something went wrong');
      }
    };
    fetchIncomes();
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
          Incomes
        </Text>
      </Box>
      <Box width="100%" height="100%">
        <TableContainer width="100%" height="100%">
          <Table variant="simple">
            <TableCaption>Incomes</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Time</Th>
                <Th isNumeric>Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              {incomes.map((income) => (
                <Tr key={income?.id}>
                  <Td>{income?.name}</Td>
                  <Td>{new Date(income?.createdAt).toString()}</Td>
                  <Td isNumeric>{income?.amount}</Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>{incomes.length} Incomes</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
    </Flex>
  );
}

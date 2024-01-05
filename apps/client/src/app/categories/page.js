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

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, status } = await get('/category');
      if (status === 200) {
        setCategories(data.categories);
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
      <Box width="100%" p={8}>
        <Text fontSize="4xl" fontWeight="bold">
          Categories
        </Text>
      </Box>
      <Box width="100%" height="100%">
        <TableContainer width="100%" height="100%">
          <Table variant="simple">
            <TableCaption>Categories</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th isNumeric>Total</Th>
              </Tr>
            </Thead>
            <Tbody>
              {categories.map((category) => (
                <Tr key={category.id}>
                  <Td>{category.name}</Td>
                  <Td isNumeric>{category.total}</Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>{categories.length} Categories</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
    </Flex>
  );
}

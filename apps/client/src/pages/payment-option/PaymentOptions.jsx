import { useEffect, useState } from 'react';

import { useFetch } from '../../hooks/useFetch';

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

function PaymentOptions() {
  const { loading, get } = useFetch();

  const [paymentOptions, setPaymentOptions] = useState([]);

  useEffect(() => {
    const fetchPaymentOptions = async () => {
      const { data, status } = await get({
        endpoint: '/payment-option',
      });
      if (status === 200) {
        setPaymentOptions(data.paymentOptions);
      } else {
        alert('Something went wrong');
      }
    };
    fetchPaymentOptions();
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
          Payment Options
        </Text>
      </Box>
      <Box width="100%" height="100%">
        <TableContainer width="100%" height="100%">
          <Table variant="simple">
            <TableCaption>Payment Options</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th isNumeric>Total</Th>
              </Tr>
            </Thead>
            <Tbody>
              {paymentOptions.map((paymentOption) => (
                <Tr key={paymentOption.id}>
                  <Td>{paymentOption.name}</Td>
                  <Td isNumeric>{paymentOption.total}</Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>{paymentOptions.length} payment option(s)</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
    </Flex>
  );
}

export default PaymentOptions;

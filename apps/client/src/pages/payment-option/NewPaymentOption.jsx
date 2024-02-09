import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
} from '@chakra-ui/react';

function NewPaymentOption() {
  const { loading, post } = useFetch();

  const navigate = useNavigate();

  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { status } = await post({
      endpoint: '/payment-option',
      body: {
        name,
      },
    });
    if (status === 201) {
      navigate('/payment-option');
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
          Add new payment option
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

            <Button type="submit" width="100%" my="4" isLoading={loading} loadingText="Please Wait">
              Add
            </Button>
          </form>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default NewPaymentOption;

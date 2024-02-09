import { useState } from 'react';

import { useAuth } from '../hooks/useAuth';

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

export default function Signup() {
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    signup({ firstName, lastName, email, password });
  };

  return (
    <Flex direction="column" height="100vh" alignItems="center" justifyContent="center" gap={8}>
      <Box textAlign="center">
        <Text fontSize="3xl" fontWeight="bold">
          Create a new account
        </Text>
        <Text>
          Already have an account?{' '}
          <Text as="span" color="blue" fontWeight="semibold">
            <a href="/login">Log in</a>
          </Text>
        </Text>
      </Box>
      <Card width="100%" maxWidth="400px" height="auto">
        <CardBody>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired my={4}>
              <FormLabel>First name</FormLabel>
              <Input
                type="text"
                name="firstName"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </FormControl>
            <FormControl isRequired my={4}>
              <FormLabel>Last name</FormLabel>
              <Input
                type="text"
                name="lastName"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </FormControl>
            <FormControl isRequired my={4}>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FormControl>
            <FormControl isRequired my={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </FormControl>

            <Button type="submit" width="100%" my="4" isLoading={loading} loadingText="Please Wait">
              Sign up
            </Button>
          </form>
        </CardBody>
      </Card>
    </Flex>
  );
}

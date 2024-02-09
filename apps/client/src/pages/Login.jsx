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

export default function Login() {
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Flex direction="column" height="100vh" alignItems="center" justifyContent="center" gap={8}>
      <Box textAlign="center">
        <Text fontSize="3xl" fontWeight="bold">
          Login to your account
        </Text>
        <Text>
          Don&apos;t have an account?{' '}
          <Text as="span" color="blue" fontWeight="semibold">
            <a href="/signup">Sign up</a>
          </Text>
        </Text>
      </Box>
      <Card width="100%" maxWidth="400px" height="auto">
        <CardBody>
          <form onSubmit={handleSubmit}>
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
              Login
            </Button>
          </form>
        </CardBody>
      </Card>
    </Flex>
  );
}

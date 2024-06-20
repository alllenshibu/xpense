import { useState } from 'react';

import { Flex, Text, Box, Card, Avatar, TextField, Button, Select } from '@radix-ui/themes';

import { useAuth } from '@/contexts/AuthContext';

export default function Register() {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    await login({ email, password });
  };

  return (
    <Flex direction="column" gap="4">
      <Card>
        <Flex p="5" direction="column" gap="4">
          <Text size="6" weight="bold">
            Login
          </Text>
          <Flex direction="column">
            <Text>Email</Text>
            <TextField.Root
              placeholder="bond@email.com"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            >
              <TextField.Slot></TextField.Slot>
            </TextField.Root>
          </Flex>
          <Flex direction="row" gap="4">
            <Box>
              <Text>Password</Text>
              <TextField.Root
                placeholder="Strong Password"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              >
                <TextField.Slot></TextField.Slot>
              </TextField.Root>
            </Box>
          </Flex>
          <Button onClick={handleLogin}>Login</Button>
        </Flex>
      </Card>
    </Flex>
  );
}

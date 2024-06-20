import { useState } from 'react';

import { Flex, Text, Box, Card, Avatar, TextField, Button, Select } from '@radix-ui/themes';

import { useAuth } from '@/contexts/AuthContext';

export default function Signup() {
  const { signup } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return;
    }

    if (password !== confirmPassword) {
      return;
    }

    await signup({ firstName, lastName, email, password });
  };

  return (
    <Flex direction="column" gap="4">
      <Card>
        <Flex p="5" direction="column" gap="4">
          <Text size="6" weight="bold">
            Signup
          </Text>
          <Flex direction="row" gap="4">
            <Box>
              <Text>First Name</Text>
              <TextField.Root
                placeholder="James"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              >
                <TextField.Slot></TextField.Slot>
              </TextField.Root>
            </Box>
            <Box>
              <Text>Last Name</Text>
              <TextField.Root
                placeholder="Bond"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              >
                <TextField.Slot></TextField.Slot>
              </TextField.Root>
            </Box>
          </Flex>
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
            <Box>
              <Text>Confirm Password</Text>
              <TextField.Root
                placeholder="Strong Password"
                type="password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              >
                <TextField.Slot></TextField.Slot>
              </TextField.Root>
            </Box>
          </Flex>
          <Button onClick={handleSignup}>Signup</Button>
        </Flex>
      </Card>
    </Flex>
  );
}

import { useAuth } from '@/contexts/AuthContext';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { Container, Theme, Flex, Box, Text, Button, IconButton } from '@radix-ui/themes';
import Link from 'next/link';
import { useRef, useState } from 'react';

export default function Layout({ children }) {
  const { logout } = useAuth();

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Theme variant="soft">
      <Container>
        <Flex height="64px" justify="between" align="center">
          <Text size="7" weight="bold">
            Xpense
          </Text>
          <Box
            display={{
              initial: 'flex',
              md: 'none',
            }}
          >
            <IconButton
              size="3"
              onClick={() => {
                setIsExpanded(!isExpanded);
              }}
            >
              <HamburgerMenuIcon />
            </IconButton>
          </Box>
        </Flex>
        <Flex
          justify="start"
          align="start"
          direction={{
            initial: 'column',
            md: 'row',
          }}
        >
          <Flex
            width="240px"
            py={{
              initial: '4',
              md: '0',
            }}
            direction="column"
            align="start"
            gap="4"
            display={{
              initial: isExpanded ? 'flex' : 'none',
              md: 'flex',
            }}
            css={{
              transition: 'all 0.3s ease',
            }}
          >
            <Button variant="ghost" color="gray" size="3">
              <Link href="/">Home</Link>
            </Button>
            <Button variant="ghost" color="gray" size="3">
              <Link href="/expenses">Expenses</Link>
            </Button>
            <Button variant="ghost" color="gray" size="3">
              <Link href="/categories">Categories</Link>
            </Button>
            <Button variant="ghost" color="gray" size="3">
              <Link href="/payment-options">Payment Options</Link>
            </Button>
          </Flex>
          <Flex width="100%" direction="column" justify="center" align="center">
            {children}
          </Flex>
        </Flex>
      </Container>
    </Theme>
  );
}

import { useEffect, useState } from 'react';

import { Flex, Text, Box, Card, Table, Button } from '@radix-ui/themes';
import { useFetch } from '@/hooks/useFetch';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function PaymentOptions() {
  const [paymentOptions, setPaymentOptions] = useState([]);

  const { get } = useFetch();
  const router = useRouter();

  useEffect(() => {
    const fetchPaymentOptions = async () => {
      try {
        const { data, status } = await get('/payment-options');
        if (status === 200) {
          setPaymentOptions(data.paymentOptions);
        } else {
          console.error('Failed to fetch payment options');
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchPaymentOptions();
  }, []);

  const handleNavigate = (e) => {
    const paymentOption = paymentOptions.find(
      (paymentOption) => paymentOption.name === e.target.innerText,
    );
    router.push(`/payment-options/${paymentOption.id}`);
  };

  return (
    <Flex width="100%" direction="column" gap="4">
      <Flex justify="between">
        <Text size="7" weight="bold">
          Payment Options
        </Text>
        <Button>
          <Link href="/payment-options/new">New</Link>
        </Button>
      </Flex>
      <Card>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>No.</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Total</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {paymentOptions.map((paymentOption) => (
              <Table.Row key={paymentOption.id} onClick={handleNavigate}>
                <Table.RowHeaderCell>{paymentOption.name}</Table.RowHeaderCell>
                <Table.RowHeaderCell>{paymentOption.expenses.length}</Table.RowHeaderCell>
                <Table.Cell>{paymentOption.total}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Card>
    </Flex>
  );
}

import { useEffect, useState } from 'react';

import { Flex, Text, Box, Card, Table, Button } from '@radix-ui/themes';
import { useFetch } from '@/hooks/useFetch';
import { useRouter } from 'next/router';

export default function PaymentOptionDetails() {
  const [paymentOption, setPaymentOption] = useState({});

  const { get } = useFetch();

  const router = useRouter();

  const { paymentOptionId } = router.query;

  useEffect(() => {
    if (!paymentOptionId) return;

    const fetchPaymentOption = async () => {
      try {
        const { data, status } = await get(`/payment-options/${paymentOptionId}`);
        if (status === 200) {
          setPaymentOption(data.paymentOption);
        } else {
          console.error('Failed to fetch payment option');
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchPaymentOption();
  }, []);

  return (
    <Flex width="100%" direction="column" gap="4">
      <Flex>
        <Text size="7" weight="bold">
          Payment Option - {paymentOption.name}
        </Text>
      </Flex>
      <Card>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {paymentOption?.expenses?.map((expense) => (
              <Table.Row>
                <Table.RowHeaderCell>{expense.name}</Table.RowHeaderCell>
                <Table.Cell>{expense.amount}</Table.Cell>
                <Table.Cell>{new Date(expense.date).toLocaleString()}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Card>
    </Flex>
  );
}

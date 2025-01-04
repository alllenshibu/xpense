import { useEffect, useState } from 'react';

import { Flex, Text, Box, Card, Table, Button, TextField, Select } from '@radix-ui/themes';
import { useFetch } from '@/hooks/useFetch';
import { useRouter } from 'next/router';

export default function NewExpense() {
  const [categories, setCategories] = useState([]);
  const [paymentOptions, setPaymentOptions] = useState([]);

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(() => {
    const date = new Date();
    const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return offsetDate.toISOString().slice(0, 16);
  });
  const [categoryId, setCategoryId] = useState();
  const [paymentOptionId, setPaymentOptionId] = useState('');

  const { get, post } = useFetch();

  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, status } = await get('/categories');
        if (status === 200) {
          setCategories(data.categories);
          setCategoryId(data.categories[0]?.id);
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (err) {
        console.error(err);
      }
    };
    const fetchPaymentOptions = async () => {
      try {
        const { data, status } = await get('/payment-options');
        if (status === 200) {
          setPaymentOptions(data.paymentOptions);
          setPaymentOptionId(data.paymentOptions[0]?.id);
        } else {
          console.error('Failed to fetch payment options');
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
    fetchPaymentOptions();
  }, []);

  const handleSubmit = async () => {
    try {
      const { status } = await post(
        '/expenses',
        {},
        {
          name: name,
          date: date ? new Date(date).toISOString() : new Date().toISOString(),
          amount: amount,
          categoryId: categoryId,
          paymentOptionId: paymentOptionId,
        },
      );
      if (status === 200) {
        router.push('/expenses');
      } else {
        console.error('Failed to create expense');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Flex width="100%" direction="column" gap="4">
      <Flex>
        <Text size="7" weight="bold">
          New Expense
        </Text>
      </Flex>
      <Card>
        <Flex direction="column" gap="4">
          <Text>Expense Name</Text>
          <TextField.Root
            placeholder="Train"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          >
            <TextField.Slot></TextField.Slot>
          </TextField.Root>
          <Text>Amount</Text>
          <TextField.Root
            placeholder="100"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          >
            <TextField.Slot></TextField.Slot>
          </TextField.Root>
          <Text>Date</Text>
          <TextField.Root
            value={date}
            type="datetime-local"
            onChange={(e) => {
              setDate(e.target.value);
            }}
          >
            <TextField.Slot></TextField.Slot>
          </TextField.Root>

          <Text>Category</Text>
          <Select.Root value={categoryId} onValueChange={(value) => setCategoryId(value)}>
            <Select.Trigger placeholder="Category" />
            <Select.Content>
              <Select.Group>
                {categories.map((category) => (
                  <Select.Item key={category.id} value={category.id}>
                    {category.name}
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Content>
          </Select.Root>
          <Text>Payment Option</Text>
          <Select.Root value={paymentOptionId} onValueChange={(value) => setPaymentOptionId(value)}>
            <Select.Trigger placeholder="Payment Option" />
            <Select.Content>
              <Select.Group>
                {paymentOptions.map((paymentOption) => (
                  <Select.Item key={paymentOption.id} value={paymentOption.id}>
                    {paymentOption.name}
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Content>
          </Select.Root>
          <Button onClick={handleSubmit}>Add</Button>
        </Flex>
      </Card>
    </Flex>
  );
}

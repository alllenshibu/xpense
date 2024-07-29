import {useEffect, useState} from 'react';

import {Flex, Text, Box, Card, Table, Button} from '@radix-ui/themes';
import {useFetch} from '@/hooks/useFetch';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {request} from "axios";

export default function FriendRequests() {
    const [friendsRequestsSent, setFriendsRequestsSent] = useState([]);
    const [friendsRequestsReceived, setFriendsRequestsReceived] = useState([]);

    const {get, post} = useFetch();

    const router = useRouter();

    useEffect(() => {
        const fetchFriendRequestsSent = async () => {
            try {
                const {data, status} = await get('/friend-requests/sent');
                if (status === 200) {
                    setFriendsRequestsSent(data.friendRequests);
                } else {
                    console.error('Failed to fetch friend requests');
                }
            } catch (err) {
                console.error(err);
            }
        };
        const fetchFriendRequestsReceived = async () => {
            try {
                const {data, status} = await get('/friend-requests/received');
                if (status === 200) {
                    setFriendsRequestsReceived(data.friendRequests);
                } else {
                    console.error('Failed to fetch friend requests');
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchFriendRequestsSent();
        fetchFriendRequestsReceived();
    }, []);


    return (
        <Flex width="100%" direction="column" gap="4">
            <Flex justify="between">
                <Text size="7" weight="bold">
                    Friend Requests
                </Text>
                <Button>
                    <Link href="/friends/add">Add</Link>
                </Button>
            </Flex>
            <Text size="4" weight="bold">Received</Text>
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>First Name</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Last Name</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {friendsRequestsReceived.map((friend) => (
                        <Table.Row>
                            <Table.Cell>{friend.firstName}</Table.Cell>
                            <Table.Cell>{friend.lastName}</Table.Cell>
                            <Table.Cell>{friend.email}</Table.Cell>
                            <Table.Cell>
                                <Button
                                    onClick={async () => {
                                        try {
                                            const {data, status} = await post("/friend-requests/accept", {}, {
                                                requestId: friend.id
                                            })
                                            if (status === 200) {

                                            } else {
                                                console.error("Failed to accept friend request")
                                            }
                                        } catch (err) {
                                            console.error(err)
                                        }
                                    }}>
                                    Accept
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
            <Text size="4" weight="bold">Sent</Text>
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>First Name</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Last Name</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {friendsRequestsSent.map((friend) => (
                        <Table.Row>
                            <Table.Cell>{friend.firstName}</Table.Cell>
                            <Table.Cell>{friend.lastName}</Table.Cell>
                            <Table.Cell>{friend.email}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Flex>
    );
}

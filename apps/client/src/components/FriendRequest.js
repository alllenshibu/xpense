import { useRouter } from 'next/router';

import { acceptFriendRequest } from '@/services/friend';

export default function FriendRequest({ friendRequest }) {
  const router = useRouter();

  const handleAcceptFriendRequest = async () => {
    const res = await acceptFriendRequest(friendRequest.friend_id);
    if (res.status === 200) {
      alert('Accepted friend request');
    } else if (res.status === 500) {
      alert('Something went wrong with the server');
    } else {
      alert('Something went wrong');
    }
  };

  return (
    <div
      key={friendRequest.friend_id}
      className="relative h-40 p-4 flex flex-col justify-evenly items-start rounded-md ring-1 ring-neutral-300"
    >
      <button className="absolute right-2 top-2" onClick={handleAcceptFriendRequest}>
        Accept
      </button>
      <p className="font-semibold tracking-wide">{JSON.stringify(friendRequest)}</p>
    </div>
  );
}

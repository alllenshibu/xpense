import { useRouter } from 'next/router';

import { acceptFriendRequest } from '@/services/friend';

export default function FriendRequest({ friendRequest }) {
  const router = useRouter();

  const handleAcceptFriendRequest = async () => {
    try {
      const r = await acceptFriendRequest(friendRequest.user_id);
      router.push('/friend');
    } catch (err) {
      console.error(err);
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

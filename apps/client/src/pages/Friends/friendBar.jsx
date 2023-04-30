const FriendBar = ({ friend }) => {
  return (
    <div>
      <div className="flex flex-row justify-between items-center gap-4">
        <p className="text-xl">{friend.username}</p>
        {friend.owes >= 0 ? (
          <span className="text-red-500">you owe {friend.owes}</span>
        ) : (
          <span className="text-green-500">owes you {-friend.owes}</span>
        )}
      </div>
    </div>
  );
};

export default FriendBar;

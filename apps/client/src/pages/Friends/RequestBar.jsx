import axios from 'axios';
const acceptFriendRequest = async (friendName) => {
  const user = localStorage.getItem('user');
  const username = JSON.parse(user).username;
  console.log(username, 'hey');
  await axios
    .post(`${import.meta.env.VITE_API_URL}/friends/send`, {
      username: username,
      reciever: friendName,
    })
    .then((res) => {
      console.log(res.data);
    });
};

const cancelFriendRequest = async (friendName) => {
  const user = localStorage.getItem('user');
  const username = JSON.parse(user).username;
  await axios
    .post(`${import.meta.env.VITE_API_URL}/friends/cancel`, {
      username: username,
      reciever: friendName,
    })
    .then((res) => {
      console.log(res.data);
    });
};

const RequestBar = ({ friendId, friendName, type }) => {
  return (
    <div className="flex justify-between items-center w-full h-16 p-4 bg-black rounded-md shadow-md">
      <div className="flex items-center gap-4">
        <img src="https://picsum.photos/200" className="w-12 h-12 rounded-full" alt="profile" />
        <div className="flex flex-col">
          <p className="text-lg font-semibold">{friendName}</p>
          <p className="text-sm text-gray-500">{friendId}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {type == 'received' ? (
          <div>
            <button className="btn btn-primary" onClick={() => acceptFriendRequest(friendName)}>
              Accept
            </button>
            <button className="btn btn-warning" onClick={() => cancelFriendRequest(friendName)}>
              Reject
            </button>
          </div>
        ) : (
          <button className="btn btn-danger" onClick={() => cancelFriendRequest(friendName)}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default RequestBar;

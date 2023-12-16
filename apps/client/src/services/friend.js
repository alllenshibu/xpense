import axiosInstance from '@/lib/axiosInstance';

const fetchAllFriendRequests = async () => {
  try {
    const r = await axiosInstance.get('/friendrequest');
    if (r?.status === 200) {
      return r?.data?.friendRequests;
    }
  } catch (err) {
    console.error(err);
  }
};

const sendNewFriendRequest = async (requestedUser) => {
  try {
    const r = await axiosInstance.post('/friendrequest', {
      friend: {
        email: requestedUser,
      },
    });
    if (r?.status === 201) {
      return r?.data?.friendRequest;
    }
  } catch (err) {
    console.error(err);
  }
};

const fetchAllFriends = async () => {
  return await axiosInstance.get('/friend');
};

const acceptFriendRequest = async (requestedUser) => {
  try {
    const r = await axiosInstance.post('/friend', {
      friend: {
        id: requestedUser,
      },
    });
    if (r?.status === 200) {
      return r?.data?.friend;
    }
  } catch (err) {
    console.error(err);
  }
};

export { fetchAllFriendRequests, sendNewFriendRequest, fetchAllFriends, acceptFriendRequest };

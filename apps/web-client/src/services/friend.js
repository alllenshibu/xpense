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
      email: requestedUser,
    });
    if (r?.status === 201) {
      return r?.data?.friendRequest;
    }
  } catch (err) {
    console.error(err);
  }
};

const fetchAllFriends = async () => {
  try {
    const r = await axiosInstance.get('/friend');
    if (r?.status === 200) {
      return r?.data?.friends;
    }
  } catch (err) {
    console.error(err);
  }
};

const acceptFriendRequest = async (requestedUser) => {
  try {
    const r = await axiosInstance.post('/friend', {
      friendId: requestedUser,
    });
    if (r?.status === 200) {
      return r?.data?.friend;
    }
  } catch (err) {
    console.error(err);
  }
};

export { fetchAllFriendRequests, sendNewFriendRequest, fetchAllFriends, acceptFriendRequest };

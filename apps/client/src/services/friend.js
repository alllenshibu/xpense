import axiosInstance from "@/lib/axiosInstance";

const fetchAllFriendRequests = async () => {
    return await axiosInstance.get('/friendrequest')
}

const sendNewFriendRequest = async (requestedUser) => {
    return await axiosInstance.post("/friendrequest", {
        friend: {
            email: requestedUser
        }
    })
}

const fetchAllFriends = async () => {
    return await axiosInstance.get('/friend')
}

const acceptFriendRequest = async (requestedUser) => {
    return await axiosInstance.post("/friend", {
        friend: {
            id: requestedUser
        }
    })
}

export {fetchAllFriendRequests, sendNewFriendRequest, fetchAllFriends, acceptFriendRequest}
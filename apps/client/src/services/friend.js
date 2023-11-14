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

export {fetchAllFriendRequests, sendNewFriendRequest}
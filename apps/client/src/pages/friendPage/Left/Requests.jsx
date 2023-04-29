import RequestBar from "./RequestBar";

import axios from "axios";
import { useEffect, useState } from "react";

const Requests = ({ user }) => {

    const [requests, setRequests] = useState([]);
    const [loading , setLoading] = useState(true);
    
    useEffect(() => {

        const fetchRequests= async () => axios
        .get(`${import.meta.env.VITE_API_URL}/friends/getRequests/user1`, {
            withCredentials: true,
        })
        .then((res) => {
            console.log(res.data);
            setRequests(res.data);

        });
        fetchRequests().then(() => setLoading(false))
                       .catch((err) => console.log(err));
    }, []);
    

    
    return (
        loading ? <p>Loading...</p> :
        <div className="w-full h-full flex flex-col justify-center items-center gap-8">
        <p className="text-4xl font-semibold border-b-2 border-gray-300 pb-2
        ">Incoming Requests</p>
        {requests.incoming && requests.incoming.map((request) => (
            <RequestBar friendId = {request.id} friendName={request.name} type="received" />
        ))}
        <p className="text-4xl font-semibold border-b-2 border-gray-300 pb-2
        ">Outgoing Requests</p>
        {requests.outgoing && requests.outgoing.map((request) => (
            <RequestBar friendId = {request.id} friendName={request.name} type="sent" />
        ))}
        </div>
    );
    }

export default Requests;
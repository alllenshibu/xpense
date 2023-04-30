import { useState , useEffect } from "react"
import axios from "axios"
import FriendBar from "./friendBar";

const Right = () => {

    const [friends, setFriends] = useState([]);
    const username  = JSON.parse(localStorage.getItem("user")).username;
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/friends/getFriends/${username}`, {
    
            withCredentials: true,
            })
            .then((res) => {
            console.log(res.data);
            setFriends(res.data);
            });
        }
    , []);

    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-8">
            <p className="text-4xl font-semibold border-b-2 ">Friends</p>
            <div className="w-full h-full flex flex-col justify-center items-center gap-8">
                {friends.map((friend)=>{
                    return(
                        <FriendBar friend={friend}/>
                    )
                }
                )}
            </div>
        </div>
    )
}

export default Right


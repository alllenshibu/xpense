
import {useState} from 'react';
import axios from 'axios';

const AddFriend = () => {

    const [friendName , setFriendName] = useState('');
    const username = JSON.parse(localStorage.getItem('user')).username;

    const handleAddFriend = () => {
        axios
        .post(`${import.meta.env.VITE_API_URL}/friends/send`, {
            username: username,
            reciever: friendName,
        })
        .then((res) => {
            console.log(res.data);
        });
    }


    return (
      <div>
        <div className="w-full h-full flex flex-col justify-center items-center gap-8">
            <p className="text-4xl font-semibold">Add Friend</p>
             <div className = "flex">     
           <input
                type="text"
                placeholder="Friend's Username"
                onChange={(e) => {
                    setFriendName(e.target.value);
                }}
            />
            <button type="submit" className='btn btn-primary' onClick={handleAddFriend}>
                Add Friend
            </button>
             </div>
        </div>
    </div>

        )
}

export default AddFriend;


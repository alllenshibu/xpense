
import {useState} from 'react';

const AddFriend = () => {

    const [friendName , setFriendName] = useState('');

    return (
      <div>
        <div className="w-full h-full flex flex-col justify-center items-center gap-8">
            <p className="text-4xl font-semibold">Add Friend</p>
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

        )
}

export default AddFriend;


import { useState , useEffect } from "react";
import axios from "axios";
const FriendBar = ({friend})=>{
    
    const username = JSON.parse(localStorage.getItem("user")).username;
    const [expenses , setExpenses] = useState([]);
  

        const fetch = async() => {
            if(!expenses.length){
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/expense/get-common/${username}`,{
                friend : friend.username

            }, {
                withCredentials: true,
            });
            console.log(res.data);
            setExpenses(res.data);}
        }


    return(
        <div className="collapse">
        <input type="checkbox" 
            onClick={fetch}
        />
        <div className="collapse-title text-xl font-medium">
        <div className="flex flex-row justify-between items-center gap-4">
                        <p className="text-xl">{friend.username}</p>
                         {friend.owes >= 0 ?
                        <span className="text-red-500">you owe {friend.owes}</span> :
                        <span className="text-green-500">owes you {-friend.owes}</span>
                        }
                    </div>
        </div>
        <div className="collapse-content bg-black w-auto">
        <div className="h-full flex flex-col justify-center items-center gap-4 flex-wrap">
        {expenses.map((items) => {
            const date = new Date(items.date).toLocaleString('en-IN' , {day : 'numeric' , month : 'short' , year : '2-digit'});
            return (
                        // a horizontal tab showing details in 1 line
            <div className = "flex gap-2 justify-start">
                <span>{date}</span>
                <span> {items.name} </span>
                {
                    items.payer_id === friend.frnd_id ?
                    <span className="text-red-500 self-end"> - {items.owe_amount}</span> :
                    <span className="text-green-500 self-end">you lent {items.owe_amount}</span>
                }

            </div>
                );
        })}
      </div>
        </div>
        </div>

            
            )
}

export default FriendBar;
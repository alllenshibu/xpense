const FriendBar = ({friend})=>{
    return(
             <div>
                <div className="flex flex-row justify-between items-center gap-4">
                    <p className="text-xl">{friend.name}</p>
                    <p className="text-xl">{friend.amount}</p>

             </div>
            
            )
}
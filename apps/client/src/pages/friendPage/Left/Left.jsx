import AddFriend from "./AddFriend"
import Requests from "./Requests"
const Left = () => {
    return (
        <div className ="w-[33%] self-start space-y-2">
            <AddFriend />
            <Requests />
        </div>
    )
}
export default Left;
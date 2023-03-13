import { RxDashboard } from "react-icons/rx"
import { TbZoomMoney } from "react-icons/tb"
import { GiThreeFriends } from "react-icons/gi"
import { GoSettings } from "react-icons/go"

const Sidebar = () => {
  return (
    <div className="w-full h-full py-8 px-8 flex flex-col justify-start items-start gap-4 text-xl">
      <button className="p-4 w-full h-10 flex flex-row justify-start items-center gap-3 rounded hover:bg-gray-200 bg-gray-300">
        <RxDashboard />
        Dashboard
      </button>
      <button className="p-4 w-full h-10 flex flex-row justify-start items-center gap-3 rounded hover:bg-gray-200">
        <TbZoomMoney />
        Spend Analysis
      </button>
      <button className="p-4 w-full h-10 flex flex-row justify-start items-center gap-3 rounded hover:bg-gray-200">
        <GiThreeFriends />
        Friends
      </button>
      <button className="p-4 w-full h-10 flex flex-row justify-start items-center gap-3 rounded hover:bg-gray-200">
        <GoSettings />
        Settings
      </button>
    </div>
  )
}

export default Sidebar

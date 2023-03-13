import { RiErrorWarningLine } from "react-icons/ri"

const Overview = () => {
  return (
    <div className="w-full h-2/5 px-10 py-10 flex flex-row justify-between items-center ">
      <p className="text-5xl font-semibold tracking-wide">March, 2023</p>
      <div>
        <p className="flex flex-row">
          <strong className="text-4xl">Rs. 4,397</strong>
          <RiErrorWarningLine className="text-xl" />
        </p>
        <p className="text-xl">
          Target <strong>Rs. 4,000</strong>
        </p>
      </div>
    </div>
  )
}

export default Overview

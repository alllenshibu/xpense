import { useCookies } from 'react-cookie';

import { RxDashboard } from 'react-icons/rx';
import { TbZoomMoney } from 'react-icons/tb';
import { GiThreeFriends } from 'react-icons/gi';
import { GoSettings } from 'react-icons/go';
import { BiLogOut } from 'react-icons/bi';

const Sidebar = ({ user, setUser }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const handleLogout = () => {
    removeCookie('token');
    localStorage.removeItem('user');
    setUser(null);
  };

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

      <button
        onClick={handleLogout}
        className="p-4 w-full h-10 flex flex-row justify-between items-center gap-3 rounded hover:bg-gray-200"
      >
        {user.username}
        <BiLogOut className="justify-self-end" />
      </button>
    </div>
  );
};

export default Sidebar;

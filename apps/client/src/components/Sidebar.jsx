import { useCookies } from 'react-cookie';

import { RxDashboard } from 'react-icons/rx';
import { TbZoomMoney } from 'react-icons/tb';
import { GiThreeFriends } from 'react-icons/gi';
import { GoSettings } from 'react-icons/go';
import { BiLogOut } from 'react-icons/bi';

const Sidebar = ({ user, setUser, setFocusedTab }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const handleLogout = () => {
    removeCookie('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className="w-full h-full py-8 px-4 bg-neutral-900 text-neutral-400 flex flex-col justify-start items-start gap-4 text-xl">
      <button
        onClick={() => {
          setFocusedTab('dashboard');
        }}
        className="sidebar-btn bg-gray-300;"
      >
        <RxDashboard />
        Dashboard
      </button>
      <button
        onClick={() => {
          setFocusedTab('analysis');
        }}
        className="sidebar-btn"
      >
        <TbZoomMoney />
        Spend Analysis
      </button>
      <button
        onClick={() => {
          setFocusedTab('friends');
        }}
        className="sidebar-btn"
      >
        <GiThreeFriends />
        Friends
      </button>
      <button
        onClick={() => {
          setFocusedTab('settings');
        }}
        className="sidebar-btn"
      >
        <GoSettings />
        Settings
      </button>

      <button
        onClick={handleLogout}
        className="p-4 w-full h-10 flex flex-row justify-between items-center gap-3 rounded"
      >
        {user.username}
        <BiLogOut className="justify-self-end" />
      </button>
    </div>
  );
};

export default Sidebar;

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
    <div className="w-full h-full py-2 px-4 bg-[var(--primarybg)] text-neutral-400 flex flex-col justify-start items-start gap-2 text-xl border-r border-[rgba(229,229,254,.087);]">
      <div className="flex items-center flex-row justify-around gap-16 mb-4  ">
        {' '}
        <div className="text-[16px] font-semibold text-left    text-neutral-100">Expense Tracker</div>
        <div className="flex gap-4">
          <RxDashboard />
          <TbZoomMoney />
        </div>
      </div>
      <div className="flex flex-col rounded-xl gap-1 bg-[rgba(215,215,250,.031);]  border border-[rgba(229,229,254,.087);] w-full  mb-4 ">
        <div className="flex flex-row gap-4 p-2 ">
          <div className="h-8 w-8 rounded-full bg-pink-300 "></div>
          <p className="text-sm font-semibold text-[var(--white)]">{user.username}</p>
        </div>
        <div className="border-t border-[rgba(229,229,254,.087);]">
          <div className="flex flex-row divide-[rgba(229,229,254,.087);]  divide-x  justify-center text-[12px]">
            <p className='float-left'>bal:</p>
            <p>over</p>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          setFocusedTab('dashboard');
        }}
        className="sidebar-btn  bg-gray-300;"
      >
        <RxDashboard />
        Dashboard
      </button>
      <button
        onClick={() => {
          setFocusedTab('analysis');
        }}
        className="sidebar-btn "
      >
        <TbZoomMoney />
        Spend Analysis
      </button>
      <button
        onClick={() => {
          setFocusedTab('friends');
        }}
        className="sidebar-btn "
      >
        <GiThreeFriends />
        Friends
      </button>
      <button
        onClick={() => {
          setFocusedTab('settings');
        }}
        className="sidebar-btn "
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

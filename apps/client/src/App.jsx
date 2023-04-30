import React, { useEffect, useState } from 'react';

import AddNewExpense from './components/AddNewExpense';
import Auth from './components/Auth';
import ExpenseExplorer from './components/ExpenseExplorer';
import Friends from './pages/Friends/Friends';
import Overview from './components/Overview';
import PlusButton from './components/PlusButton';
import Sidebar from './components/Sidebar';
import Calendar from './components/Calendar';

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [focusedTab, setFocusedTab] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
    }
    else {
      setUser(null);
      setFocusedTab(null)
    }
    setLoading(false);
  }, []);

  return (
    loading ? <div className="h-screen w-screen flex justify-center items-center">Loading...</div> :
    <div className="App h-screen ">
      {!user && (
        <div className="h-full w-96 mx-auto">
          <Auth setUser={setUser} />
        </div>
      )}
      {user && (
        <div>
        <div className="mx-auto h-full relative flex flex-row justify-center  bg-[var(--primarybg)] items-center">
          <div className="w-96 h-full justify-self-start">
            <Sidebar user={user} setUser={setUser} setFocusedTab={setFocusedTab} />
          </div>
          <div className="w-full h-full bg-[var(--bg-background)] flex flex-col justify-start items-center">
            <Overview />
            <div className="w-full h-full overflow-y-scroll flex flex-col px-2 justify-start">
              {focusedTab === 'dashboard' && <ExpenseExplorer user={user} />}
              {focusedTab === 'friends' && <Friends user={user} />}
            </div>
            <div className="w-full h-full bg-[var(--bg-background)] flex flex-col justify-start items-center">
              <Overview />
              <div className="w-full h-full overflow-y-scroll flex flex-col px-2 justify-start">
                {focusedTab === 'dashboard' && <ExpenseExplorer user={user} />}
                {focusedTab === 'friends' && <Friends user={user} />}
              </div>
            </div>
            {/* <div className="w-96 h-full bg-orange-300 flex flex-col justify-start items-center">
            <Calendar />
          </div> */}
            <div
              className="absolute bottom-20 right-40"
              onClick={() => {
                setIsPopupOpen(true);
              }}
            >
              <PlusButton />
            </div>
          </div>
        </div>

      <div
      className={
        (isPopupOpen ? 'fixed' : 'hidden') +
        ' top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 bg-gray-200 rounded shadow-xl flex flex-col justify-center items-center'
      }
      >
        <div
          className="absolute -top-10 -right-10 rotate-45"
          onClick={() => {
            setIsPopupOpen(false);
          }}
          >
          <PlusButton className="absolute top-0" />
        </div>
        <AddNewExpense user={user} />
      </div>
          </div>
          )}
    </div>
  );
}

export default App;

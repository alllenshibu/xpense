import React, { ReactNode } from 'react';
import Image from 'next/image';

import Sidebar from '@/components/Sidebar';

import Navigation from '@/components/BottomNav';

const DashboardLayout = ({ children, background }) => {
  return (
    <>
      <div className="md:block h-auto md:h-[100vh] md:overflow-hidden">
        <div className="grid lg:grid-cols-5">
          <Sidebar className="hidden lg:block" />
          <div className="lg:hidden">
            <Navigation />
          </div>
          <div className="col-span-3 lg:col-span-4 h-[100vh] bg-neutral-100">
            <div className={`h-full  px-4 py-6 lg:px-8 bg-[${background}]`}>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;

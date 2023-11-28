import React, { ReactNode } from 'react';
import Image from 'next/image';

import Sidebar from '@/components/Sidebar';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Navigation from '@/components/BottomNav';

const DashboardLayout = ({ children,background }) => {
  return (
    <>
      <div className="md:block h-auto md:h-[100vh] overflow-auto lg:overflow-hidden  ">
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar className="hidden lg:block" />
              <div className="lg:hidden">
                <Navigation />
              </div>
              <div className="col-span-3 lg:col-span-4 h-[100vh]  lg:border-l">
                <div className={`h-full  px-4 py-6 lg:px-8 bg-[${background}]`}>{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;

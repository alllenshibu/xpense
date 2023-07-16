import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { useCookies } from 'react-cookie';

export default function Navbar() {
    const router = useRouter();

    const [cookies, setCookie] = useCookies(['token']);

    const [userContextExpanded, setUserContextExpanded] = useState(false);

    const handleLogout = () => {
        setCookie('token', '', { path: '/' });
        router.push('/login');
    }


    return (
        <div className="w-full h-16 px-4 flex flex-row justify-between items-center">
            <div className="text-5xl tracking-tighter font-bold ">Xpense</div>
            <div className="flex flex-row justify-end items-center gap-6">
                <p className='font-semibold tracking-wider'>Target: ₹15,000</p>
                <button
                    onClick={() => {
                        setUserContextExpanded(!userContextExpanded)
                    }}
                    className="h-10 w-10 rounded-full ring-1 hover:ring-2 ring-offset-2 ring-black flex justify-center items-center text-xl bg-gradient-to-b from-blue-400 to-red-400">

                </button>
            </div>
            {
                userContextExpanded &&
                <div className='w-48 py-3 absolute top-16 right-4 ring-1 ring-gray-400 rounded flex flex-col justify-start items-center gap-2 divide-y font-light'>
                    <p className='w-full px-2'>@username</p>
                    <button
                        onClick={handleLogout}
                        className='w-full px-3  py-1 hover:bg-neutral-200 text-left'>Logout</button>
                </div>
            }
        </div>
    )
}
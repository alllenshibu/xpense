import React, { useState } from 'react'
import { useRouter } from 'next/router';

import axios from 'axios'
import { useCookies } from 'react-cookie';

export default function Signup() {
    const router = useRouter();

    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const [cookies, setCookie] = useCookies(['token']);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            console.log(process.env.NEXT_PUBLIC_API_URL + "/auth/signup")
            const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/auth/signup", user)
            console.log(response)
            if (response.status === 200) {
                setCookie('token', response.data.token, { path: '/' });
                console.log(cookies)
                router.push('/')
            }
        }
        catch (err) {
            console.log(err)
            alert("Please")
        }
    }

    return (
        <div className="w-full h-full p-4 flex flex-col justify-center items-center gap-10">
            <div>
                <h1 className='text-5xl font-bold tracking-tighter'>Xpense</h1>
            </div>
            <form
                className="w-full md:w-96 flex flex-col gap-4"
                onChange={(e) => {
                    e.preventDefault()
                    setUser({ ...user, [e.target.name]: e.target.value })
                }}
            >
                <div>
                    <label htmlFor="title">Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={user.username}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={user.password}
                    />
                </div>
                <div>
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="w-auto btn btn-primary"
                    >
                        Signup
                    </button>
                </div>
            </form>
        </div>
    )
}
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import axios from "axios";
import { useCookies } from "react-cookie";

import ExpenseEditor from "@/components/ExpenseEditor";
import DashboardLayout from "@/layouts/DashboardLayout";

export default function AddNewExpense() {
  const router = useRouter();

  const [cookies, setCookie] = useCookies(['token']);

  const [isLoading, setIsLoading] = useState(true);
  const [expense, setExpense] = useState({});

  const fetchExpense = async () => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/expense/" + router.query.id, {
        headers: {
          'Authorization': `Bearer ${cookies.token}`,
          'type': 'application/json'
        },
      })
      console.log(response)
      if (response.status === 200) {
        setExpense(response.data)
        setExpense({ ...expense, timestamp: new Date(response.data.timestamp).toISOString().slice(0, 16) })
      }
    } catch (err) {
      console.log(err)
    }
  }


  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      console.log(process.env.NEXT_PUBLIC_API_URL + "/expense" + router.query.id)
      const response = await axios.put(process.env.NEXT_PUBLIC_API_URL + "/expense/" + router.query.id, {
        expense: expense
      }, {
        headers: {
          'Authorization': `Bearer ${cookies.token}`,
          'type': 'application/json'
        },
      })
      console.log(response)
      if (response.status === 200) {
        console.log("Success")
        router.push('/')
      }
    }
    catch (err) {
      console.log(err)
      alert(err?.message)
    }
  }


  useEffect(() => {
    fetchExpense()
    setIsLoading(false)
  }, [router.query.id])

  return (
    <DashboardLayout>
      <div className="h-full w-full flex items-center justify-center">
        {isLoading ? <div className="text-2xl">Loading...</div> :
          <ExpenseEditor expense={expense} setExpense={setExpense} submitText={"Edit"} handleSubmit={handleSubmit} />
        }
        {JSON.stringify(expense)}
      </div>
    </DashboardLayout>
  )
}

import React, { useState } from "react";
import { useRouter } from "next/router";

import axios from "axios";
import { useCookies } from "react-cookie";

import ExpenseEditor from "@/components/ExpenseEditor";
import DashboardLayout from "@/layouts/DashboardLayout";

export default function AddNewExpense() {
  const router = useRouter();

  const [cookies, setCookie] = useCookies(['token']);

  const [expense, setExpense] = useState({
    title: '',
    amount: '',
    timestamp: new Date().toISOString().slice(0, 16),
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      console.log(process.env.NEXT_PUBLIC_API_URL + "/expense")
      const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/expense", {
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

  return (
    <DashboardLayout>
      <div className="h-full w-full flex items-center justify-center">
        <ExpenseEditor expense={expense} setExpense={setExpense} submitText={"Add"} handleSubmit={handleSubmit} />
      </div>
    </DashboardLayout>
  )
}

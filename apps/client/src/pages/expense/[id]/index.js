import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import axios from "axios";
import { useCookies } from "react-cookie";

import DashboardLayout from "@/layouts/DashboardLayout";

import { fetchExpense } from "@/services/expenseServices";

export default function AddNewExpense() {
  const router = useRouter();

  const [cookies, setCookie] = useCookies(['token']);

  const [expense, setExpense] = useState({});


  useEffect(() => {
    fetchExpense(cookies.token, router.query.id).then((data) => {
      setExpense(data)
    })
  }, [router.query.id])

  return (
    <DashboardLayout>
      <div className="h-full w-full flex items-center justify-center">
        {
          JSON.stringify(expense)
        }
      </div>
    </DashboardLayout>
  )
}

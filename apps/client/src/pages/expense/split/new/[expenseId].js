// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";

// import axios from "axios";
// import { useCookies } from "react-cookie";

// import ExpenseEditor from "@/components/ExpenseEditor";
// import DashboardLayout from "@/layouts/DashboardLayout";
// import SplitEditor from "@/components/SplitEditor";

// import { fetchExpense } from "@/services/expenseServices";

// export default function AddNewSplit() {
//     const router = useRouter();

//     const [cookies, setCookie] = useCookies(['token']);

//     const [expense, setExpense] = useState({});
//     const [split, setSplit] = useState([]);

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         console.log(JSON.stringify(split))
//         let n = split.length

//         try {
//             e.preventDefault()
//             const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/split", {
//                 expenseId: router?.query?.expenseId,
//                 split: split
//             }, {
//                 headers: {
//                     'Authorization': `Bearer ${cookies.token}`,
//                     'type': 'application/json'
//                 },
//             })
//             console.log(response)
//             if (response.status === 200) {
//                 console.log("Success")
//                 router.push('/')
//             }
//         }
//         catch (err) {
//             console.log(err)
//             alert(err?.message)
//         }
//     }

//     useEffect(() => {
//         fetchExpense(cookies.token, router?.query?.expenseId).then((data) => {
//             setExpense(data)
//         })
//         setSplit([
//             {
//                 email: "alapanoski",
//                 percentage: 100
//             }])
//     }, [router.query.id])

//     return (
//         <DashboardLayout>
//             <div className="h-full w-full flex items-center justify-center">
//                 <SplitEditor expenseId="02c5685c-eaef-40e5-bf12-b7d6dfe16c88" split={split} setSplit={setSplit} submitText={"Create"} handleSubmit={handleSubmit} />
//             </div>
//         </DashboardLayout>
//     )
// }

export default function AddNewSplit() {
  return (
    <div>
      <h1>Split</h1>
    </div>
  );
}

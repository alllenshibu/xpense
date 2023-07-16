import React, { useState, useEffect } from "react"

import axios from "axios"

export default function SplitEditor({ expenseId, split, setSplit, submitText, handleSubmit }) {

    const [newSplitPayer, setNewSplitPayer] = useState("")

    const addNewSplitPayer = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/${newSplitPayer}`)
        console.log(response)
        if (response.status !== 200 || response.data.length === 0) {
            alert("User not found")
        }
        if (split.find(payer => payer.username === newSplitPayer)) {
            alert("User already added")
        } else {
            setSplit([...split, { username: newSplitPayer, percentage: 100 }])
        }
        setNewSplitPayer("")
    }

    return (
        <div className="w-full">
            <form
                className="w-full md:w-2/5 flex flex-col gap-4"
                onChange={(e) => {
                    e.preventDefault()
                    setSplit({ ...split, [e.target.name]: e.target.value })
                }}
            >
                <div>
                    <label htmlFor="title">Expense Id</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={expenseId}
                        disabled="true"
                    />
                </div>
                <label>Split Payers</label>
                {split.map((payer, index) => {
                    return (
                        <div key={index} className="flex flex-row justify-between items-center">
                            <div className="flex flex-row">
                                <p>{payer.username}</p>
                                <p>{payer.percentage}</p>
                            </div>
                            <div className="flex flex-row">
                                <button className="px-4 py-1 rounded-md font-semibold bg-black text-white">Edit</button>
                                <button className="px-4 py-1 rounded-md font-semibold bg-red-500 text-white">Delete</button>
                            </div>
                        </div>
                    )
                })}
                <button
                    onClick={handleSubmit}
                    type="submit"
                    className="w-auto btn btn-primary"
                >
                    {submitText ? submitText : "Submit"}
                </button>
            </form>



            <div className="flex flex-row justify-between">
                <label htmlFor="title">Split Payers</label>
                <input
                    onChange={(e) => {
                        e.preventDefault()
                        setNewSplitPayer(e.target.value)
                    }}
                    id="newSplitPayer"
                    name="newSplitPayer"
                    type="text"
                    value={newSplitPayer}
                />

                <button
                    onClick={addNewSplitPayer}
                    className="btn btn-primary">Add</button>
            </div>
        </div >
    )

}
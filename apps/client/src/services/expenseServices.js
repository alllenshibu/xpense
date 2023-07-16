import axios from "axios"

export const fetchExpense = async (token, expenseId) => {
    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/expense/" + expenseId, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'type': 'application/json'
            },
        })
        console.log(response)
        if (response.status === 200) {
            return response.data
        }
    } catch (err) {
        console.log(err)
    }
}


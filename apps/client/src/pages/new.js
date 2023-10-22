
import { useRouter } from 'next/router'
import Expense from "@/components/Expense";
export default function Page() {
  const router = useRouter()
 
  return (
    <button type="button" onClick={() => router.push('/expense')}>
      EXPENSE
    </button>
  )
}

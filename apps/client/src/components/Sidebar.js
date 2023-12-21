import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();

  return (
    <div>
      <div className="py-4 flex justify-center">
        <h1 className="text-5xl font-bold tracking-wide">Xpense</h1>
      </div>
      <div className="p-4 h-full text-xl flex flex-col justify-start text-neutral-500">
        <Link href="/" className={'p-2 hover:text-neutral-900'}>
          Dashboard
        </Link>
        <Link href="/expense" className={'p-2 hover:text-neutral-900'}>
          Expenses
        </Link>
        <Link href="/income" className={'p-2 hover:text-neutral-900'}>
          Incomes
        </Link>
        <Link href="/category" className="p-2 hover:text-neutral-900">
          Categories
        </Link>
        <Link href="/paymentoption" className="p-2 hover:text-neutral-900">
          Payment Options
        </Link>
        <button
          onClick={() => {
            localStorage.removeItem(process.env.NEXT_PUBLIC_AUTH_TOKEN);
            router.push('/login');
          }}
          className="p-2 text-left hover:text-neutral-900"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

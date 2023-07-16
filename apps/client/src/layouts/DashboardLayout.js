import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }) {
    return (
        <div className="h-full w-full">
            <Navbar />
            <div className="w-full flex flex-row">
                <Sidebar />
                <div className="h-full w-full">{children}</div>
            </div>
        </div>
    )
}
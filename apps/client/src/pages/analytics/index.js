import PieChart from "@/components/PieChart";
import StackedBarChart from "@/components/StackedBarChart";
import DashboardLayout from "@/layouts/DashboardLayout";

export default function first(second) {

    return (
      <DashboardLayout>
        <StackedBarChart />
        <PieChart/>
      </DashboardLayout>
    );
}
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import SalesChart from "../components/SalesChart";
import RecentOrders from "../components/RecentOrders";
import LowStockPanel from "../components/LowStockPanel";
import API from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStock: 0,
    totalStock: 0,
    inventoryValue: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/products/stats");

      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex">
      <Sidebar />

      <div className="flex-1 ml-64">
        <Navbar />

        <div className="p-8">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <StatCard
              title="Products"
              value={stats.totalProducts}
              color="bg-blue-500"
            />

            <StatCard
              title="Low Stock"
              value={stats.lowStock}
              color="bg-red-500"
            />

            <StatCard
              title="Stock Qty"
              value={stats.totalStock}
              color="bg-green-500"
            />

            <StatCard
              title="Inventory Value"
              value={`₹${stats.inventoryValue}`}
              color="bg-purple-500"
            />

          </div>

          <div className="mt-8">
            <SalesChart />
          </div>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
  <RecentOrders />
  <LowStockPanel />
</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
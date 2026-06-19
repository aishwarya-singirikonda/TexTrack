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

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-800">
              Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Welcome to TexTrack Inventory Management
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <StatCard
              title="Total Products"
              value={stats.totalProducts}
              color="bg-blue-500"
            />

            <StatCard
              title="Low Stock"
              value={stats.lowStock}
              color="bg-red-500"
            />

            <StatCard
              title="Stock Quantity"
              value={stats.totalStock}
              color="bg-green-500"
            />

            <StatCard
              title="Inventory Value"
              value={`₹${stats.inventoryValue}`}
              color="bg-purple-500"
            />

          </div>

          {/* Charts */}
          <div className="mt-10">
            <SalesChart />
          </div>

          {/* Recent Orders + Low Stock */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">

            <RecentOrders />

            <LowStockPanel />

          </div>

          {/* Summary Section */}
          <div className="mt-10 bg-white rounded-2xl shadow p-8">

            <h2 className="text-2xl font-bold mb-6">
              Inventory Summary
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-blue-700">
                  Products
                </h3>

                <h1 className="text-4xl font-bold mt-4">
                  {stats.totalProducts}
                </h1>
              </div>

              <div className="bg-red-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-red-700">
                  Low Stock Items
                </h3>

                <h1 className="text-4xl font-bold mt-4">
                  {stats.lowStock}
                </h1>
              </div>

              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-700">
                  Inventory Worth
                </h3>

                <h1 className="text-4xl font-bold mt-4">
                  ₹{stats.inventoryValue}
                </h1>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
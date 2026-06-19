import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Reports() {
  const [report, setReport] = useState({
    totalOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    const res = await API.get("/orders/report");

    setReport(res.data);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 ml-64">

        <Navbar />

        <div className="p-8">

          <h1 className="text-3xl font-bold mb-8">
            Sales Reports
          </h1>

          <div className="grid grid-cols-2 gap-6">

            <div className="bg-green-500 text-white p-8 rounded-xl">
              <h2 className="text-xl">
                Total Revenue
              </h2>

              <h1 className="text-4xl font-bold mt-4">
                ₹{report.totalRevenue}
              </h1>
            </div>

            <div className="bg-blue-500 text-white p-8 rounded-xl">
              <h2 className="text-xl">
                Total Orders
              </h2>

              <h1 className="text-4xl font-bold mt-4">
                {report.totalOrders}
              </h1>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Reports;
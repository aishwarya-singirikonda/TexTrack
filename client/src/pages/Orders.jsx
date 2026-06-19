import { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await API.get("/orders");
    setOrders(res.data);
  };

  const updateStatus = async (id, status) => {
    await API.put(`/orders/${id}`, {
      status,
    });

    fetchOrders();
  };

  const exportCSV = () => {
    const csv =
      "Customer,Product,Quantity,Total,Status\n" +
      orders
        .map(
          (order) =>
            `${order.customer},${order.items[0]?.productName},${order.items[0]?.quantity},${order.totalAmount},${order.status}`
        )
        .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    saveAs(blob, "orders.csv");
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 ml-64">
        <Navbar />

        <div className="p-8">

          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">
              Orders Management
            </h1>

            <button
              onClick={exportCSV}
              className="bg-green-600 text-white px-6 py-3 rounded"
            >
              Export CSV
            </button>
          </div>

          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="p-4">Customer</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Update</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b text-center"
                  >
                    <td className="p-4">{order.customer}</td>

                    <td>
                      {order.items[0]?.productName}
                    </td>

                    <td>
                      {order.items[0]?.quantity}
                    </td>

                    <td>
                      ₹{order.totalAmount}
                    </td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded text-white ${
                          order.status === "Completed"
                            ? "bg-green-500"
                            : order.status === "Cancelled"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td>
                      <select
                        className="border rounded p-2"
                        value={order.status}
                        onChange={(e) =>
                          updateStatus(
                            order._id,
                            e.target.value
                          )
                        }
                      >
                        <option>Pending</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Orders;
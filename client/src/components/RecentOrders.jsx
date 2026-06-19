import { useEffect, useState } from "react";
import API from "../services/api";

function RecentOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await API.get("/orders/recent");
    setOrders(res.data);
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Recent Orders
      </h2>

      <div className="space-y-4">

        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-xl p-4"
          >
            <h3 className="font-bold">
              {order.customer}
            </h3>

            <p className="text-gray-500">
              {order.items[0].productName}
            </p>

            <p className="text-green-600 font-bold">
              ₹{order.totalAmount}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}

export default RecentOrders;
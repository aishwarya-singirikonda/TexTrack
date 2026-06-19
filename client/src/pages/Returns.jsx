import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Returns() {
  const [returns, setReturns] = useState([]);

  const [formData, setFormData] = useState({
    customer: "",
    productName: "",
    quantity: "",
    reason: "",
  });

  useEffect(() => {
    fetchReturns();
  }, []);

  const fetchReturns = async () => {
    const res = await API.get("/returns");

    setReturns(res.data);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/returns", {
      ...formData,
      quantity: Number(formData.quantity),
    });

    setFormData({
      customer: "",
      productName: "",
      quantity: "",
      reason: "",
    });

    fetchReturns();
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 ml-64">
        <Navbar />

        <div className="p-8">
          <h1 className="text-3xl font-bold mb-8">
            Returns Management
          </h1>

          <form
            className="bg-white p-6 rounded-xl shadow mb-8"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-2 gap-4">
              <input
                className="border p-3 rounded"
                name="customer"
                placeholder="Customer"
                value={formData.customer}
                onChange={handleChange}
              />

              <input
                className="border p-3 rounded"
                name="productName"
                placeholder="Product"
                value={formData.productName}
                onChange={handleChange}
              />

              <input
                className="border p-3 rounded"
                name="quantity"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={handleChange}
              />

              <input
                className="border p-3 rounded"
                name="reason"
                placeholder="Reason"
                value={formData.reason}
                onChange={handleChange}
              />
            </div>

            <button className="bg-blue-600 text-white px-6 py-3 rounded mt-6">
              Return Product
            </button>
          </form>

          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="p-4">Customer</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Reason</th>
                </tr>
              </thead>

              <tbody>
                {returns.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b text-center"
                  >
                    <td className="p-4">{item.customer}</td>
                    <td>{item.productName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.reason}</td>
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

export default Returns;
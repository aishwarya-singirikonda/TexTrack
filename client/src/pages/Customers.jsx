import { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await API.get("/customers");
      setCustomers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await API.put(`/customers/${editingId}`, formData);
        setEditingId(null);
      } else {
        await API.post("/customers", formData);
      }

      setFormData({
        name: "",
        phone: "",
        address: "",
      });

      fetchCustomers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (customer) => {
    setEditingId(customer._id);

    setFormData({
      name: customer.name,
      phone: customer.phone,
      address: customer.address,
    });
  };

  const handleDelete = async (id) => {
    await API.delete(`/customers/${id}`);
    fetchCustomers();
  };

  const exportCSV = () => {
    const csv =
      "Name,Phone,Address\n" +
      customers
        .map(
          (customer) =>
            `${customer.name},${customer.phone},${customer.address}`
        )
        .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    saveAs(blob, "customers.csv");
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 ml-64">
        <Navbar />

        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">
              Customers
            </h1>

            <button
              onClick={exportCSV}
              className="bg-green-600 text-white px-6 py-3 rounded"
            >
              Export CSV
            </button>
          </div>

          <input
            type="text"
            placeholder="Search Customer..."
            className="w-full border p-3 rounded mb-6"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow mb-8"
          >
            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Customer Name"
                value={formData.name}
                onChange={handleChange}
                className="border p-3 rounded"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="border p-3 rounded"
              />

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="border p-3 rounded"
              />
            </div>

            <button className="bg-blue-600 text-white px-6 py-3 rounded mt-6">
              {editingId ? "Update Customer" : "Add Customer"}
            </button>
          </form>

          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="p-4">Name</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer._id} className="border-b text-center">
                    <td className="p-4">{customer.name}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.address}</td>

                    <td className="space-x-2">
                      <button
                        onClick={() => handleEdit(customer)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(customer._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>
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

export default Customers;
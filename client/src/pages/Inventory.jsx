import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Inventory() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 ml-64">
        <Navbar />

        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">
            Inventory Management
          </h1>

          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="p-4">Product</th>
                  <th>Stock</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b text-center"
                  >
                    <td className="p-4">{product.name}</td>

                    <td>{product.stock}</td>

                    <td>
                      {product.stock <= 5 ? (
                        <span className="bg-red-500 text-white px-3 py-1 rounded">
                          Low Stock
                        </span>
                      ) : (
                        <span className="bg-green-500 text-white px-3 py-1 rounded">
                          In Stock
                        </span>
                      )}
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

export default Inventory;
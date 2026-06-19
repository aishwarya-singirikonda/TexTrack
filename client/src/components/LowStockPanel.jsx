import { useEffect, useState } from "react";
import API from "../services/api";

function LowStockPanel() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await API.get("/products");

    setProducts(
      res.data.filter((product) => product.stock <= 5)
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Low Stock Products
      </h2>

      <div className="space-y-4">

        {products.map((product) => (
          <div
            key={product._id}
            className="flex justify-between border rounded-xl p-4"
          >
            <span>{product.name}</span>

            <span className="text-red-500 font-bold">
              {product.stock}
            </span>
          </div>
        ))}

      </div>

    </div>
  );
}

export default LowStockPanel;
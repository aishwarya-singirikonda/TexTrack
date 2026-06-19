import { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    size: "",
    color: "",
    image: null,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });

      setPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    data.append("size", formData.size);
    data.append("color", formData.color);

    if (formData.image) {
      data.append("image", formData.image);
    }

    if (editingId) {
      await API.put(`/products/${editingId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setEditingId(null);
    } else {
      await API.post("/products", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }

    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
      size: "",
      color: "",
      image: null,
    });

    setPreview("");

    fetchProducts();
  };

  const handleEdit = (product) => {
    setEditingId(product._id);

    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      size: product.size,
      color: product.color,
      image: null,
    });

    setPreview(product.image);
  };

  const handleDelete = async (id) => {
    await API.delete(`/products/${id}`);
    fetchProducts();
  };

  const exportCSV = () => {
    const csv =
      "Name,Category,Price,Stock,Size,Color\n" +
      products
        .map(
          (p) =>
            `${p.name},${p.category},${p.price},${p.stock},${p.size},${p.color}`
        )
        .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    saveAs(blob, "products.csv");
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 ml-64">
        <Navbar />

        <div className="p-8">
          <div className="flex justify-between mb-6">
            <h1 className="text-3xl font-bold">
              Products
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
            placeholder="Search Product..."
            className="w-full border p-3 rounded mb-6"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <form
            className="bg-white p-6 rounded-xl shadow mb-8"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-2 gap-4">
                            <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Product Name"
                className="border p-3 rounded"
              />

              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                className="border p-3 rounded"
              />

              <input
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className="border p-3 rounded"
              />

              <input
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Stock"
                className="border p-3 rounded"
              />

              <input
                name="size"
                value={formData.size}
                onChange={handleChange}
                placeholder="Size"
                className="border p-3 rounded"
              />

              <input
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="Color"
                className="border p-3 rounded"
              />

              <input
                type="file"
                name="image"
                accept="image/*"
                capture="environment"
                onChange={handleChange}
                className="border p-3 rounded col-span-2"
              />
            </div>

            {preview && (
              <img
                src={preview}
                alt=""
                className="h-40 w-40 object-cover rounded mt-4"
              />
            )}

            <button className="bg-blue-600 text-white px-6 py-3 rounded mt-6">
              {editingId ? "Update Product" : "Add Product"}
            </button>
          </form>

          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="p-4">Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="border-b text-center">

                    <td className="p-3">
                      {product.image && (
                        <img
                          src={product.image}
                          alt=""
                          className="h-16 w-16 object-cover rounded mx-auto"
                        />
                      )}
                    </td>

                    <td>{product.name}</td>

                    <td>{product.category}</td>

                    <td>₹{product.price}</td>

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

                    <td className="space-x-2">
                      <button
                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                        onClick={() => handleEdit(product)}
                      >
                        Edit
                      </button>

                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => handleDelete(product._id)}
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

export default Products;
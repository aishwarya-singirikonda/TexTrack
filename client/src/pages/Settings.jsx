import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Settings() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 ml-64">
        <Navbar />

        <div className="p-8">
          <h1 className="text-3xl font-bold mb-8">
            Settings
          </h1>

          <div className="bg-white p-8 rounded-xl shadow space-y-6">

            <div>
              <label className="font-semibold">
                Shop Name
              </label>

              <input
                className="w-full border p-3 rounded mt-2"
                defaultValue="SN Textiles"
              />
            </div>

            <div>
              <label className="font-semibold">
                Owner Name
              </label>

              <input
                className="w-full border p-3 rounded mt-2"
                defaultValue="Admin"
              />
            </div>

            <div>
              <label className="font-semibold">
                Phone Number
              </label>

              <input
                className="w-full border p-3 rounded mt-2"
              />
            </div>

            <div>
              <label className="font-semibold">
                Address
              </label>

              <textarea
                className="w-full border p-3 rounded mt-2"
              />
            </div>

            <button className="bg-blue-600 text-white px-6 py-3 rounded">
              Save Settings
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Profile() {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 ml-64">
        <Navbar />

        <div className="p-8">

          <h1 className="text-3xl font-bold mb-8">
            Admin Profile
          </h1>

          <div className="bg-white p-8 rounded-xl shadow">

            <div className="space-y-6">

              <div>
                <label className="font-bold">
                  Name
                </label>

                <input
                  className="w-full border p-3 rounded mt-2"
                  value={user?.name}
                  readOnly
                />
              </div>

              <div>
                <label className="font-bold">
                  Email
                </label>

                <input
                  className="w-full border p-3 rounded mt-2"
                  value={user?.email}
                  readOnly
                />
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;
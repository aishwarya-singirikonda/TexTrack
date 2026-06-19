function Navbar() {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div className="bg-white shadow-md px-8 py-5 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          TexTrack ERP
        </h1>
      </div>

      <div className="text-right">
        <h2 className="font-bold text-lg">
          {user?.name}
        </h2>

        <p className="text-gray-500">
          {user?.role}
        </p>
      </div>
    </div>
  );
}

export default Navbar;
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaWarehouse,
  FaUndo,
  FaChartBar,
  FaUser,
  FaCog,
} from "react-icons/fa";

function Sidebar() {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("userInfo"));

  let menuItems = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <FaHome />,
    },
    {
      path: "/products",
      name: "Products",
      icon: <FaBoxOpen />,
    },
    {
      path: "/orders",
      name: "Orders",
      icon: <FaShoppingCart />,
    },
    {
      path: "/customers",
      name: "Customers",
      icon: <FaUsers />,
    },
    {
      path: "/inventory",
      name: "Inventory",
      icon: <FaWarehouse />,
    },
  ];

  if (user?.role === "Admin") {
    menuItems.push(
      {
        path: "/returns",
        name: "Returns",
        icon: <FaUndo />,
      },
      {
        path: "/reports",
        name: "Reports",
        icon: <FaChartBar />,
      },
      {
        path: "/profile",
        name: "Profile",
        icon: <FaUser />,
      },
      {
        path: "/settings",
        name: "Settings",
        icon: <FaCog />,
      }
    );
  }

  return (
    <div className="w-64 h-screen bg-slate-900 text-white fixed overflow-y-auto">
      <div className="p-6 text-3xl font-bold border-b border-slate-700">
        TexTrack
      </div>

      <div className="mt-6 flex flex-col gap-2 px-3">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-4 px-4 py-3 rounded-lg transition ${
              location.pathname === item.path
                ? "bg-blue-600"
                : "hover:bg-slate-800"
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
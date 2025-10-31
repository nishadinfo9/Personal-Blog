import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { deleteUser } from "../../redux/authSlice/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.auth?.userData);

  const navItem = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Blog", path: "/blog" },
    { id: 3, name: "Create", path: "/create" },
  ];

  const onLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/v1/auth/logout",
        {},
        { withCredentials: true }
      );

      dispatch(deleteUser());
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-white">
              Writers
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex space-x-4">
            {navItem.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  `text-white hover:text-green-400 transition-colors duration-200 font-medium ${
                    isActive ? "border-b-2 border-green-400" : ""
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to={"/profile"}>
                  <img
                    src={user.avatar || "/vite.svg"}
                    alt={user.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </Link>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 cursor-pointer bg-green-500 hover:bg-green-600 text-white rounded-md"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

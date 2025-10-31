import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser } from "../../redux/authSlice/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userData);

  const navItem = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Blog", path: "/blog" },
    { id: 3, name: "Create Post", path: "/create" },
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
              MyBlog
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex space-x-4">
            {navItem.map((item) => (
              <Link key={item.id} to={item.path} className="text-white">
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User / Logout */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-white">Hello, {user.username}</span>
                <button onClick={onLogout} className="btn btn-error">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-success">
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

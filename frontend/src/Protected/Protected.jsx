import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUser } from "../redux/authSlice/authSlice";

const Protected = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentUserFetch = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/auth/current-user",
        { withCredentials: true }
      );

      setUser(res.data.data);
      setLoading(false);
      dispatch(createUser(res.data.data));
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    currentUserFetch();
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  if (loading)
    return <span className="loading loading-spinner loading-xl"></span>; // ✅ wait for fetch to finish

  return <>{children}</>;
};

export default Protected;

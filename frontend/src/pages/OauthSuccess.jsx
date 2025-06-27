import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setUser } from "../redux/slices/authSlice";

const OauthSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoogleUser = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/iq/auth/me`, {
          withCredentials: true,
        });

        dispatch(setUser(data));
        navigate("/dashboard");
      } catch (err) {
        console.error("Failed to fetch user from cookie token", err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchGoogleUser();
  }, [dispatch, navigate]);

  return <p>{loading ? "Redirecting..." : "Redirecting..."}</p>;
};

export default OauthSuccess;

import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
const axiosSecure = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});
const UseAxiosSecure = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        console.log("inside interceptors", error.response);
        if (error.response?.status === 401 || error.response?.status === 403) {
          logOut().then(() => {
            navigate("/login");
          });
        }
      }
    );
  }, [logOut, navigate]);
  return axiosSecure;
};

export default UseAxiosSecure;

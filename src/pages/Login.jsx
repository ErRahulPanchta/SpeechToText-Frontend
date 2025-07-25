import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setdata] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: data
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem('accessToken', response.data.data.accesstoken);
        localStorage.setItem('refreshToken', response.data.data.refreshtoken);
        setdata({
          email: "",
          password: ""
        });
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-slate-700 p-8 rounded-2xl shadow-2xl text-white"
      >
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Login</h2>


        <div className="relative mb-6 group">
          <label htmlFor="email" className="absolute text-gray-300 text-base duration-300 transform scale-75 -translate-y-6 top-3 origin-[0] peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder=" "
            value={data.email}
            onChange={handleChange}
            className="peer w-full bg-transparent border-b-2 border-gray-400 text-white text-base px-0 py-1.5 focus:outline-none focus:border-cyan-400 mt-2.5 rounded"
          />

        </div>

        <div className="relative mb-6 group">
          <label htmlFor="password" className="absolute text-gray-300 text-base duration-300 transform scale-75 -translate-y-6 top-3 origin-[0] peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            required
            placeholder=" "
            value={data.password}
            onChange={handleChange}
            className="peer w-full bg-transparent border-b-2 border-gray-400 text-white text-base px-0 py-1.5 focus:outline-none focus:border-cyan-400 mt-2.5 rounded"
          />

        </div>


        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-3 rounded-xl text-lg transition-all duration-300"
          >
            Login
          </button>
        </div>

        <p className="text-sm text-gray-300 text-center mt-4">
          or create a new account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-cyan-400 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </form>

      <Toaster position="top-right" />
    </div>
  );
};

export default Login;

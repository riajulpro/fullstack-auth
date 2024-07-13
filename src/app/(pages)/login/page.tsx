"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [disableBtn, setDisableBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/login", user);
      Cookies.set("accessToken", response.data.token);

      toast.success("User successfully logged in");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login error: ", error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, [user]);

  return (
    <div className="flex justify-center items-center lg:h-[calc(100vh-65px)]">
      <div className="max-w-md mx-auto border rounded-md p-5">
        <h1 className="text-2xl font-bold mb-5">
          {loading ? "Processing" : "Login"}
        </h1>
        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input
            className="py-2 px-2 border rounded-md w-full"
            id="email"
            type="text"
            placeholder="Enter email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            className="py-2 px-2 border rounded-md w-full"
            id="password"
            type="password"
            placeholder="Enter password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <div>
          <button
            className="py-2 px-3 w-full text-white disabled:bg-green-100 dark:disabled:bg-slate-950 dark:disabled:text-slate-800 bg-green-500 dark:bg-slate-700 dark:hover:bg-slate-500 rounded"
            disabled={disableBtn}
            onClick={handleLogin}
          >
            {disableBtn ? "Fill the information" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SignUp = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [disableBtn, setDisableBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/signup", user);
      console.log("User data", response);

      toast.success("User successfully created!");
      router.push("/login");
    } catch (error: any) {
      console.log("Sign up error: ", error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, [user]);

  return (
    <div className="flex justify-center items-center lg:h-[calc(100vh-65px)]">
      <div className="max-w-md mx-auto border rounded-md p-5">
        <h1 className="text-2xl font-bold mb-5">
          {loading ? "Processing" : "Sign up"}
        </h1>
        <div className="mb-3">
          <label htmlFor="username">Username</label>
          <input
            className="py-2 px-2 border rounded-md w-full"
            type="text"
            placeholder="Enter username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>
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
            className="py-2 px-3 w-full text-white disabled:bg-green-100 dark:disabled:bg-slate-900 bg-green-500 dark:bg-slate-700 rounded"
            disabled={disableBtn}
            onClick={handleSignUp}
          >
            {disableBtn ? "Fill the information" : "Sing up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

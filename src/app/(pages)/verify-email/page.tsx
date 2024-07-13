"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const VerifyEmail = ({ searchParams }: { searchParams: { token: string } }) => {
  const [error, setError] = useState("");
  const router = useRouter();

  const verifyToken = async () => {
    try {
      const { data } = await axios.post("/api/users/verifyemail", {
        token: searchParams.token,
      });
      toast.success("Your account successfully verified!");
      router.push("/login");
    } catch (error: any) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center lg:h-[calc(100vh-65px)]">
      <div className="max-w-md mx-auto border rounded-md p-5">
        <h1 className="text-2xl font-bold mb-5 line-clamp-1">
          Verify your account
        </h1>
        <p className="mb-3 text-sm text-center">{error && error}</p>
        <div>
          <button
            className="py-2 px-3 w-full text-white disabled:bg-green-100 dark:disabled:bg-slate-950 dark:disabled:text-slate-800 bg-green-500 dark:bg-slate-700 dark:hover:bg-slate-500 rounded"
            onClick={verifyToken}
            disabled={!searchParams.token ? true : false}
          >
            Verify now
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;

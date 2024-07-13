"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface User {
  username: string;
  email: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getMe = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3000/api/users/me");
        const result = await res.json();

        setUser(result.data);
        setLoading(false);
      } catch (error) {
        console.log("ERROR", (error as Error).message);
        setLoading(false);
        return null;
      }
    };

    getMe();
  }, []);

  const logOut = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/users/logout");
      await res.json();

      Cookies.remove("accessToken");

      router.push("/");
    } catch (error) {
      console.log("ERROR", (error as Error).message);
      setLoading(false);
      return null;
    }
  };

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <div className="max-w-md mx-auto my-5 border bg-white dark:bg-slate-800 rounded-md p-5">
      <h1 className="border-b border-gray-100 dark:border-black text-xl font-bold pb-2 mb-2">
        Profile
      </h1>
      <p>Name: {user?.username}</p>
      <p className="mb-5">Email: {user?.email}</p>
      <Button onClick={logOut}>Log out</Button>
    </div>
  );
};

export default ProfilePage;

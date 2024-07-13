import Link from "next/link";
import { ModeToggle } from "../client/Theme/ModeSwitcher";
import { cookies } from "next/headers";

const Header = () => {
  const cookie = cookies();
  const token = cookie.has("token");

  return (
    <header className="bg-gray-50 dark:bg-slate-800 border-b py-3">
      <div className="flex justify-between items-center gap-5 max-w-7xl mx-auto">
        <h1 className="text-lg font-extrabold hover:tracking-wider duration-150 cursor-pointer hover:scale-105">
          <Link href="/">AuthJS</Link>
        </h1>
        <div className="ml-auto flex gap-5 items-center">
          {token ? (
            <Link href="/profile">Profile</Link>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/signup">Sign Up</Link>
            </>
          )}
        </div>
        <div>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;

import Link from "next/link";
import { Users, Shield, Key } from "lucide-react";

export function Navbar() {
  return (
    <div className="w-full flex justify-center  p-1 bg-black text-white">
      <Link
        href="/"
        className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-300"
      >
        <Users className="inline-block mr-2" size={14} />
        Users
      </Link>
      <Link
        href="/roles"
        className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-300"
      >
        <Shield className="inline-block mr-2" size={14} />
        Roles
      </Link>
      <Link
        href="/permissions"
        className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-300"
      >
        <Key className="inline-block mr-2" size={14} />
        Permissions
      </Link>
    </div>
  );
}

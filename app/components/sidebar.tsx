import Link from "next/link";
import { Users, Shield, Key } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4 hidden lg:block">
      <nav className="space-y-2">
        <Link
          href="/"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
          <Users className="inline-block mr-2" size={20} />
          Users
        </Link>
        <Link
          href="/roles"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
          <Shield className="inline-block mr-2" size={20} />
          Roles
        </Link>
        <Link
          href="/permissions"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
          <Key className="inline-block mr-2" size={20} />
          Permissions
        </Link>
      </nav>
    </aside>
  );
}

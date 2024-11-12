import { Search, Bell } from "lucide-react";
import Logo from "/public/logo-vendeyaonline.webp";
import Image from "next/image";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-6">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search or type a command"
              className="pl-10 pr-4 py-2 bg-gray-50 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Bell size={20} className="text-gray-600" />
          <Image
            width={50}
            height={50}
            src={Logo}
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
    </header>
  );
}

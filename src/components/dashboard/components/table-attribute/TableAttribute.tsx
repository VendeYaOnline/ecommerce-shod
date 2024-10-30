import { ArrowUpDown, MoreHorizontal } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Offline" | "Away";
}

const users: User[] = [
  {
    id: 1,
    name: "Alex Thompson",
    email: "alex@example.com",
    role: "Developer",
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Chen",
    email: "sarah@example.com",
    role: "Designer",
    status: "Away",
  },
  {
    id: 3,
    name: "Michael Park",
    email: "michael@example.com",
    role: "Manager",
    status: "Active",
  },
  {
    id: 4,
    name: "Emma Wilson",
    email: "emma@example.com",
    role: "Developer",
    status: "Offline",
  },
  {
    id: 5,
    name: "James Rodriguez",
    email: "james@example.com",
    role: "Designer",
    status: "Active",
  },
];

const headers = ["Nombre del atributo", "Tipo", "Valores"];

const TableAttribute = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto">
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Atributos</h2>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-t border-gray-200 bg-gray-50/50">
                  {headers.map((header, index) => (
                    <th key={index} className="px-6 py-3 text-left">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                        {header}
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                  ))}

                  <th className="px-6 py-3 text-right">
                    <span className="text-sm font-medium text-gray-500">
                      Acciones
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="group hover:bg-gray-50/50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white font-medium">
                          {user.name.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-900">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-600">{user.email}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-600">{user.role}</span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button className="rounded-md p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100">
                        <MoreHorizontal className="h-4 w-4 text-gray-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-gray-200 px-6 py-4">
            <p className="text-sm text-gray-500">
              Showing {users.length} team members
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableAttribute;

import { useQueryAttribute } from "@/api/queries";
import { ArrowUpDown, MoreHorizontal, PenLine, Trash2 } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Offline" | "Away";
}

const headers = ["Nombre del atributo", "Tipo", "Valores"];

const TableAttribute = () => {
  const { data } = useQueryAttribute();
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
            {data?.length ? (
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
                  {data.map((attribute) => (
                    <tr
                      key={attribute.id}
                      className="group hover:bg-gray-50/50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-gray-900">
                            {attribute.attribute_name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-600">
                          {attribute.attribute_type}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        {attribute.value.map((item, index) => (
                          <div
                            key={index}
                            style={{ backgroundColor: item.color }}
                            className={`rounded-full w-4 h-4`}
                          />
                        ))}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-3">
                          <PenLine size={17}/>
                          <Trash2 size={17}/>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="px-6 h-10">
                <h1 className="text-slate-400">No hay atributos</h1>
              </div>
            )}
          </div>
          <div className="border-t border-gray-200 px-6 py-4">
            <p className="text-sm text-gray-500">
              Mostrando {data ? data.length : 0} atributos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableAttribute;

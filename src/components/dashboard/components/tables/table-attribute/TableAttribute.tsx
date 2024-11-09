import { useQueryAttribute } from "@/api/queries";
import { PenLine, Trash2 } from "lucide-react";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { AttributeData } from "@/interfaces";
import TableSkeleton from "../../skeleton/Skeleton";
import { ModalDeleteAttribute } from "../../modals";

const headers = ["Nombre del atributo", "Tipo", "Valores"];
interface Props {
  selectedItem: MutableRefObject<AttributeData | undefined>;
  setActiveModal: Dispatch<SetStateAction<boolean>>;
}

const TableAttribute = ({ selectedItem, setActiveModal }: Props) => {
  const { data, isLoading } = useQueryAttribute();
  const [currentPage, setCurrentPage] = useState(1);
  const [active, setActive] = useState(false);
  const idElement = useRef(0);
  const itemsPerPage = 10;

  // * Lógica para obtener los elementos a mostrar en la tabla según la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data
    ? data.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  // * Lógica para cambiar de página
  const handleNextPage = () => {
    if (currentPage < Math.ceil((data?.length || 0) / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onClose = () => {
    setActive(false);
  };

  const onOpen = (id: number) => {
    setActive(true);
    idElement.current = id;
  };

  const openModal = (attribute: AttributeData) => {
    setActiveModal(true);
    selectedItem.current = attribute;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ModalDeleteAttribute
        active={active}
        onClose={onClose}
        idElement={idElement.current}
      />
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
                        <div className="flex items-center gap-2 font-medium text-gray-500">
                          {header}
                          {/*   <ArrowUpDown className="h-4 w-4" /> */}
                        </div>
                      </th>
                    ))}
                    <th className="px-6 py-3 text-right">
                      <span className="font-medium text-gray-500">
                        Acciones
                      </span>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {currentItems.map((attribute) => (
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
                        {attribute.value.map((item: any, index) => {
                          if (typeof item === "string") {
                            return (
                              <div key={index} className="burble">
                                {item}
                              </div>
                            );
                          } else {
                            return (
                              <div
                                key={index}
                                style={{ backgroundColor: item.color }}
                                className={`rounded-full w-4 h-4`}
                              />
                            );
                          }
                        })}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-3">
                          <PenLine
                            size={17}
                            color="#3D5300"
                            className="cursor-pointer"
                            onClick={() => openModal(attribute)}
                          />
                          <Trash2
                            size={17}
                            color="#FA4032"
                            className="cursor-pointer"
                            onClick={() => onOpen(attribute.id)}
                          />
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
            {isLoading && <TableSkeleton />}
            <p className="text-sm text-gray-500">
              Mostrando {currentItems.length} de {data ? data.length : 0}{" "}
              atributos
            </p>
          </div>
        </div>

        <nav className="flex items-center justify-center space-x-2 mt-4">
          <button
            className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Anterior
          </button>

          {Array.from(
            { length: Math.ceil((data?.length || 0) / itemsPerPage) },
            (_, index) => (
              <button
                key={index}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === index + 1
                    ? "text-white bg-indigo-600"
                    : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            )
          )}

          <button
            className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none"
            onClick={handleNextPage}
            disabled={
              currentPage === Math.ceil((data?.length || 0) / itemsPerPage)
            }
          >
            Siguiente
          </button>
        </nav>
      </div>
    </div>
  );
};

export default TableAttribute;

import { useQueryProducts } from "@/api/queries";
import { EllipsisVertical, PenLine, Trash2 } from "lucide-react";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { ProductTable } from "@/interfaces";
import TableSkeleton from "../../skeleton/Skeleton";
import Image from "next/image";
import ModalDeleteProduct from "../../modals/modal-delete-product/ModalDeleteProduct";

const headers = [
  "Imagen",
  "Titulo",
  "Pricio",
  "Atributos",
  "Descripcion",
  "Descunto",
  "Imagenes",
];
interface Props {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  selectedItem: MutableRefObject<ProductTable | undefined>;
  setActiveModal: Dispatch<SetStateAction<boolean>>;
}

const TableProducts = ({
  currentPage,
  setCurrentPage,
  selectedItem,
  setActiveModal,
}: Props) => {
  const { data, isLoading } = useQueryProducts(currentPage);

  const [active, setActive] = useState(false);
  const idElement = useRef(0);

  // * Lógica para cambiar de página
  const handleNextPage = () => {
    if (currentPage < (data?.totalPages || 1)) {
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

  const openModal = (product: ProductTable) => {
    setActiveModal(true);
    selectedItem.current = product;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ModalDeleteProduct
        setCurrentPage={setCurrentPage}
        totalItems={data?.total || 0}
        active={active}
        onClose={onClose}
        idElement={idElement.current}
      />
      <div className="mx-auto">
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Productos</h2>
            </div>
          </div>

          <div className="overflow-x-auto">
            {data && data?.products.length ? (
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
                  {data.products.sort().map((product) => (
                    <tr
                      key={product.id}
                      className="group hover:bg-gray-50/50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Image
                            src={product.image_product}
                            alt="Imagen del producto"
                            width={80}
                            height={80}
                            className="rounded-lg"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-600">{product.title}</span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-gray-600">{product.price}</span>
                      </td>
                      <td className="px-6 w-0 over">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex gap-2">
                            {product.attributes.Color.map(
                              (item, index: number) => (
                                <div
                                  key={index}
                                  style={{ backgroundColor: item.color }}
                                  className={`rounded-full w-4 h-4`}
                                />
                              )
                            )}
                          </div>

                          {/*        {product.attributes.Talla.map(
                            (item, index: number) => (
                              <div key={index} className="burble">
                                {item}
                              </div>
                            )
                          )} */}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-gray-600">
                          {product.description}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-gray-600">
                          {product.discount}%
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3 overflow-auto">
                          {product.images.length ? (
                            product.images.map(
                              (image: string, index: number) => (
                                <Image
                                  key={index}
                                  src={image}
                                  alt="Imagen del producto"
                                  width={50}
                                  height={50}
                                  className="rounded-lg"
                                />
                              )
                            )
                          ) : (
                            <span>Sin imagenes</span>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-3">
                          <PenLine
                            size={17}
                            color="#3D5300"
                            className="cursor-pointer"
                            onClick={() => openModal(product)}
                          />
                          <Trash2
                            size={17}
                            color="#FA4032"
                            className="cursor-pointer"
                            onClick={() => onOpen(product.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="px-6 h-10">
                <h1 className="text-slate-400">No hay productos</h1>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 px-6 py-4">
            {isLoading && <TableSkeleton />}
            <p className="text-sm text-gray-500">
              Mostrando {data?.products.length || 0} de {data?.total || 0}{" "}
              productos
            </p>
          </div>
        </div>
        {data && data.totalPages > 0 && (
          <nav className="flex items-center justify-center space-x-2 mt-4">
            <button
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Anterior
            </button>

            {Array.from({ length: data?.totalPages || 0 }, (_, index) => (
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
            ))}

            <button
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none"
              onClick={handleNextPage}
              disabled={currentPage === data.totalPages}
            >
              Siguiente
            </button>
          </nav>
        )}
      </div>
    </div>
  );
};

export default TableProducts;

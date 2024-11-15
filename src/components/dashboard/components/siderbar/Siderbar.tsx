import {
  FileText,
  Settings,
  Package,
  Mail,
  ShoppingCart,
  PencilRuler,
  Images,
} from "lucide-react";
import { SidebarLink } from "./SidebarLink";
import { Dispatch, SetStateAction } from "react";

interface Props {
  view: number;
  setView: Dispatch<SetStateAction<number>>;
}

export function Sidebar({ view, setView }: Props) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6">
      <div className="mb-8">
        <h1 className="text-xl font-bold">VendeYaOnline</h1>
      </div>

      <nav className="space-y-3">
        <p className="text-sm text-gray-500 mb-4">Menu</p>

        <SidebarLink
          selectItem={() => setView(1)}
          icon={<ShoppingCart size={20} />}
          text="Ventas efectuadas"
          active={view === 1}
        />
        <SidebarLink
          icon={<Package size={20} />}
          text="Productos"
          selectItem={() => setView(2)}
          active={view === 2}
        />
        <SidebarLink
          icon={<Mail size={20} />}
          text="Contacto"
          selectItem={() => setView(4)}
          active={view === 4}
        />
        <SidebarLink
          icon={<PencilRuler size={20} />}
          text="Atributos"
          selectItem={() => setView(3)}
          active={view === 3}
        />
        <SidebarLink
          icon={<FileText size={20} />}
          text="Banner"
          selectItem={() => setView(5)}
          active={view === 5}
        />

        <SidebarLink
          icon={<Images size={20} />}
          text="Galeria"
          selectItem={() => setView(6)}
          active={view === 6}
        />
      </nav>

      <div className="mt-auto pt-8 absolute bottom-5">
        <SidebarLink
          icon={<Settings size={20} />}
          text="Configuraciones"
          selectItem={() => setView(7)}
          active={view === 7}
        />
        {/*   <SidebarLink icon={<HelpCircle size={20} />} text="Help & Support" /> */}
      </div>
      {/*    <UpgradeCard /> */}
    </aside>
  );
}

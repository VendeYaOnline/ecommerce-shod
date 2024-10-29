interface SidebarLinkProps {
  selectItem: () => void;
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  badge?: string;
}

export function SidebarLink({
  icon,
  text,
  active,
  badge,
  selectItem,
}: SidebarLinkProps) {
  return (
    <span
      onClick={selectItem}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm cursor-pointer  ${
        active
          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
          : "text-gray-600 hover:bg-gray-50"
      }`}
    >
      {icon}
      <span>{text}</span>
      {badge && (
        <span className="ml-auto bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full text-xs">
          {badge}
        </span>
      )}
    </span>
  );
}

import ProductGrid from "@/components/ProductGrid";
import Sidebar from "@/components/Siderbar";
import React from "react";

const HombreZapatillas = () => {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <div className="flex">
        <Sidebar />
        <main className="flex w-full">
          <ProductGrid />
        </main>
      </div>
    </div>
  );
};

export default HombreZapatillas;

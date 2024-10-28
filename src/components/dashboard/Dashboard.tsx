"use client";

import { useState } from "react";
import { Header } from "./header/Header";
import { Sidebar } from "./siderbar/Siderbar";

function DashBoard() {
  const [view, setView] = useState(1);

  const typeView = (view: number) => {
    switch (view) {
      case 1:
        return <h1>1</h1>;

      case 2:
        return <h1>2</h1>;

      case 3:
        return <h1>3</h1>;

      case 4:
        return <h1>4</h1>;

      case 5:
        return <h1>5</h1>;
    }
  };
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar view={view} setView={setView} />
      <main className="flex-1 overflow-auto">
        <Header />
        <div className="p-8">{typeView(view)}</div>
      </main>
    </div>
  );
}

export default DashBoard;

"use client";

import { useState } from "react";
import { Header } from "./components/header/Header";
import { Sidebar } from "./components/siderbar/Siderbar";
import {
  Products,
  Sales,
  Contact,
  Banner,
  Attributes,
  Settings,
  Gallery,
} from "./views";

function DashBoard() {
  const [view, setView] = useState(1);

  const typeView = (view: number) => {
    switch (view) {
      case 1:
        return <Sales />;

      case 2:
        return <Products />;

      case 3:
        return <Attributes />;

      case 4:
        return <Contact />;

      case 5:
        return <Banner />;
      case 6:
        return <Gallery />;

      case 7:
        return <Settings />;
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

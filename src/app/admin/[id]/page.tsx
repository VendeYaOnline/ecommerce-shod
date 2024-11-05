"use client";

import { DashBoard } from "@/components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const queryClient = new QueryClient();

const Panel = () => {
  const { id } = useParams<{ id: string }>();
  const [show, setShow] = useState(false);
  const navigate = useRouter();
  useEffect(() => {
    if (id !== "1118203685") {
      navigate.push("/");
    } else {
      setShow(true);
    }
  }, [id]);
  return (
    show && (
      <QueryClientProvider client={queryClient}>
        <DashBoard />
      </QueryClientProvider>
    )
  );
};

export default Panel;

"use client";

import { DashBoard } from "@/components";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  return show && <DashBoard />;
};

export default Panel;

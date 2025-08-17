"use client";
import React, { useEffect, useState } from "react";
import ChessPreloader from "@/components/ChessPreloader";

export default function PreloadWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <ChessPreloader />;
  return <>{children}</>;
}

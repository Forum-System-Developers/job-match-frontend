import { useState, useEffect } from "react";
import { getLogo } from "../../../../../data/company-data";
import { useQuery } from "@tanstack/react-query";

export const useLogo = (id: string | null) => {
  const {
    data: photoUrl,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["logo", id],
    queryFn: () => getLogo(id as string),
  });

  return { photoUrl, loading: isLoading, error };
};

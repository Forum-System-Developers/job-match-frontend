import { useState, useEffect } from "react";
import { getLogo } from "../../../../../data/company-data";

export const useLogo = (id: string | null) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPhoto = async (id: string) => {
    setLoading(true);
    try {
      const photo = await getLogo(id);
      if (photo) {
        const url = URL.createObjectURL(photo);
        setPhotoUrl(url);
      }
    } catch (error) {
      console.error("Error fetching photo:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPhoto(id);
    }
  }, [id]);

  return { photoUrl, loading };
};

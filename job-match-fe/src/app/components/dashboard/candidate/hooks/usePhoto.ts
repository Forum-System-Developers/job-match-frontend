import { useState, useEffect } from "react";
import { getPhoto } from "../data/professional-data";

export const usePhoto = (id: string | null) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPhoto = async (id: string) => {
    setLoading(true);
    try {
      const photo = await getPhoto(id);
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

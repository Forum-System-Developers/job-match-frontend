import axiosInstance from "@/services/axiosInstance";

export interface City {
  id: string;
  name: string;
}

export const getCities = async (): Promise<City[]> => {
  try {
    const response = await axiosInstance.get("/cities");
    const cities: City[] = response.data.detail;
    return cities;
  } catch (error) {
    console.error("Error: Cities could not be fetched.");
    return [];
  }
};

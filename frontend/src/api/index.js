import QS from "query-string";
import axios from "axios";
import { BASE_URL } from "../config";

const http = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: `${BASE_URL}/api`,
});

export const createSuperhero = async (superhero) => {
  try {
    const { data } = await http.post(`/superheroes`, superhero);

    return data;
  } catch (error) {
    throw error;
  }
};

export const updateSuperhero = async (id, newSuperheroData) => {
  if (!id) {
    throw new Error("Superhero ID is required for updating a superhero.");
  }

  try {
    const { data } = await http.patch(`/superheroes/${id}`, newSuperheroData);

    return data;
  } catch (error) {
    throw error;
  }
};

export const getSuperheroes = async ({ limit = 5, offset = 0 }) => {
  try {
    const query = QS.stringify({ limit, offset });

    const { data } = await http.get(`/superheroes?${query}`);

    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteSuperhero = async (id) => {
  if (!id) {
    throw new Error("Superhero ID is required for deleting a superhero.");
  }

  try {
    const { data } = await http.delete(`/superheroes/${id}`);

    return data;
  } catch (error) {
    throw error;
  }
};

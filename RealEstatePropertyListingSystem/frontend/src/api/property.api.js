import api from "./axios";

// Fetch properties with filters (backend-supported)
export const getAllProperties = async (filters = {}) => {
  const res = await api.get("/property", {
    params: filters,
  });
  return res.data;
};

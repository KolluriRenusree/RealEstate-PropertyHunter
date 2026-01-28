import api from "./axios";

// ✅ Backend prefix is /api/user
export const toggleWishlist = async (propertyId) => {
  const res = await api.post(`/user/wishlist/${propertyId}`);
  return res.data;
};

export const getWishlist = async () => {
  const res = await api.get("/user/wishlist");
  return res.data;
};

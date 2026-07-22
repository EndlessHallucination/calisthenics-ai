import client from "./client";

export const getEquipment = async () => {
  try {
    const { data } = await client.get("/equipment");
    return data;
  } catch (error) {
    if (error.response?.status === 404) return [];
    throw error;
  }
};

export const getProfileEquipment = async () => {
  try {
    const { data } = await client.get("/profile/equipment");
    return data;
  } catch (error) {
    if (error.response?.status === 404) return [];
    throw error;
  }
};

export const updateEquipment = async (equipmentIds) => {
  try {
    const { data } = await client.put("/profile/equipment", { equipmentIds });
    return data;
  } catch (error) {
    if (error.response?.status === 404) return null;
    throw error;
  }
};

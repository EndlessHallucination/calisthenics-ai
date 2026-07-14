import client from "./client";

export const getEquipment = async () => {
  const { data } = await client.get("/equipment");
  return data;
};

export const updateEquipment = async (equipmentIds) => {
  const { data } = await client.put("/profile/equipment", { equipmentIds });
  return data;
};

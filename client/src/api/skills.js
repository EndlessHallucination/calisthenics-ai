import client from "./client";

export const getSkills = async () => {
  try {
    const { data } = await client.get("/skills");
    return data;
  } catch (error) {
    if (error.response?.status === 404) return [];
    throw error;
  }
};

export const getSkill = async (skillId) => {
  try {
    const { data } = await client.get(`/skills/${skillId}`);
    return data;
  } catch (error) {
    if (error.response?.status === 404) return null;
    throw error;
  }
};

export const startSkill = async (skillId) => {
  try {
    const { data } = await client.post(`/skills/${skillId}/start`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const restartSkill = async (skillId) => {
  try {
    const { data } = await client.patch(`/skills/${skillId}/restart`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const completeSkill = async (skillId) => {
  try {
    const { data } = await client.patch(`/skills/${skillId}/complete`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getCurrentMilestone = async (skillId) => {
  try {
    const { data } = await client.get(`/skills/${skillId}/current-milestone`);
    return data;
  } catch (error) {
    if (error.response?.status === 404) return null;
    throw error;
  }
};

export const completeMilestone = async (skillId, milestoneId) => {
  try {
    const { data } = await client.post(
      `/skills/${skillId}/milestones/${milestoneId}/complete`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const getActiveSkills = async () => {
  try {
    const { data } = await client.get("/skills/active");
    return data;
  } catch (error) {
    if (error.response?.status === 404) return [];
    throw error;
  }
};

export const getCompletedSkills = async () => {
  try {
    const { data } = await client.get("/skills/completed");
    return data;
  } catch (error) {
    if (error.response?.status === 404) return [];
    throw error;
  }
};

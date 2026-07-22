import client from "./client";

export const createWorkout = async (skillId) => {
  try {
    const { data } = await client.post("/workouts", { skill_id: skillId });
    return data;
  } catch (error) {
    if (error.response?.status === 404) return null;
    throw error;
  }
};

export const logExercises = async (workoutId, exercises) => {
  try {
    const { data } = await client.post(`/workouts/${workoutId}/exercises`, {
      exercises,
    });
    return data;
  } catch (error) {
    if (error.response?.status === 404) return null;
    throw error;
  }
};

export const getWorkouts = async (skillId) => {
  try {
    const { data } = await client.get(`/workouts?skill_id=${skillId}`);
    return data;
  } catch (error) {
    if (error.response?.status === 404) return [];
    throw error;
  }
};

export const getWorkoutExercises = async (workoutId) => {
  try {
    const { data } = await client.get(`/workouts/${workoutId}/exercises`);
    return data;
  } catch (error) {
    if (error.response?.status === 404) return [];
    throw error;
  }
};

export const deleteWorkout = async (workoutId) => {
  try {
    const { data } = await client.delete(`/workouts/${workoutId}`);
    return data;
  } catch (error) {
    if (error.response?.status === 404) return null;
    throw error;
  }
};

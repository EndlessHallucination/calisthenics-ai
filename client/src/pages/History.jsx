import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getActiveSkills } from "../api/skills";
import { getWorkouts } from "../api/workouts";

export default function History() {
    const [selectedSkillId, setSelectedSkillId] = useState(null);

    const {
        data: skills = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["activeSkills"],
        queryFn: getActiveSkills,
    });

    const {
        data: workouts = [],
        isLoading: workoutsLoading,
    } = useQuery({
        queryKey: ["workoutHistory", selectedSkillId],
        queryFn: () => getWorkouts(selectedSkillId),
        enabled: !!selectedSkillId,
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Something went wrong.</p>;

    return (
        <div>
            <h2>Select a Skill</h2>

            {skills.map((skill) => (
                <button
                    key={skill.id}
                    onClick={() => setSelectedSkillId(skill.id)}
                >
                    {skill.name}
                </button>
            ))}

            {workoutsLoading && <p>Loading workouts...</p>}

            {workouts.map((workout) => (
                <div key={workout.id}>
                    <h3>{new Date(workout.workout_date).toLocaleDateString()}</h3>
                    <p>Duration: {workout.duration_minutes} min</p>
                    <p>Notes: {workout.notes || "No notes"}</p>
                </div>
            ))}
        </div>
    );
}
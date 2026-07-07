import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCurrentMilestone } from "../api/skills"
import { getActiveRoutine, generateRoutine } from "../api/routines";

const SkillCard = ({ skill }) => {
    const queryClient = useQueryClient()

    const { data: milestone } = useQuery({
        queryKey: ['milestone', skill.id],
        queryFn: () => getCurrentMilestone(skill.id)
    })

    const { data: routine } = useQuery({
        queryKey: ['routine', skill.id],
        queryFn: () => getActiveRoutine(skill.id)
    })

    const { mutate: generate, isPending } = useMutation({
        mutationFn: () => generateRoutine(skill.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['routine', skill.id] })
        }
    })

    return (
        <div>
            <h1>{skill.name}</h1>
            {milestone && <h2>Current milestone: {milestone.name}</h2>}
            {routine
                ? routine.exercises.map(ex => (
                    <div key={ex.id}>
                        <h2>{ex.exercise_name}</h2>
                        <p>{ex.category}</p>
                    </div>
                ))
                :
                <button onClick={() => generate()} disabled={isPending}>
                    {isPending ? 'Generating...' : 'Generate Routine'}
                </button>
            }
        </div>
    )
}
export default SkillCard;
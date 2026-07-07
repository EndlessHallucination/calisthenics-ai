import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

import { getSkills, startSkill, getActiveSkills } from "../api/skills"


export default function SkillPicker() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: skills, isLoading } = useQuery({
        queryKey: ['skills'],
        queryFn: getSkills,
        retry: false,
        throwOnError: false
    })

    const { data: activeSkills } = useQuery({
        queryKey: ['skills/active'],
        queryFn: getActiveSkills
    })


    const [error, setError] = useState(null)

    const { mutate, isPending } = useMutation({
        mutationFn: startSkill,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['skills/active'] })
            navigate('/')
        },
        onError: (err) => {
            setError(err.response?.data?.error || 'Failed to start skill')
        }
    })


    const handleStart = (skillId) => {
        mutate(skillId)
    }


    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <h1>SKILLS</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {skills && skills.map(skill => {
                const isActive = activeSkills?.some(s => s.id === skill.id)
                return (
                    <div key={skill.id}>
                        <h2>{skill.name}</h2>
                        <p>{skill.difficulty}</p>
                        <button
                            onClick={() => handleStart(skill.id)}
                            disabled={isActive || isPending}
                        >
                            {isActive ? 'In Progress' : 'Start Learning'}
                        </button>
                    </div>
                )
            }
            )}
        </div>



    )
}
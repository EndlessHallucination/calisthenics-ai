import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

import { createProfile, getProfile } from '../api/profile'


export default function Setup() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: profile, isLoading } = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
        retry: false,
        throwOnError: false
    })

    useEffect(() => {
        if (profile) {
            navigate("/dashboard");
        }
    }, [profile, navigate]);


    const [formData, setFormData] = useState({
        experience: '',
        days_per_week: '',
        session_duration_minutes: '',
        height_cm: '',
        weight_kg: '',
        age: ''
    });

    const { mutate, isPending } = useMutation({
        mutationFn: createProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] })
        },
        onError: (error) => {
            console.error("Failed to save profile:", error);
        }
    })


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        mutate(formData)
    }

    if (isLoading) return <div>Loading...</div>;

    if (profile) return null;

    return (
        <form onSubmit={handleSubmit}>
            <h2>Setup Profile</h2>

            <label>
                Experience:
                <select name="experience" value={formData.experience} onChange={handleChange} required>
                    <option value="">Select level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                </select>
            </label>

            <label>
                Days Per Week:
                <input type="number" name="days_per_week" value={formData.days_per_week} onChange={handleChange} min={1} max={7} required disabled={isPending} />
            </label>

            <label>
                Session Duration (mins):
                <input type="number" name="session_duration_minutes" value={formData.session_duration_minutes} onChange={handleChange} required disabled={isPending} />
            </label>

            <label>
                Height (cm):
                <input type="number" name="height_cm" value={formData.height_cm} onChange={handleChange} disabled={isPending} />
            </label>

            <label>
                Weight (kg):
                <input type="number" name="weight_kg" value={formData.weight_kg} onChange={handleChange} disabled={isPending} />
            </label>

            <label>
                Age:
                <input type="number" name="age" value={formData.age} onChange={handleChange} disabled={isPending} />
            </label>

            <button type="submit" disabled={isPending}>
                {isPending ? 'Saving...' : 'Save Profile'}
            </button>

        </form>
    )
}
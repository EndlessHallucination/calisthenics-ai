import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { getProfile } from '../api/profile'
import ProfileForm from '../components/ProfileForm'
import EquipmentForm from '../components/EquipmentForm'

export default function Setup() {
    const [step, setStep] = useState(1)
    const navigate = useNavigate()

    const { data: profile, isLoading } = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
        retry: false,
        throwOnError: false
    })

    useEffect(() => {
        if (profile && step === 1) navigate('/dashboard')
    }, [profile, navigate, step])
    if (isLoading) return <div>Loading...</div>

    if (step === 1) {
        return <ProfileForm onSuccess={() => setStep(2)} />
    }

    return <EquipmentForm onSuccess={() => navigate('/dashboard')} />
}
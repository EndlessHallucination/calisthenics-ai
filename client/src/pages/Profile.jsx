import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getProfile } from '../api/profile'
import { getEquipment, getProfileEquipment } from '../api/equipment'
import ProfileForm from '../components/ProfileForm'
import EquipmentForm from '../components/EquipmentForm'

export default function Profile() {
    const [editingProfile, setEditingProfile] = useState(false)
    const [editingEquipment, setEditingEquipment] = useState(false)

    const { data: profile, isLoading } = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile
    })

    const { data: equipment = [] } = useQuery({
        queryKey: ['profile/equipment'],
        queryFn: getProfileEquipment
    })

    if (isLoading) return <div>Loading...</div>
    if (!profile) return <div>No profile found</div>

    return (
        <div className="max-w-4xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-black text-white mb-8">Profile</h1>

            {editingProfile
                ? <ProfileForm initialData={profile} onSuccess={() => setEditingProfile(false)} />
                : (
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-white font-bold">Personal Info</h2>
                            <button onClick={() => setEditingProfile(true)} className="text-zinc-400 text-sm hover:text-white">Edit</button>
                        </div>
                        <p className="text-zinc-400 text-sm">Experience: <span className="text-white">{profile.experience}</span></p>
                        <p className="text-zinc-400 text-sm">Days per week: <span className="text-white">{profile.days_per_week}</span></p>
                        <p className="text-zinc-400 text-sm">Session duration: <span className="text-white">{profile.session_duration_minutes} min</span></p>
                        {profile.height_cm && <p className="text-zinc-400 text-sm">Height: <span className="text-white">{profile.height_cm} cm</span></p>}
                        {profile.weight_kg && <p className="text-zinc-400 text-sm">Weight: <span className="text-white">{profile.weight_kg} kg</span></p>}
                        {profile.age && <p className="text-zinc-400 text-sm">Age: <span className="text-white">{profile.age}</span></p>}
                    </div>
                )
            }

            {editingEquipment
                ? <EquipmentForm
                    initialSelected={equipment.map(e => e.id)}
                    onSuccess={() => setEditingEquipment(false)}
                />
                : (
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-white font-bold">Equipment</h2>
                            <button onClick={() => setEditingEquipment(true)} className="text-zinc-400 text-sm hover:text-white">Edit</button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                            {equipment.map(e => (
                                <span key={e.id} className="bg-zinc-800 text-zinc-300 text-sm px-3 py-1 rounded-lg">
                                    {e.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )
            }
        </div>
    )
}
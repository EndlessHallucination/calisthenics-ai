import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getEquipment, updateEquipment } from "../api/equipment";


export default function EquipmentForm({ onSuccess, initialSelected = [] }) {
    const [selected, setSelected] = useState(initialSelected)



    const { data: equipment = [], isLoading } = useQuery({
        queryKey: ["equipment"],
        queryFn: getEquipment,
    });


    const toggleEquipment = (id) => {

        setSelected((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );

    };


    const handleSubmit = (e) => {
        e.preventDefault();

        mutation.mutate(selected);
    };


    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: updateEquipment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile/equipment'] })
            onSuccess()
        }
    })

    if (isLoading) {
        return <div className="text-white">Loading...</div>;
    }


    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">

            <div className="w-full max-w-md">

                <h2 className="text-3xl font-black text-white mb-2">
                    Your Equipment
                </h2>

                <p className="text-zinc-500 mb-8">
                    Select what equipment you have available.
                </p>


                <form
                    onSubmit={handleSubmit}
                    className="space-y-3"
                >

                    {equipment.map((item) => (

                        <label
                            key={item.id}
                            className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-xl p-4 cursor-pointer"
                        >

                            <input
                                type="checkbox"
                                checked={selected.includes(item.id)}
                                onChange={() => toggleEquipment(item.id)}
                            />

                            <span className="text-white">
                                {item.name}
                            </span>

                        </label>

                    ))}


                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="w-full mt-5 bg-white text-zinc-950 font-bold py-4 rounded-xl"
                    >
                        {mutation.isPending ? "Saving..." : "Finish Setup"}
                    </button>

                </form>

            </div>

        </div>
    );
}
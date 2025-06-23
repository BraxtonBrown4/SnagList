import { useState } from "react"
import { createTag, getAllTags } from "../managers/tagManager"
import { useCreateTag, useGetAllTags } from "../queryHooks/tagQueryHooks"
import { LoadingModal } from "../modals/LoadingModal";
import { ErrorModal } from "../modals/ErrorModal";

export const Tags = () => {
    const [newTag, setNewTag] = useState({name: ""})

    const {data: tags, error, isError, isLoading} = useGetAllTags()

    const {mutateAsync: createTag} = useCreateTag()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await createTag(newTag)
        setNewTag({name: ""})
    }

    return (
        <div className="px-6 py-10 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create A Tag</h2>
            <form onSubmit={handleSubmit} className="flex items-center gap-4 mb-8">
                <div className="flex-1">
                    <input
                        type="text"
                        value={newTag.name}
                        onChange={(e) => setNewTag({name: e.target.value})}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        maxLength="15"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
                    Create Tag
                </button>
            </form>
            

            <h1 className="text-3xl font-semibold text-gray-900 mb-6">All Tags</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {tags?.map((t) => (
                    <div
                        key={t.id}
                        className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 hover:shadow-md transition">
                        <p className="text-lg font-medium text-gray-800">#{t.name}</p>
                    </div>
                ))}
            </div>
            <LoadingModal isLoading={isLoading}/>
            {isError && <ErrorModal error={error}/>}
        </div>

    )
}
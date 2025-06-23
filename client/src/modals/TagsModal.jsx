import { useState } from "react"
import { useGetAllTags } from "../queryHooks/tagQueryHooks"

export const TagModal = ({ isModalOpen, setIsModalOpen, tagArr, setTagArr }) => {
    const [localTagArr, setLocalTagArr] = useState([...tagArr])

    const { data: allTags } = useGetAllTags()

    const handleChange = (e, tag) => {
        if (e.target.checked) {
            const mutable = localTagArr.filter(t => t.id !== tag.id)
            setLocalTagArr([...mutable, tag])
        } else {
            const mutable = localTagArr.filter(t => t.id !== tag.id)
            setLocalTagArr(mutable)
        }
    }

    return (isModalOpen &&
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full mx-4 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Tags</h2>
                <div>
                    {allTags.map(t => <div key={t.id} className="my-4 flex flex-row justify-center">
                        <label className="mr-2 flex items-center justify-center block text-gray-700 font-medium">{t.name}</label>
                        <input
                            type="checkbox"
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            defaultValue={tagArr?.some(tag => tag.id == t.id)}
                            defaultChecked={tagArr?.some(tag => tag.id == t.id)}
                            onChange={(e) => { handleChange(e, t) }} />
                    </div>
                    )}
                </div>
                <div className="flex justify-end space-x-3 pt-3">
                    <button
                        onClick={() => { setIsModalOpen(false); setLocalTagArr([...tagArr]) }}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition">
                        Cancel
                    </button>
                    <button
                        onClick={() => { setIsModalOpen(false); setTagArr(localTagArr) }}
                        className="px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}
import { useEffect, useState } from "react"
import { getAllTags } from "../managers/tagManager"

export const TagModal = ({ isModalOpen, setIsModalOpen, tagList, setTagList }) => {
    const [allTags, setAllTags] = useState([])
    const [localTagList, setLocalTagList] = useState([...tagList])

    useEffect(() => {
        getAllTags().then(setAllTags)
    }, [])

    const handleChange = (e, tag) => {
        if (e.target.checked){
            setLocalTagList([...localTagList, tag])
        } else {
            const mutable = localTagList.filter(t => t.id !== tag.id)
            setLocalTagList(mutable)
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
                            defaultValue={localTagList.some(tag => tag.id == t.id)}
                            defaultChecked={localTagList.some(tag => tag.id == t.id)}
                            onChange={(e) => {handleChange(e, t)}} />
                    </div>
                    )}
                </div>
                <div className="flex justify-end space-x-3 pt-3">
                    <button
                        onClick={() => {setIsModalOpen(false); setLocalTagList([])}}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition">
                        Cancel
                    </button>
                    <button
                        onClick={() => {setIsModalOpen(false); setTagList(localTagList)}}
                        className="px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}
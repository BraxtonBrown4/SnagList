import { useState } from "react"
import { TagModal } from "../modals/TagsModal"

export const NewList = ({ loggedInUser }) => {
    const [newList, setNewList] = useState({ userProfileId: loggedInUser.id, isPublic: false })
    const [tagsModalOpen, setTagsModalOpen] = useState(false)
    const [tagList, setTagList] = useState([])


    const handleChange = (e) => {
        const { name, type, checked, value } = e.target
        setNewList({ ...newList, [name]: type === "checkbox" ? checked : value })
    }

    const handleSubmit = () => {

    }

    return (
        <div className="fixed inset-0 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Create A List</h2>
                <form action={handleSubmit}>

                    <div className="my-4 flex flex-row justify-center">
                        <label className="mr-2 flex items-center justify-center block text-gray-700 font-medium">Is Public</label>
                        <input
                            name="isPublic"
                            type="checkbox"
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            defaultValue={false}
                            onChange={handleChange} />
                    </div>

                    <div className="my-4 flex flex-row">
                        <label className="flex items-center justify-center w-4/12 block text-gray-700 font-medium">List Name:</label>
                        <input
                            name="name"
                            type="text"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                            onChange={handleChange} />
                    </div>

                    <button onClick={() => {setTagsModalOpen(true)}} className="text-green-600 hover:bg-green-50 font-medium px-3 py-1 rounded-lg text-lg transition mb-8">Tags</button>

                    <div className="flex justify-end space-x-3 pt-3">
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition">
                            Create
                        </button>
                    </div>
                </form>
                {tagList?.map(t => <p key={t.id} className="text-gray-600 text-sm">#{t.name}</p>)}
                <TagModal isModalOpen={tagsModalOpen} setIsModalOpen={setTagsModalOpen} tagList={tagList} setTagList={setTagList}/>
            </div>
        </div>
    )
}

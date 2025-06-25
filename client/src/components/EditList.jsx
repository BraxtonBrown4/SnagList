import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { TagModal } from "../modals/TagsModal"
import { AddItemModal } from "../modals/AddItemModal"
import { useGetListById, usePutList } from "../queryHooks/listQueryHooks"
import { LoadingModal } from "../modals/LoadingModal"
import { ErrorModal } from "../modals/ErrorModal"

export const EditList = ({ loggedInUser }) => {
    const { editId } = useParams()
    const listId = parseInt(editId)
    const [addItemModalOpen, setAddItemModalOpen] = useState(false)
    const [tagsModalOpen, setTagsModalOpen] = useState(false)
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { data: list, error, isError, isLoading } = useGetListById(listId)
    const { mutateAsync: PutList } = usePutList()

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target
        const newValue = type === "checkbox" ? checked : value
        queryClient.setQueryData(["list", listId], (old) => ({
            ...old,
            [name]: newValue,
        }))
    }

    const handleTagsUpdate = (newTags) => {
        queryClient.setQueryData(["list", listId], (old) => ({
            ...old,
            tags: newTags,
        }))
    }

    const handleItemsUpdate = (newItems) => {
        queryClient.setQueryData(["list", listId], (old) => ({
            ...old,
            items: newItems,
        }))
    }

    const removeItem = (itemName) => {
        queryClient.setQueryData(["list", listId], (old) => ({
            ...old,
            items: old.items.filter(item => item.name !== itemName),
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await PutList(list)
        navigate(`/Lists/${res.id}`)
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-50 px-4 py-8 overflow-auto">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Edit List</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex justify-center items-center space-x-3">
                        <label className="text-gray-700 font-medium">Is Public</label>
                        <input
                            name="isPublic"
                            type="checkbox"
                            className="h-5 w-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            checked={list?.isPublic || false}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex items-center space-x-4">
                        <label className="w-1/3 text-gray-700 font-medium">List Name:</label>
                        <input
                            name="name"
                            type="text"
                            className="w-2/3 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={list?.name || ""}
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={() => setTagsModalOpen(true)}
                            className="text-green-600 hover:bg-green-50 font-medium px-4 py-2 rounded-lg text-sm transition"
                        >
                            Tags
                        </button>
                        <button
                            type="button"
                            onClick={() => setAddItemModalOpen(true)}
                            className="text-green-600 hover:bg-green-50 font-medium px-4 py-2 rounded-lg text-sm transition"
                        >
                            Items
                        </button>
                    </div>

                    <div className="flex justify-center pt-3">
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Update
                        </button>
                    </div>
                </form>

                <div className="mt-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                        {list?.tags?.map(t => (
                            <p key={t.id} className="text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded-md">#{t.name}</p>
                        ))}
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Items</h3>
                    <div className="space-y-4">
                        {list?.items?.map(i => (
                            <div
                                key={i.name}
                                className="w-full flex flex-col sm:flex-row items-center sm:items-start justify-between bg-white shadow rounded-lg p-4"
                            >
                                {i.image && (
                                    <img
                                        src={i.image}
                                        alt={i.name}
                                        className="w-24 h-24 object-contain rounded-md mr-4 mb-4 sm:mb-0"
                                    />
                                )}
                                <div className="flex-1 text-center sm:text-left">
                                    <h3 className="text-lg font-semibold text-gray-900">{i.name}</h3>
                                    <p className="text-gray-700 mt-1">
                                        Price: <span className="font-medium">${i.price ?? "N/A"}</span>
                                    </p>
                                    <p className="text-gray-700">
                                        Target Price: <span className="font-medium">${i.targetPrice ?? "N/A"}</span>
                                    </p>
                                    <p className="text-gray-700">
                                        Notify:{" "}
                                        <span className={`font-medium ${i.notify ? "text-green-600" : "text-gray-500"}`}>
                                            {i.notify ? "Yes" : "No"}
                                        </span>
                                    </p>
                                </div>

                                <div className="flex mt-4 sm:mt-0 sm:ml-6 gap-3">
                                    <button
                                        onClick={() => removeItem(i.name)}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <LoadingModal isLoading={isLoading} />
                {isError && <ErrorModal error={error} />}

                <TagModal
                    isModalOpen={tagsModalOpen}
                    setIsModalOpen={setTagsModalOpen}
                    tagArr={list?.tags || []}
                    setTagArr={handleTagsUpdate}
                />
                <AddItemModal
                    isModalOpen={addItemModalOpen}
                    setIsModalOpen={setAddItemModalOpen}
                    newItemArr={list?.items || []}
                    setNewItemArr={handleItemsUpdate}
                />
            </div>
        </div>
    )
}

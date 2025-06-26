import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { DeleteModal } from "../modals/DeleteModal"
import { AddItemModal } from "../modals/AddItemModal"
import { EditItemModal } from "../modals/EditItemModal"
import { useGetListById } from "../queryHooks/listQueryHooks"
import { LoadingModal } from "../modals/LoadingModal"
import { ErrorModal } from "../modals/ErrorModal"
import { useCreateItem, useDeleteItemById } from "../queryHooks/itemQueryHooks"

export const ListDetails = ({ loggedInUser }) => {
    const { listId } = useParams()
    const [deleteId, setDeleteId] = useState(0)
    const navigate = useNavigate()
    const [addItemModalOpen, setAddItemModalOpen] = useState(false)
    const [editItem, setEditItem] = useState(null)
    const [newItemArr, setNewItemArr] = useState(null)

    const { data, error, isError, isLoading } = useGetListById(parseInt(listId))
    const { mutateAsync: createItem } = useCreateItem(listId)
    const { mutateAsync: deleteById } = useDeleteItemById(listId)

    const handleNewItem = async () => {
        await createItem({ ...newItemArr[0], ListId: listId })
        setNewItemArr(null)
    }

    useEffect(() => {
        if (newItemArr) {
            handleNewItem()
        }
    }, [newItemArr])

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-50 p-6 overflow-auto">
            <div className="w-full max-h-[75vh] overflow-y-auto max-w-lg bg-white rounded-2xl shadow-lg border border-gray-200">

                <div className="p-8 text-center">
                    <h2 className="text-3xl font-medium text-gray-900 mb-4">{data?.name}</h2>
                    <p
                        onClick={() => navigate(`/Profile/${data?.userProfileId}`)}
                        className="text-sm italic text-blue-600 hover:underline cursor-pointer mb-1"
                    >
                        by {data?.userProfile?.userName}
                    </p>
                    <h3 className="text-gray-700 mb-6 text-lg">
                        Public: {data?.isPublic ? "True" : "False"}
                    </h3>
                </div>

                <div className="px-8 mb-6 flex flex-wrap justify-center">
                    {data?.tags?.map((t) => (
                        <p key={t.id} className="text-gray-600 text-sm font-medium inline-block mr-3 mb-2">
                            #{t.name}
                        </p>
                    ))}
                </div>

                <div className="px-8 mb-8 space-y-4">
                    {data?.items?.map((i) => (
                        <div
                            key={i.id}
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

                            {data?.userProfileId === loggedInUser.id && (
                                <div className="flex mt-4 sm:mt-0 sm:ml-6 gap-3">
                                    <button
                                        onClick={() => setEditItem(i)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => setDeleteId(i.id)}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {data?.userProfileId === loggedInUser.id && (
                    <button
                        onClick={() => setAddItemModalOpen(true)}
                        className="text-green-600 hover:bg-green-50 font-medium px-3 py-1 rounded-lg text-lg transition mb-8"
                    >
                        Add Item +
                    </button>
                )}
            </div>

            <LoadingModal isLoading={isLoading} />
            {isError && <ErrorModal error={error} />}
            <EditItemModal editItem={editItem} setEditItem={setEditItem} />
            <AddItemModal
                isModalOpen={addItemModalOpen}
                setIsModalOpen={setAddItemModalOpen}
                newItemArr={newItemArr}
                setNewItemArr={setNewItemArr}
            />
            <DeleteModal deleteByIdFunc={deleteById} deleteId={deleteId} setDeleteId={setDeleteId} />
        </div>
    )
}

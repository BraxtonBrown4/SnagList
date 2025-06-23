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

            <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg border border-gray-200">

                <div className="p-8 text-center">

                    <h2 className="text-3xl font-medium text-gray-900 mb-4">{data?.name}</h2>

                    <p
                        onClick={() => navigate(`/Profile/${data?.userProfileId}`)}
                        className="text-sm italic text-blue-600 hover:underline cursor-pointer mb-1">
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

                <div className="px-8 mb-8">
                    {data?.items?.map((i) => (
                        <div key={i.id} className="w-full flex flex-col sm:flex-row items-center justify-between px-4 py-2">
                            <p className="text-gray-600 text-sm font-medium text-center sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:transform">
                                {`${i.name} $${i.price}`}
                            </p>

                            {data?.userProfileId == loggedInUser.id &&
                                <div className="mt-2 sm:mt-0 sm:ml-auto flex gap-2">
                                    <button onClick={() => { setEditItem(i) }} className="text-blue-600 hover:bg-blue-50 font-medium px-3 py-1 rounded-lg text-sm transition">
                                        Edit
                                    </button>
                                    <button onClick={() => { setDeleteId(i.id) }} className="text-red-600 hover:bg-red-50 font-medium px-3 py-1 rounded-lg text-sm transition">
                                        Delete
                                    </button>
                                </div>}
                        </div>
                    ))}
                </div>
                {data?.userProfileId == loggedInUser.id && <button onClick={() => { setAddItemModalOpen(true) }} className="text-green-600 hover:bg-green-50 font-medium px-3 py-1 rounded-lg text-lg transition mb-8">Add Item +</button>}
            </div>

            <LoadingModal isLoading={isLoading} />
            {isError && <ErrorModal error={error} />}
            <EditItemModal editItem={editItem} setEditItem={setEditItem} />
            <AddItemModal isModalOpen={addItemModalOpen} setIsModalOpen={setAddItemModalOpen} newItemArr={newItemArr} setNewItemArr={setNewItemArr} />
            <DeleteModal deleteByIdFunc={deleteById} deleteId={deleteId} setDeleteId={setDeleteId} />
        </div >

    )
}
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getMyListById, getPublicListById } from "../managers/listManager"
import { DeleteModal } from "../modals/DeleteModal"
import { createItem, deleteItemById } from "../managers/itemManager"
import { AddItemModal } from "../modals/AddItemModal"
import { EditItemModal } from "../modals/EditItemModal"

export const ListDetails = ({ loggedInUser }) => {
    const { listId, isPublic } = useParams()
    const [deleteId, setDeleteId] = useState(0)
    const [list, setList] = useState({})
    const navigate = useNavigate()
    const [usersList, setUsersList] = useState(false)
    const [addItemModalOpen, setAddItemModalOpen] = useState(false)
    const [editItem, setEditItem] = useState(null)
    const [newItemArr, setNewItemArr] = useState(null)

    const isUsersList = (list) => {
        setUsersList(list.userProfileId == loggedInUser.id)
    }

    useEffect(() => {
        if (listId > 0 && isPublic !== "" && loggedInUser.id > 0 && deleteId == 0 && newItemArr == null && editItem == null) {

            const parsedListId = parseInt(listId)
            const boolIsPublic = isPublic == "true" ? true : false

            if (boolIsPublic) {
                getPublicListById(parsedListId).then((res) => {
                    setList(res)
                    isUsersList(res)
                })
            } else {
                getMyListById(parsedListId).then((res) => {
                    if (!res.id) {
                        navigate("/Unauthorized")
                    } else {
                        setList(res)
                        isUsersList(res)
                    }
                })
            }
        }
    }, [loggedInUser, listId, isPublic, deleteId, editItem, newItemArr])

    useEffect(() => {
        if (newItemArr) {
            createItem({ ...newItemArr[0], ListId: listId }).then(() => setNewItemArr(null))
        }
    }, [newItemArr])

    return (list.id &&
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-50 p-6 overflow-auto">

            <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg border border-gray-200">

                <div className="p-8 text-center">

                    <h2 className="text-3xl font-medium text-gray-900 mb-4">{list.name}</h2>

                    <p
                        onClick={() => navigate(`/Profile/${list.userProfileId}`)}
                        className="text-sm italic text-blue-600 hover:underline cursor-pointer mb-1">
                        by {list.userProfile.userName}
                    </p>

                    <h3 className="text-gray-700 mb-6 text-lg">
                        Public: {list.isPublic ? "True" : "False"}
                    </h3>
                </div>

                <div className="px-8 mb-6 flex flex-wrap justify-center">
                    {list.tags?.map((t) => (
                        <p key={t.id} className="text-gray-600 text-sm font-medium inline-block mr-3 mb-2">
                            #{t.name}
                        </p>
                    ))}
                </div>

                <div className="px-8 mb-8">
                    {list.items?.map((i) => (
                        <div key={i.id} className="w-full flex flex-col sm:flex-row items-center justify-between px-4 py-2">
                            <p className="text-gray-600 text-sm font-medium text-center sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:transform">
                                {`${i.name} $${i.price}`}
                            </p>

                            {usersList &&
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
                {usersList && <button onClick={() => { setAddItemModalOpen(true) }} className="text-green-600 hover:bg-green-50 font-medium px-3 py-1 rounded-lg text-lg transition mb-8">Add Item +</button>}
            </div>

            <EditItemModal editItem={editItem} setEditItem={setEditItem} />
            <AddItemModal isModalOpen={addItemModalOpen} setIsModalOpen={setAddItemModalOpen} newItemArr={newItemArr} setNewItemArr={setNewItemArr} />
            <DeleteModal deleteByIdFunc={deleteItemById} deleteId={deleteId} setDeleteId={setDeleteId} />
        </div >

    )
}
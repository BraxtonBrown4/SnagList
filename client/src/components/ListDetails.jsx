import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getMyListById, getPublicListById } from "../managers/listManager"

export const ListDetails = ({ loggedInUser }) => {
    const { listId, isPublic } = useParams()
    const [list, setList] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        if (listId > 0 && isPublic && loggedInUser.id > 0) {

            const parsedListId = parseInt(listId)
            const boolIsPublic = isPublic == "true" ? true : false

            if (boolIsPublic) {
                getPublicListById(parsedListId).then(setList)
            } else {
                getMyListById(parsedListId).then((res) => {
                    if (!res.id) {
                        navigate("/*")
                    } else {
                        setList(res)
                    }
                })
            }
        }
    }, [loggedInUser, listId, isPublic])

    return (list.id &&
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-50 p-6 overflow-auto">

            <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg border border-gray-200">

                <div className="p-8 text-center">

                    <h2 className="text-3xl font-medium text-gray-900 mb-4">{list.name}</h2>

                    <h3 className="text-gray-700 mb-6 text-lg">
                        Public: {list.isPublic ? "True" : "False"}
                    </h3>
                </div>

                <div className="px-8 mb-6">
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
                                {i.name}
                            </p>

                            <div className="mt-2 sm:mt-0 sm:ml-auto flex gap-2">
                                <button className="text-blue-600 hover:bg-blue-50 font-medium px-3 py-1 rounded-lg text-sm transition">
                                    Edit
                                </button>
                                <button className="text-red-600 hover:bg-red-50 font-medium px-3 py-1 rounded-lg text-sm transition">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
            <button className="mb-8">Add Item +</button>
        </div>
        </div >

    )
}
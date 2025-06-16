import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getMyListById, getPublicListById } from "../managers/listManager"

export const ListDetails = ({ loggedInUser }) => {
    const { listId, isPublic } = useParams()
    const [list, setList] = useState({})

    useEffect(() => {
        if (listId > 0 && isPublic && loggedInUser.id > 0) {

            const parsedListId = parseInt(listId)
            const boolIsPublic = isPublic == "true" ? true : false

            if (boolIsPublic) {
                getPublicListById(parsedListId).then(setList)
            } else {
                getMyListById(parsedListId).then(setList)
            }
        }
    }, [loggedInUser, listId, isPublic])

    return (
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
                        <p key={i.id} className="text-gray-600 text-sm font-medium mb-1">
                            {i.name}

                        </p>
                    ))}
                </div>
            </div>
        </div>

    )
}
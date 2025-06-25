import { useState } from "react"
import { DeleteModal } from "../modals/DeleteModal"
import { useNavigate } from "react-router-dom";
import { useDeleteListById, useGetAllPublicLists } from "../queryHooks/listQueryHooks";
import { ErrorModal } from "../modals/ErrorModal";
import { LoadingModal } from "../modals/LoadingModal";


export const AllLists = ({ loggedInUser }) => {
    const [deleteId, setDeleteId] = useState(0)

    const navigate = useNavigate()

    const { data: lists, error, isError, isLoading } = useGetAllPublicLists()
    const { mutateAsync } = useDeleteListById()


    return (
        <div>
            {lists?.map((l) => (
                <div
                    key={l.id}
                    className="max-w-sm mx-auto my-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                    <div onClick={() => { navigate(`/Lists/${l.id}`) }}>

                        <div className="p-6">
                            <h2 className="text-xl font-medium text-gray-900 mb-2">{l.name}</h2>

                            <p className="text-sm italic text-gray-500 mb-1">
                                by {l.userProfile.userName}
                            </p>

                            <h3>Public: {l.isPublic ? "True" : "False"}</h3>
                        </div>

                        <div>

                            {l.tags.slice(0, 2).map((t) => <p key={t.id} className="text-gray-600 text-sm">#{t.name}</p>)}

                            {l.tags.length > 3 && <p className="text-gray-600 text-sm">...</p>}
                        </div>

                        <div className="p-6">
                            {l.items.slice(0, 4).map(i => <p key={i.id} className="text-gray-600 text-sm font-medium">{i.name}</p>)}
                            {l.items.length > 5 && <p className="text-gray-600 text-sm font-medium">...</p>}
                        </div>
                    </div>


                    {loggedInUser.id == l.userProfileId && <div className="px-6 pb-4 flex justify-end space-x-3">
                        <button onClick={() => { navigate(`/Edit/${l.id}`) }} className="text-blue-600 hover:bg-blue-50 font-medium px-3 py-1 rounded-lg text-sm transition">
                            Edit
                        </button>
                        <button onClick={() => { setDeleteId(l.id) }} className="text-red-600 hover:bg-red-50 font-medium px-3 py-1 rounded-lg text-sm transition">
                            Delete
                        </button>
                    </div>}
                </div>
            ))}
            <LoadingModal isLoading={isLoading} />
            {isError && <ErrorModal error={error} />}
            <DeleteModal deleteByIdFunc={mutateAsync} deleteId={deleteId} setDeleteId={setDeleteId} />
        </div>
    );

}
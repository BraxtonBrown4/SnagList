import { useEffect, useState } from "react"
import { deleteListById, getMyLists } from "../managers/listManager"
import { DeleteModal } from "../re-usable-components/DeleteModal"

export const MyLists = ({ loggedInUser }) => {
    const [lists, setLists] = useState(null)
    const [deleteId, setDeleteId] = useState(0)


    useEffect(() => {
        getMyLists().then(setLists)
    }, [loggedInUser])


    return (
        lists != null &&
        <div>
            {lists.length === 0 ? (
                <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-medium text-gray-700 px-4">Oops! Looks like you have no lists, try making some</h2>) : (
                lists.map((l) => (
                    <div
                        key={l.id}
                        className="max-w-sm mx-auto my-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                        <div className="p-6">
                            <h2 className="text-xl font-medium text-gray-900 mb-2">{l.name}</h2>
                            
                            {l.tags.slice(0, 2).map((t) => <p key={t.id} className="text-gray-600 text-sm">#{t.name}</p>)}

                            {l.tags.length > 3 &&  <p className="text-gray-600 text-sm">...</p>}
                        </div>

                        <div>
                            {l.items.slice(0, 4).map(i => <p key={i.id} className="text-gray-600 text-sm font-medium">{i.name}</p>)}
                        </div>

                        <div className="px-6 pb-4 flex justify-end space-x-3">
                            <button className="text-blue-600 hover:bg-blue-50 font-medium px-3 py-1 rounded-lg text-sm transition">
                                Edit
                            </button>
                            <button onClick={() => {setDeleteId(l.id)}} className="text-red-600 hover:bg-red-50 font-medium px-3 py-1 rounded-lg text-sm transition">
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            )}

            <DeleteModal deleteFunc={deleteListById} deleteId={deleteId} setDeleteId={setDeleteId}/>
        </div>
    );

}
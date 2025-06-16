import { useEffect, useState } from "react"
import { getMyLists } from "../managers/listManager"

export const MyLists = ({ loggedInUser }) => {
    const [lists, setLists] = useState(null)

    useEffect(() => {
        getMyLists().then(setLists)
    }, [loggedInUser])


    return ( lists != null &&
        <div>
            {lists.length == 0 ?
            <h2 class="text-center text-2xl sm:text-3xl md:text-4xl font-medium text-gray-700 px-4">Oops! Looks like you have no lists, try making some</h2> :
            lists.map(l =>
                <div key={l.id} class="max-w-sm mx-auto bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                    <div class="p-6">
                        <h2 class="text-xl font-medium text-gray-900 mb-2">{l.name}</h2>
                        <p class="text-gray-600 text-sm">
                            
                        </p>
                    </div>
                    <div class="px-6 pb-4 flex justify-end">
                        <button class="text-blue-600 hover:bg-blue-50 font-medium px-3 py-1 rounded-lg text-sm transition">
                            Options
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
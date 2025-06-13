import { useEffect, useState } from "react"
import { getMyLists } from "../managers/listManager"

export const MyLists = ({ loggedInUser }) => {
    const [lists, setLists] = useState([])

    useEffect(() => {
        loggedInUser > 0 && getMyLists().then(setLists)
    }, [loggedInUser])


    return <h2>{loggedInUser.userName}</h2>
}
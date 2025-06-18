import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getMyListById } from "../managers/listManager"

export const EditList = ({loggedInUser}) => {
    const {editId} = useParams()
    const [list, setList] = useState({})

    useEffect(() => {
        if (editId > 0)
        {
            getMyListById(parseInt(editId)).then(setList)
        }
    }, [editId])
    
    return (
        <h2>Edit {editId}</h2>
    )
}
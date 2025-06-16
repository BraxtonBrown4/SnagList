import { useEffect } from "react"
import { useParams } from "react-router-dom"

export const ListDetails = ({loggedInUser}) => {
    const {listId} = useParams()

    useEffect(() => {
        
    }, [loggedInUser])
    
    return (
        <h2>List Details {listId}</h2>
    )
}
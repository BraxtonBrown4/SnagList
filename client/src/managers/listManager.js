import { useQuery, useMutation } from "@tanstack/react-query"

const _apiUrl = "/api/Lists";

export const getPublicListsByUserId = (userId) => {
    return fetch(`${_apiUrl}/${userId}`).then(res => res.json())
}

export const getAllPublicLists = () => {
    return fetch(`${_apiUrl}/public`).then(res => res.json())
}

export const getCurrentUserLists = async () => {
    const res = await fetch(`${_apiUrl}/CurrentUser`)

    if (!res.ok) {
        const errorBody = await res.json()

        throw new Error(errorBody.message || res.statusText || "Request failed")
    }

    return res.json();
}

export const deleteListById = async (listId) => {
    const res = await fetch(`${_apiUrl}/${listId}`, {
        method: "DELETE"
    })

    if (!res.ok) {
        const errorBody = await res.json()

        throw new Error(errorBody.message || res.statusText || "Request failed")
    }

    return true
}

export const getPublicListById = (listId) => {
    return fetch(`${_apiUrl}/Public/${listId}`).then(res => res.json())
}

export const getMyListById = (listId) => {
    return fetch(`${_apiUrl}/Me/${listId}`).then(res => res.json())
}

export const CreateList = (list) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(list)
    }).then(res => res.json());
}

export const PutList = (list) => {
    return fetch(`${_apiUrl}/${list.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(list)
    }).then(res => res.json());
}
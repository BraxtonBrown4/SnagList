import { useQuery, useMutation } from "@tanstack/react-query"

const _apiUrl = "/api/Lists";

export const getAllPublicLists = async () => {
    const res = await fetch(`${_apiUrl}/public`);
    if (!res.ok) {
        const errorBody = await res.json();
        throw new Error(errorBody.message || res.statusText || "Request failed");
    }
    return res.json();
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

export const getListById = async (listId) => {
    const res = await fetch(`${_apiUrl}/${listId}`)

    if (!res.ok) {
        const errorBody = await res.json()

        throw new Error(errorBody.message || res.statusText || "Request failed")
    }

    return res.json()
}

export const CreateList = async (list) => {
    const res = await fetch(_apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(list)
    });

    if (!res.ok) {
        const errorBody = await res.json();
        throw new Error(errorBody.message || res.statusText || "Request failed");
    }

    return res.json();
}

export const PutList = (list) => {
    return (async () => {
        const res = await fetch(`${_apiUrl}/${list.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(list)
        });

        if (!res.ok) {
            const errorBody = await res.json();
            throw new Error(errorBody.message || res.statusText || "Request failed");
        }

        return res.json();
    })();
}
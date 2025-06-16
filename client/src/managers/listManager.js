const _apiUrl = "/api/Lists";

export const getPublicListsByUserId = (userId) => {
    return fetch(`${_apiUrl}/${userId}`).then(res => res.json())
}

export const getAllPublicLists = () => {
    return fetch(`${_apiUrl}/public`).then(res => res.json())
}

export const getMyLists = () => {
    return fetch(`${_apiUrl}/Me`).then(res => res.json())
}

export const deleteListById = (listId) => {
    return fetch(`${_apiUrl}/${listId}`, {
        method: "DELETE"
    })
}

export const getPublicListById = (listId) => {
    return fetch(`${_apiUrl}/Public/${listId}`).then(res => res.json())
}

export const getMyListById = (listId) => {
    return fetch(`${_apiUrl}/Me/${listId}`).then(res => res.json())
}
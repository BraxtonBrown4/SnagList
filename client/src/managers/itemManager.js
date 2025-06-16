const _apiUrl = "/api/Items";

export const deleteItemById = (itemId) => {
    return fetch(`${_apiUrl}/${itemId}`, {
        method: "DELETE"
    })
}
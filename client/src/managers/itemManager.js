const _apiUrl = "/api/Items";

export const deleteItemById = (itemId) => {
    return fetch(`${_apiUrl}/${itemId}`, {
        method: "DELETE"
    })
}

export const createItem = (item) => {
  return fetch(_apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(item)
  }).then(res => res.json())
}
const _apiUrl = "/api/Items";

export const deleteItemById = async (itemId) => {
  const res = await fetch(`${_apiUrl}/${itemId}`, {
    method: "DELETE"
  })

  if (!res.ok) {
    const errorBody = await res.json()

    throw new Error(errorBody.message || res.statusText || "Request failed")
  }

  return true
}

export const createItem = async (item) => {
  const res = await fetch(_apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(item)
  })

  if (!res.ok) {
    const errorBody = await res.json()

    throw new Error(errorBody.message || res.statusText || "Request failed")
  }

  return res.json()
}

export const updateItem = async (item) => {
  const res = await fetch(`${_apiUrl}/${item.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(item)
  });

  if (!res.ok) {
    const errorBody = await res.json();

    throw new Error(errorBody.message || res.statusText || "Request failed");
  }

  return res.json();
};

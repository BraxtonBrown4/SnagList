const _apiUrl = "/api/Tags";

export const getAllTags = async () => {
    const res = await fetch(_apiUrl);
    if (!res.ok) {
        const errorBody = await res.json();
        throw new Error(errorBody.message || res.statusText || "Request failed");
    }
    return res.json();
}

export const createTag = async (tag) => {
    const res = await fetch(_apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tag)
    });
    if (!res.ok) {
        const errorBody = await res.json();
        throw new Error(errorBody.message || res.statusText || "Request failed");
    }
    return res.json();
}
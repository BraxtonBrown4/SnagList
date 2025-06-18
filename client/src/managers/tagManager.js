const _apiUrl = "/api/Tags";

export const getAllTags = () => {
    return fetch(_apiUrl).then(res => res.json())
}


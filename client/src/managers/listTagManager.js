const _apiUrl = "/api/ListTags"

export const CreateListTag = (jt) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jt)
    }).then(res => res.json());
}
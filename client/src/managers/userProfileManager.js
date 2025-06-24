const _apiUrl = "/api/userprofile";

export const getUserProfiles = () => {
  return fetch(_apiUrl).then((res) => res.json());
};

export const getUserProfilesWithRoles = () => {
  return fetch(_apiUrl + "/withroles").then((res) => res.json());
};

export const promoteUser = (userId) => {
  return fetch(`${_apiUrl}/promote/${userId}`, {
    method: "POST",
  });
};

export const demoteUser = (userId) => {
  return fetch(`${_apiUrl}/demote/${userId}`, {
    method: "POST",
  });
};

export const getUserProfileById = async (id) => {
  const res = await fetch(`${_apiUrl}/${id}`);
  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody.message || res.statusText || "Request failed");
  }
  return res.json();
};

export const editUserProfile = async (profile) => {
  const res = await fetch(`${_apiUrl}/${profile.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(profile)
  });
  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody.message || res.statusText || "Request failed");
  }
  return res.json();
};
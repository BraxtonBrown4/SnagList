const _apiUrl = "/api/Notifications/CurrentUser";

export const refreshNotifications = () => {
  return fetch(`${_apiUrl}/Refresh`).then((res) => res.json());
};

export const getAllNotifications = () => {
  return fetch(_apiUrl).then((res) => res.json());
};

export const deleteNotification = (id) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: "DELETE",
  });
};

export const deleteAllNotifications = () => {
  return fetch(_apiUrl, {
    method: "DELETE",
  });
};

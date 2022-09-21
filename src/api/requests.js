import LocalStorageWrapper from "../LocalStorageWrapper";

const contentTypeHeader = {
  "Content-Type": "application/json",
};

const getAuthenticatedHeaders = (token) => {
  return {
    ...contentTypeHeader,
    Authorization: getAccessToken(),
  };
};

// get refresh token
const getAccessToken = () => {
  const token = LocalStorageWrapper.getItem("token");
  return `${token}`;
};

const createReqObject = (url, method, headers, data = {}) => {
  return {
    url,
    headers,
    data: JSON.stringify(data),
    method,
  };
};

export const adminRoutes = {
  login: function (userName, password) {
    return createReqObject("/admin/login/", "POST", contentTypeHeader, {
      userName,
      password,
    });
  },

    getAllUsers: function (token) {
    return createReqObject(`/admin/details/getAllUsers`, "GET", getAuthenticatedHeaders(token));
  },

  createNewClient: function (fullName,userName, password) {
    return createReqObject("/admin/client/create", "POST", contentTypeHeader, {
        fullName,
      userName,
      password,
    });
  },
};
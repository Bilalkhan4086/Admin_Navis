import LocalStorageWrapper from "../../LocalStroageWrapper";

import apiClient from "../apiClient";

const contentTypeHeader = {
  "Content-Type": "application/json",
};

const getAuthenticatedHeaders = (token) => {
  return {
    ...contentTypeHeader,
    "Authorization": getAccessToken(),
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
  login: async  ({userName, password}) => {
    const response =  await apiClient(createReqObject("/admin/login/", "POST", contentTypeHeader, {
      userName,
      password,
    }));
    return response;
  },

  getAllUsers: async  () => {
    const token =  LocalStorageWrapper.getItem("token");
    const response = await apiClient(createReqObject(`/admin/details/getAllUsers`, "GET", getAuthenticatedHeaders(token)));
    return response;
  },



  changeUserStatus: async  ({userName,statusAfterChange}) => {
    const token =  LocalStorageWrapper.getItem("token");
    const response = await apiClient(createReqObject(`/admin/client/change-status`, "PUT", getAuthenticatedHeaders(token),{
      userName,
      status:statusAfterChange
    }));
    return response;
  },


  createNewClient: async  ({fullName,userName, password}) => {
    const token =  LocalStorageWrapper.getItem("token");
    const response = await apiClient(createReqObject("/admin/client/create", "POST", getAuthenticatedHeaders(token), 
    {
      fullName,
      userName,
      password,
    }));
    return response;
  },
};
import LocalStorageWrapper from '../../LocalStroageWrapper';

import apiClient from '../apiClient';

const contentTypeHeader = {
  'Content-Type': 'application/json',
};

const getAuthenticatedHeaders = (access = true) => {
  return {
    ...contentTypeHeader,
    Authorization: access ? getAccessToken() : getRefreshToken(),
  };
};

// get access token
const getAccessToken = () => {
  const jwtAccessToken = LocalStorageWrapper.getItem('jwtAccessToken');
  return `${jwtAccessToken}`;
};

// get refresh token
const getRefreshToken = () => {
  const jwtRefreshToken = LocalStorageWrapper.getItem('jwtRefreshToken');
  return `${jwtRefreshToken}`;
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
  login: async ({ userName, password }) => {
    const response = await apiClient(
      createReqObject('/admin/login/', 'POST', contentTypeHeader, {
        userName,
        password,
      })
    );
    return response;
  },

  getAllUsers: async () => {
    const response = await apiClient(createReqObject(`/admin/details/getAllUsers`, 'GET', getAuthenticatedHeaders()));
    return response;
  },

  getRefresh: async () => {
    const response = await apiClient(createReqObject(`/refresh`, 'GET', getAuthenticatedHeaders(false)));
    return response;
  },

  changeUserStatus: async ({ userName, statusAfterChange }) => {
    const response = await apiClient(
      createReqObject(`/admin/client/change-status`, 'PUT', getAuthenticatedHeaders(), {
        userName,
        status: statusAfterChange,
      })
    );
    return response;
  },

  createNewClient: async ({ fullName, userName, password, fbAccessToken }) => {
    const response = await apiClient(
      createReqObject('/admin/client/create', 'POST', getAuthenticatedHeaders(), {
        fullName,
        userName,
        password,
        fbAccessToken,
      })
    );
    return response;
  },
};

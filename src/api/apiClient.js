import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

const apiClient = (config) => {
  return new Promise( (resolve, reject) => {
    axiosInstance(config)
      .then((res) => resolve(res))
      .catch((err) => {
        reject(err);
      });
  });
};

export default apiClient;

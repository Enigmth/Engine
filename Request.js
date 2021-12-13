import axios from 'axios';
// import AsyncStorageItems from '../constants/AsyncStorageItems';
// import { fromJson } from '../constants/CommonUtils';
//
// export const getCustomerToken = () => {
//   return AsyncStorage.getItem(AsyncStorageItems.token);
// };

export const apiPath = 'https://api.notaxi.info';
export const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Origin: 'http://admin.notaxi.info',
};

export const headerWhitToken = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Origin: 'http://admin.notaxi.info',
  'Authorization': 'Bearer '
};

let Request = axios.create({
  baseURL: `${apiPath}`,
});
//
// Request.interceptors.response.use((response) => {
//   console.log('response', response);
//   return response;
// }, (error) => {
//   console.log(error);
//   if (error.response.status === 401 || error.response.status === 403) {
//     // signOut();
//     console.log('un authorized');
//   }
//   return error;
//   // const originalRequest = error.config;
//   // if (!error.response) {
//   //   return Promise.reject('Network Error');
//   // } else if ((error.response.status === 401) && !originalRequest._retry) {
//   //   console.info('error');
//   // }
//   //     originalRequest._retry = true;
//   //     return AuthService.getToken()
//   //     .then(token => {
//   //         const authTokenResponse = path(['data', 'response'], token)
//   //         AxiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + authTokenResponse;
//   //         originalRequest.headers['Authorization'] = 'Bearer ' + authTokenResponse;
//   //         return axios(originalRequest);
//   //     })
//   //     .catch(err => err)
//   // } else {
//   //     return error.response
//   // }
//
// });
//
// export const setClientToken = () => {
//   getCustomerToken()
//     .then(res => {
//       if (res) {
//         let token = fromJson(res).access_token;
//         Request.interceptors.request.use(function (config) {
//           config.headers.Authorization = token;
//           return config;
//         });
//       }
//
//     });
//
// };

export default Request;

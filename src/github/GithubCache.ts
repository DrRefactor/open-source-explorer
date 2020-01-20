import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

const GITHUB_API = 'https://api.github.com';
const githubAxios = axios.create({
  baseURL: GITHUB_API
});

const Firebase = axios.create({
  baseURL: 'https://tass-ae677.firebaseio.com/'
})

export const GithubCache = {
  get: async function<T = any, R extends AxiosResponse<T> = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    const encodedUrl = encodeURIComponent(url) + '.json';
    const res = await Firebase.get<T, AxiosResponse<R>>(encodedUrl);
    if (res.data) {
      return res.data;
    }

    const response = await githubAxios.get<T, R>(url, config);
    Firebase.put(encodedUrl, response);
    return response;
  }
}

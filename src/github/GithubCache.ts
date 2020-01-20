import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

const GITHUB_API = 'https://api.github.com';
const githubAxios = axios.create({
  baseURL: GITHUB_API
});

const Firebase = axios.create({
  baseURL: "https://console.firebase.google.com/project/tass-ae677/database/data/search/repositories"
})

export const GithubCache = {
  get: async function<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    const res = await Firebase.get<T, R>(url + '.json');
    if (res) {
      return res;
    }

    const response = await githubAxios.get<T, R>(url, config);
    Firebase.put(url + '.json', response);
    return response;
  }
}

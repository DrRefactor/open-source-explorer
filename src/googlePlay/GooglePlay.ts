import axios from 'axios';
import { Project } from '../App';

const url = 'http://localhost:8080';

const GooglePlay = {
  get: async (app: string, limit = 20): Promise<Project[]> => {
    const query = limit ? '?limit=' + limit : '';
    const response = await axios.get<Project[]>(url + '/search/' + app + query);
    return response.data;
  },
  findSimilar: async (appId: string): Promise<Project[]> => {
    const response = await axios.get<Project[]>(url + '/' + appId + '/similar');
    return response.data;
  }
};

export default GooglePlay;
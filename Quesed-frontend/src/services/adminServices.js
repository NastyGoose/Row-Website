import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = `${apiUrl}/api/v1/admin`;

export function getUsers() {
  return http.get(`${apiEndpoint}/users`);
}

export function changeUserType(id, permission) {
  return http.patch(`${apiEndpoint}/users/${id}`, { permission });
}

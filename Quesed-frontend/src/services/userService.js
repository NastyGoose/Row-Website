import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = `${apiUrl}/api/v1/users`;

function userUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function saveUser(user) {
  return http.post(apiEndpoint, user);
}

export function getUsers() {
  return http.get(apiEndpoint);
}

export function getUser(id) {
  return http.get(userUrl(id));
}

export function editUser(id, user) {
  return http.put(userUrl(id), user);
}

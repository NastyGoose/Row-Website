import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = `${apiUrl}/api/v1/editor`;

function testUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getTest(id) {
  return http.get(testUrl(id));
}

export async function saveTest(test) {
  if (test._id) {
    const body = { ...test };
    delete body._id;
    return http.put(testUrl(test._id), body);
  }

  return http.post(apiEndpoint, test);
}

export async function deleteMovie(id) {
  return http.delete(testUrl(id));
}

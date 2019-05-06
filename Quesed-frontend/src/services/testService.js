import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = `${apiUrl}/api/v1/tests`;

function testUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getTests() {
  return http.get(apiEndpoint);
}

export function getTest(id) {
  return http.get(testUrl(id));
}

export function viewTest(id) {
  return http.put(testUrl(id));
}

export function likeDislikeTest(id, action) {
  return http.patch(`${apiEndpoint}/rating/${id}?action=${action}`);
}

export function verifyTest(id, action) {
  return http.patch(`${apiEndpoint}/${action}/${id}`);
}

export function answerTest(id, answerId) {
  return http.patch(testUrl(id), { answerId });
}

export async function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(testUrl(movie._id), body);
  }

  return http.post(apiEndpoint, movie);
}

export async function deleteMovie(id) {
  return http.delete(testUrl(id));
}

import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = `${apiUrl}/api/v1/patches`;

function patchUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getPatches() {
  return http.get(apiEndpoint);
}

export function savePatch(patch) {
  return http.post(apiEndpoint, { action: patch.patchType, description: patch.description });
}

export function getPatch(id) {
  return http.get(patchUrl(id));
}

export function releasePatch(description) {
  return http.patch(`${apiEndpoint}/not-released`, { description });
}

export async function addTestToPatch(id) {
  return http.patch(`${apiEndpoint}/not-released/tests/${id}`);
}

export async function deleteTestFromPatch(id) {
  return http.delete(`${apiEndpoint}/not-released/tests/${id}`);
}

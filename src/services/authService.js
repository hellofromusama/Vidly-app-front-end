import http from './httpService';
import jwtDecode from "jwt-decode";
import  config  from '../config.json';

const apiEndpoint = config.apiUrl + '/auth';
const tokenKey = "token";

setTimeout(() => {
  http.setJWT(getJWT());
}, 1000);


export async function login(email, password) {
  const { data: token } = await http.post(apiEndpoint, { email, password });

  localStorage.setItem(tokenKey, token);
}

export function loginWithJWT(token) {
  localStorage.setItem(tokenKey, token);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const token = localStorage.getItem(tokenKey);
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
}

export function getJWT() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJWT,
  logout,
  getCurrentUser,
  getJWT
};
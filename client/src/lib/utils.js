import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import axios from "axios";

const API_URL = "http://localhost:3000/api"; // Adjust based on your backend

export const registerUser = async (userData) => {
  return axios.post(`${API_URL}/users/register`, userData);
};

export const loginUser = async (userData) => {
  return axios.post(`${API_URL}/users/login`, userData);
};

export const requestPasswordReset = async (email) => {
  return axios.post(`${API_URL}/password/request-reset`, { email });
};

export const resetPassword = async (token, newPassword) => {
  return axios.post(`${API_URL}/password/reset-password/${token}`, {
    newPassword,
  });
};


export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

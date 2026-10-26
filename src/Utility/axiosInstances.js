import axios from "axios";

import { endPoints } from "../constant/Environment";

export const BASE_URL = endPoints.apiBaseUrl;

// Public site: no sign-in, so no auth token to attach.
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

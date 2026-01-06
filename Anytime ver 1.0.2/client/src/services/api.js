/*
Comunicação com o backend pelo axios

Endpoints:
 - getHomeData() → GET /api/home
 - getBandsData() → GET /api/bands
 - getSongById(id) → GET /api/songs/:id
 - searchTracks(query) → GET /api/search?q=query
 
 */

import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response.data,

  (error) => {
    console.error("API Error:", error);

    const message =
      error.response?.data?.message ||
      error.message ||
      "Erro de comunicação com o servidor";

    return Promise.reject({
      error: true,
      message,
      status: error.response?.status || 500,
    });
  }
);

export const getHomeData = () => api.get("/home");
export const getBandsData = () => api.get("/bands");
export const getSongById = (id) => api.get(`/songs/${id}`);
export const searchTracks = (query) =>
  api.get(`/search?q=${encodeURIComponent(query)}`);

export default api;

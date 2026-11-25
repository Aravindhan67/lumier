// Centralized API Configuration for LUMIÈRE Platform
// Automatically resolves between local development and Render production backend
export const API_BASE_URL = 
  import.meta.env.VITE_API_URL || 
  (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? '' 
    : 'https://lumier-backend-zy2i.onrender.com');

export const getApiUrl = (endpoint) => {
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  if (!API_BASE_URL) return path;
  return `${API_BASE_URL.replace(/\/+$/, '')}${path}`;
};

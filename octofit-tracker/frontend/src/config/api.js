// Builds the API base URL from VITE_CODESPACE_NAME, falling back to localhost when unset.
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export function getApiUrl(component) {
  return `${API_BASE_URL}/${component}/`;
}

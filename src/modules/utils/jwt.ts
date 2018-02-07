/**
 * Decodes specified JWT token and returns payload
 */
export function decode(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

/**
 * Checks if specified token is expired or not
 */
export function isExpired(token: string) {
  const payload = decode(token);

  return new Date() > new Date(payload.exp * 1000);
}

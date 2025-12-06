// Simple static code verification for the specific request
const ADMIN_CODE = "15-zyd@2-010";

export async function verifyAuth(request) {
  const authHeader = request.headers.get('authorization');

  // Check if header exists
  if (!authHeader) {
    return null;
  }

  // Expecting format "Bearer 15-zyd@2-010" or just the code in a custom header if preferred,
  // but standardizing on Authorization header is good practice.

  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

  if (token === ADMIN_CODE) {
    return { role: 'admin' };
  }

  return null;
}

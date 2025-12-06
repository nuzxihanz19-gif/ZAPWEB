import { jwtVerify } from 'jose';

export async function verifyAuth(request) {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.split(' ')[1];

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret');
    const { payload } = await jwtVerify(token, secret);
    return payload; // Returns the decoded token payload if valid
  } catch (error) {
    console.error('JWT Verification failed:', error);
    return null;
  }
}

// Helper to check if user is admin (example payload check)
export function isAdmin(payload) {
  return payload && payload.role === 'admin';
}

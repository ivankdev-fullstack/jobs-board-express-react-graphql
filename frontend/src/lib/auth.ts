import { jwtDecode } from "jwt-decode";

const { VITE_API_URL, VITE_ACCESS_TOKEN_KEY } = import.meta.env;

export interface User {
  id: string;
  email: string;
}

interface JwtClaims {
  sub: string;
  email: string;
}

export function getAccessToken() {
  return localStorage.getItem(VITE_ACCESS_TOKEN_KEY);
}

export async function login(
  email: string,
  password: string
): Promise<User | null> {
  const response = await fetch(`${VITE_API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    return null;
  }

  const { token } = await response.json();
  localStorage.setItem(VITE_ACCESS_TOKEN_KEY, token);

  return getUserFromToken(token);
}

export function getUser(): User | null {
  const token = getAccessToken();
  if (!token) {
    return null;
  }
  return getUserFromToken(token);
}

export function logout() {
  localStorage.removeItem(VITE_ACCESS_TOKEN_KEY);
}

function getUserFromToken(token: string): User {
  const claims = jwtDecode<JwtClaims>(token);
  return {
    id: claims.sub,
    email: claims.email,
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  jwt_token: string;
  cert_no: string;
  expire: string;
  [key: string]: unknown;
}

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated' | 'error';

export interface AuthState {
  status: AuthStatus;
  error: string | null;
} 
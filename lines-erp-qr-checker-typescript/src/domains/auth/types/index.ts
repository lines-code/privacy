export interface LoginCredentials {
  id: string;
  password: string;
}

export interface LoginResponse {
  accessToken?: string;
  [key: string]: unknown;
}

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated' | 'error';

export interface AuthState {
  status: AuthStatus;
  error: string | null;
} 
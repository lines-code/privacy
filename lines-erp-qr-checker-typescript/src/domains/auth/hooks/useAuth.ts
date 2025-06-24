import { useState, useCallback, useEffect } from 'react';
import { AuthState, AuthStatus, LoginCredentials, LoginResponse } from '../types';
import { API_BASE_URL, ENDPOINTS, AUTH_CHECK_DELAY_MS } from '@/utils/constants';
import { getStoredToken, setStoredToken, removeStoredToken, setStoredCertNo } from '@/utils/storage';

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    status: 'idle',
    error: null,
  });

  const setAuthStatus = useCallback((status: AuthStatus, error: string | null = null) => {
    setAuthState({ status, error });
  }, []);

  const login = useCallback(async (credentials: LoginCredentials): Promise<void> => {
    setAuthStatus('loading');

    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.LOGIN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const result: LoginResponse = await response.json();

      if (result.jwt_token) {
        const storageResult = setStoredToken(result.jwt_token);
        const certNoResult = setStoredCertNo(result.cert_no);
        if (storageResult.success && certNoResult.success) {
          setAuthStatus('authenticated');
        } else {
          setAuthStatus('error', `토큰 저장 실패`);
        }
      } else {
        setAuthStatus('error', `로그인 실패: ${JSON.stringify(result)}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다';
      setAuthStatus('error', `로그인 에러: ${errorMessage}`);
    }
  }, [setAuthStatus]);

  const logout = useCallback(() => {
    removeStoredToken();
    setAuthStatus('unauthenticated');
  }, [setAuthStatus]);

  const checkStoredAuth = useCallback(async (): Promise<void> => {
    setAuthStatus('loading');
    
    // Small delay for UI feedback
    await new Promise(resolve => setTimeout(resolve, AUTH_CHECK_DELAY_MS));
    
    const tokenResult = getStoredToken();
    if (tokenResult.success && tokenResult.data) {
      setAuthStatus('authenticated');
    } else {
      setAuthStatus('unauthenticated');
    }
  }, [setAuthStatus]);

  const getAccessToken = useCallback((): string | null => {
    const tokenResult = getStoredToken();
    return tokenResult.success ? tokenResult.data : null;
  }, []);

  // Check for stored token on mount
  useEffect(() => {
    checkStoredAuth();
  }, [checkStoredAuth]);

  return {
    authState,
    login,
    logout,
    checkStoredAuth,
    getAccessToken,
  } as const;
} 
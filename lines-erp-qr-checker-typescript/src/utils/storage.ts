import { ACCESS_TOKEN_KEY, CERT_NO_KEY } from './constants';

export type StorageResult<T> = { success: true; data: T } | { success: false; error: string };

export function getStoredToken(): StorageResult<string | null> {
  try {
    if (typeof window === 'undefined') {
      return { success: true, data: null };
    }
    
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return { success: true, data: token };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to get token from storage' 
    };
  }
}

export function setStoredToken(token: string): StorageResult<void> {
  try {
    if (typeof window === 'undefined') {
      return { success: false, error: 'Storage not available on server side' };
    }
    
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    return { success: true, data: undefined };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to save token to storage' 
    };
  }
}

export function setStoredCertNo(cert_no: string): StorageResult<void> {
  try {
    if (typeof window === 'undefined') {
      return { success: false, error: 'Storage not available on server side' };
    }
    
    localStorage.setItem(CERT_NO_KEY, cert_no);
    return { success: true, data: undefined };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to save token to storage' 
    };
  }
}

export function getStoredCertNo(): StorageResult<string | null> {
  try {
    if (typeof window === 'undefined') {
      return { success: true, data: null };
    }
    
    const cert_no = localStorage.getItem(CERT_NO_KEY);
    return { success: true, data: cert_no };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to get token from storage' 
    };
  }
}

export function removeStoredToken(): StorageResult<void> {
  try {
    if (typeof window === 'undefined') {
      return { success: false, error: 'Storage not available on server side' };
    }
    
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    return { success: true, data: undefined };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to remove token from storage' 
    };
  }
} 